import { PreapplyResponse, RPCRunOperationParam, OpKind } from '@taquito/rpc';
import BigNumber from 'bignumber.js';
import { OperationEmitter } from '../operations/operation-emitter';
import {
  flattenErrors,
  flattenOperationResult,
  TezosOperationError,
} from '../operations/operation-errors';
import {
  DelegateParams,
  isOpWithFee,
  OriginateParams,
  ParamsWithKind,
  PrepareOperationParams,
  RegisterDelegateParams,
  RPCOperation,
  TransferParams,
} from '../operations/types';
import { Estimate } from './estimate';
import { EstimationProvider } from './interface';
import {
  createOriginationOperation,
  createRegisterDelegateOperation,
  createSetDelegateOperation,
  createTransferOperation,
} from './prepare';
import { format } from '../format';
import { DEFAULT_FEE, DEFAULT_GAS_LIMIT, DEFAULT_STORAGE_LIMIT } from '../constants';

// RPC require a signature but do not verify it
const SIGNATURE_STUB =
  'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';

export class RPCEstimateProvider extends OperationEmitter implements EstimationProvider {
  private readonly ALLOCATION_STORAGE = 257;
  private readonly ORIGINATION_STORAGE = 257;

  // Maximum values defined by the protocol
  private async getAccountLimits(pkh: string) {
    const balance = await this.rpc.getBalance(pkh);
    const {
      hard_gas_limit_per_operation,
      hard_storage_limit_per_operation,
      cost_per_byte,
    } = await this.rpc.getConstants();
    return {
      fee: 0,
      gasLimit: hard_gas_limit_per_operation.toNumber(),
      storageLimit: Math.floor(
        BigNumber.min(balance.dividedBy(cost_per_byte), hard_storage_limit_per_operation).toNumber()
      ),
    };
  }

  private createEstimateFromOperationContent(
    content: PreapplyResponse['contents'][0],
    size: number
  ) {
    const operationResults = flattenOperationResult({ contents: [content] });
    let totalGas = 0;
    let totalStorage = 0;
    operationResults.forEach(result => {
      totalStorage +=
        'originated_contracts' in result && typeof result.originated_contracts !== 'undefined'
          ? result.originated_contracts.length * this.ORIGINATION_STORAGE
          : 0;
      totalStorage += 'allocated_destination_contract' in result ? this.ALLOCATION_STORAGE : 0;
      totalGas += Number(result.consumed_gas) || 0;
      totalStorage +=
        'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
    });

    if (isOpWithFee(content)) {
      return new Estimate(totalGas || 0, Number(totalStorage || 0), size);
    } else {
      return new Estimate(0, 0, size, 0);
    }
  }

  private async createEstimate(params: PrepareOperationParams) {
    const {
      opbytes,
      opOb: { branch, contents },
    } = await this.prepareAndForge(params);

    let operation: RPCRunOperationParam = {
      operation: { branch, contents, signature: SIGNATURE_STUB },
      chain_id: await this.rpc.getChainId(),
    };

    const { opResponse } = await this.simulate(operation);

    const errors = [...flattenErrors(opResponse, 'backtracked'), ...flattenErrors(opResponse)];

    // Fail early in case of errors
    if (errors.length) {
      throw new TezosOperationError(errors);
    }

    while (
      opResponse.contents.length !== (Array.isArray(params.operation) ? params.operation.length : 1)
    ) {
      opResponse.contents.shift();
    }

    return opResponse.contents.map(x => {
      return this.createEstimateFromOperationContent(
        x,
        opbytes.length / 2 / opResponse.contents.length
      );
    });
  }

  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for an origination operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param OriginationOperation Originate operation parameter
   */
  async originate({ fee, storageLimit, gasLimit, source, publicKey, ...rest }: OriginateParams) {
    const pkh = source || (await this.signer.publicKeyHash());
    const DEFAULT_PARAMS = await this.getAccountLimits(pkh);
    const op = await createOriginationOperation({
      ...rest,
      ...DEFAULT_PARAMS,
      publicKey: publicKey
    });
    return (await this.createEstimate({ operation: op, source: pkh, publicKey: publicKey }))[0];
  }
  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for an transfer operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param TransferOperation Originate operation parameter
   */
  async transfer({ storageLimit, gasLimit, source, publicKey, ...rest }: TransferParams) {
    // TODO - gather all promises into one Promise.all
    const pkh = source || (await this.signer.publicKeyHash());

    // we want to make the initial fee estimation as tight as possible because otherwise the estimation fails here.
    const mutezAmount = rest.mutez
      ? rest.amount.toString()
      : format('tz', 'mutez', rest.amount).toString();

    const sourceBalancePromise = this.rpc.getBalance(pkh);
    const managerPromise = this.rpc.getManagerKey(pkh);
    const isNewImplicitAccountPromise = this.isNewImplicitAccount(rest.to);
    let isDelegatedPromise = this.isDelegated(pkh);

    const [sourceBalance, manager, isNewImplicitAccount, isDelegated] = await Promise.all([
      sourceBalancePromise,
      managerPromise,
      isNewImplicitAccountPromise,
      isDelegatedPromise,
    ]);

    // A transfer from an unrevealed account will require a an additional fee of 0.00142tz (reveal operation)
    const requireReveal = !manager;
    const revealFee = requireReveal ? DEFAULT_FEE.REVEAL : 0;

    /* A transfer to a new implicit account would require burning funds for its storage
       https://tezos.stackexchange.com/questions/956/burn-fee-for-empty-account */
    const _storageLimit = isNewImplicitAccount ? DEFAULT_STORAGE_LIMIT.TRANSFER : 0;

    // maximum possible, +1 to avoid emptying a delegated account
    const required = Number(mutezAmount) + revealFee + _storageLimit * 1000 + (isDelegated ? 1 : 0);
    const fee = sourceBalance.minus(required).toNumber();

    const DEFAULT_PARAMS = {
      fee,
      storageLimit: _storageLimit,
      gasLimit: DEFAULT_GAS_LIMIT.TRANSFER,
    };

    const op = await createTransferOperation({
      ...rest,
      ...DEFAULT_PARAMS,
      publicKey
    });
    return (await this.createEstimate({ operation: op, source: pkh, publicKey: publicKey }))[0];
  }

