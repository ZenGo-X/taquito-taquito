import {
  OperationResultDelegation,
  OperationResultOrigination,
  OperationResultTransaction,
  PreapplyResponse,
  RPCRunOperationParam,
} from '@taquito/rpc';
import { DEFAULT_STORAGE_LIMIT, protocols, DEFAULT_GAS_LIMIT, DEFAULT_FEE } from '../constants';
import { OperationEmitter } from '../operations/operation-emitter';
import {
  DelegateParams,
  OriginateParams,
  PrepareOperationParams,
  TransferParams,
  RegisterDelegateParams,
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

// RPC require a signature but do not verify it
const SIGNATURE_STUB =
  'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';

export class RPCEstimateProvider extends OperationEmitter implements EstimationProvider {
  // Maximum values defined by the protocol
  private readonly DEFAULT_PARAMS = {
    fee: 30000,
    storageLimit: 60000,
    gasLimit: 800000,
  };

  private getOperationResult(
    opResponse: PreapplyResponse,
    kind: 'origination' | 'transaction' | 'delegation'
  ): (OperationResultTransaction | OperationResultOrigination | OperationResultDelegation)[] {
    const results = opResponse.contents;
    const originationOp = Array.isArray(results) && results.find(op => op.kind === kind);
    const opResult =
      originationOp && originationOp.metadata && originationOp.metadata.operation_result;
    const internalResult =
      originationOp && originationOp.metadata && originationOp.metadata.internal_operation_results;
    return [opResult, ...(internalResult || []).map(({ result }: any) => result)].filter(
      (x: any) => !!x
    );
  }

  private async createEstimate(
    params: PrepareOperationParams,
    kind: 'origination' | 'transaction' | 'delegation',
    defaultStorage: number,
    minimumGas: number = 0
  ) {
    const {
      opbytes,
      opOb: { branch, contents },
    } = await this.prepareAndForge(params);

    let operation: RPCRunOperationParam = { branch, contents, signature: SIGNATURE_STUB };
    if (await this.context.isAnyProtocolActive(protocols['005'])) {
      operation = { operation, chain_id: await this.rpc.getChainId() };
    }

    const { opResponse } = await this.simulate(operation);
    const operationResults = this.getOperationResult(opResponse, kind);

    let totalGas = 0;
    let totalStorage = 0;
    operationResults.forEach(result => {
      totalGas += Number(result.consumed_gas) || 0;
      totalStorage +=
        'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
    });

    return new Estimate(
      Math.max(totalGas || 0, minimumGas),
      Number(totalStorage || 0) + defaultStorage,
      opbytes.length / 2
    );
  }

  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for an origination operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param OriginationOperation Originate operation parameter
   */
  async originate({ fee, storageLimit, gasLimit, ...rest }: OriginateParams) {
    const pkh = await this.signer.publicKeyHash();
    const op = await createOriginationOperation(
      {
        ...rest,
        ...this.DEFAULT_PARAMS,
      },
      pkh
    );
    return this.createEstimate(
      { operation: op, source: pkh },
      'origination',
      DEFAULT_STORAGE_LIMIT.ORIGINATION
    );
  }
  /**
   *
   * @description Estimate gasLimit, storageLimit and fees for an transfer operation
   *
   * @returns An estimation of gasLimit, storageLimit and fees for the operation
   *
   * @param TransferOperation Originate operation parameter
   */
  async transfer({ fee, storageLimit, gasLimit, ...rest }: TransferParams) {
    // TODO - gather all promises into one Promise.all
    const pkh = await this.signer.publicKeyHash();

    // we want to make the initial fee estimation as tight as possible because otherwise the estimation fails here.
    const mutezAmount = rest.mutez
      ? rest.amount.toString()
      : format('tz', 'mutez', rest.amount).toString();

    const sourceBalancePromise = this.rpc.getBalance(pkh);
    const managerPromise = this.rpc.getManagerKey(pkh);
    const isNewImplicitAccountPromise = this.isNewImplicitAccount(rest.to);

    const [sourceBalance, manager, isNewImplicitAccount] = await Promise.all([
      sourceBalancePromise,
      managerPromise,
      isNewImplicitAccountPromise,
    ]);

    // A transfer from an unrevealed account will require a an additional fee of 0.00142tz (reveal operation)
    const requireReveal = !manager;
    const revealFee = requireReveal ? DEFAULT_FEE.REVEAL : 0;

    /* A transfer to a new implicit account would require burning funds for its storage
       https://tezos.stackexchange.com/questions/956/burn-fee-for-empty-account */
    const _storageLimit = isNewImplicitAccount ? DEFAULT_STORAGE_LIMIT.TRANSFER : 0;

    const defaultParams = {
      fee: sourceBalance.minus(Number(mutezAmount) + revealFee + _storageLimit * 1000).toNumber(), // maximum possible
      storageLimit: _storageLimit,
      gasLimit: DEFAULT_GAS_LIMIT.TRANSFER,
    };

    const op = await createTransferOperation({
      ...rest,
      ...defaultParams,
    });
    return this.createEstimate({ operation: op, source: pkh }, 'transaction', _storageLimit);
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

    const defaultParams = {
      fee: sourceBalance.toNumber() - 1 - revealFee, // leave minimum amount possible to delegate
      storageLimit: DEFAULT_STORAGE_LIMIT.DELEGATION,
      gasLimit: DEFAULT_GAS_LIMIT.DELEGATION,
    };
    const op = await createSetDelegateOperation({ ...params, ...defaultParams });
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    return this.createEstimate(
      { operation: op, source: sourceOrDefault },
      'delegation',
      DEFAULT_STORAGE_LIMIT.DELEGATION,
      // Delegation have a minimum gas cost
      DEFAULT_GAS_LIMIT.DELEGATION
    );
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
    const op = await createRegisterDelegateOperation(
      { ...params, ...this.DEFAULT_PARAMS },
      await this.signer.publicKeyHash()
    );
    return this.createEstimate(
      { operation: op, source: await this.signer.publicKeyHash() },
      'delegation',
      DEFAULT_STORAGE_LIMIT.DELEGATION,
      // Delegation have a minimum gas cost
      DEFAULT_GAS_LIMIT.DELEGATION
    );
  }
}