  async isDelegated(address: string) {
    let isDelegated;
    try {
      const delegate = await this.rpc.getDelegate(address);
      isDelegated = !!delegate;
    } catch (err) {
      // getDelegate returns 404 if no delegate
      isDelegated = false;
    }

    return isDelegated;
  }

  async isNewImplicitAccount(address: string) {
    let pref = address.substring(0, 3);
    const isImplicit = ['tz1', 'tz2', 'tz3'].includes(pref); // assuming validity check already performed
    if (!isImplicit) {
      return false;
    }

    try {
      const balance = await this.rpc.getBalance(address);
      return balance.eq(0);
    } catch (e) {
      return true;
    }
  }

  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for a delegate operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param Estimate
   */
  async setDelegate(params: DelegateParams) {
    const sourceBalancePromise = this.rpc.getBalance(params.source);
    const managerPromise = this.rpc.getManagerKey(params.source);

    const [sourceBalance, manager] = await Promise.all([sourceBalancePromise, managerPromise]);

    // A transfer from an unrevealed account will require a an additional fee of 0.00142tz (reveal operation)
    const requireReveal = !manager;
    const revealFee = requireReveal ? DEFAULT_FEE.REVEAL : 0;

    const DEFAULT_PARAMS = {
      fee: sourceBalance.toNumber() - 1 - revealFee, // leave minimum amount possible to delegate
      storageLimit: DEFAULT_STORAGE_LIMIT.DELEGATION,
      gasLimit: DEFAULT_GAS_LIMIT.DELEGATION,
    };
    const op = await createSetDelegateOperation({ ...params, ...DEFAULT_PARAMS });
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    return (await this.createEstimate({ operation: op, source: sourceOrDefault, publicKey: params.publicKey }))[0];
  }

  async batch(params: ParamsWithKind[], publicKey?: string) {
    const operations: RPCOperation[] = [];
    const DEFAULT_PARAMS = await this.getAccountLimits(await this.signer.publicKeyHash());
    for (const param of params) {
      switch (param.kind) {
        case OpKind.TRANSACTION:
          operations.push(
            await createTransferOperation({
              ...param,
              ...DEFAULT_PARAMS,
            })
          );
          break;
        case OpKind.ORIGINATION:
          operations.push(
            await createOriginationOperation({
              ...param,
              ...DEFAULT_PARAMS,
            })
          );
          break;
        case OpKind.DELEGATION:
          operations.push(
            await createSetDelegateOperation({
              ...param,
              ...DEFAULT_PARAMS,
            })
          );
          break;
        case OpKind.ACTIVATION:
          operations.push({
            ...param,
            ...DEFAULT_PARAMS,
          });
          break;
        default:
          throw new Error(`Unsupported operation kind: ${(param as any).kind}`);
      }
    }
    return this.createEstimate({ operation: operations, publicKey: publicKey! });
  }

  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for a delegate operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param Estimate
   */
  async registerDelegate(params: RegisterDelegateParams) {
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    const DEFAULT_PARAMS = await this.getAccountLimits(sourceOrDefault);
    const op = await createRegisterDelegateOperation(
      { ...params, ...DEFAULT_PARAMS },
      sourceOrDefault,
      params.publicKey
    );
    return (await this.createEstimate({ operation: op, source: sourceOrDefault, publicKey: params.publicKey }))[0];
  }
}
