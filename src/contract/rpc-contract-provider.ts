import { Schema } from '@taquito/michelson-encoder';
import { ConstructedOperation, ScriptResponse } from '@taquito/rpc';
import { DEFAULT_FEE, DEFAULT_GAS_LIMIT, DEFAULT_STORAGE_LIMIT, protocols } from '../constants';
import { Context } from '../context';
import { OperationEmitter } from '../operations/operation-emitter';
import { Operation } from '../operations/operations';
import { OriginationOperation } from '../operations/origination-operation';
import {
  DelegateParams,
  OriginateParams,
  RPCDelegateOperation,
  TransferParams,
  RegisterDelegateParams,
  ForgedBytes,
} from '../operations/types';
import { Contract } from './contract';
import { Estimate } from './estimate';
import { ContractProvider, ContractSchema, EstimationProvider } from './interface';
import {
  createOriginationOperation,
  createTransferOperation,
  createSetDelegateOperation,
  createRegisterDelegateOperation,
} from './prepare';
import { smartContractAbstractionSemantic } from './semantic';
import { encodeExpr, hex2buf, mergebuf, b58cencode, prefix } from '@taquito/utils';
import { TransactionOperation } from '../operations/transaction-operation';
import { DelegateOperation } from '../operations/delegate-operation';
import { InvalidDelegationSource } from './errors';

export class RpcContractProvider extends OperationEmitter implements ContractProvider {
  constructor(context: Context, private estimator: EstimationProvider) {
    super(context);
  }

  /**
   *
   * @description Return a well formatted json object of the contract storage
   *
   * @param contract contract address you want to get the storage from
   * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
   *
   * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
   */
  async getStorage<T>(contract: string, schema?: ContractSchema): Promise<T> {
    if (!schema) {
      schema = await this.rpc.getScript(contract);
    }

    let contractSchema: Schema;
    if (schema instanceof Schema) {
      contractSchema = schema;
    } else {
      contractSchema = Schema.fromRPCResponse({ script: schema as ScriptResponse });
    }

    const storage = await this.rpc.getStorage(contract);

    return contractSchema.Execute(storage, smartContractAbstractionSemantic(this)) as T; // Cast into T because only the caller can know the true type of the storage
  }

  /**
   *
   * @description Return a well formatted json object of the contract big map storage
   *
   * @param contract contract address you want to get the storage from
   * @param key contract big map key to fetch value from
   * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
   *
   * @deprecated Deprecated in favor of getBigMapKeyByID
   *
   * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
   */
  async getBigMapKey<T>(contract: string, key: string, schema?: ContractSchema): Promise<T> {
    if (!schema) {
      schema = await this.rpc.getScript(contract);
    }

    let contractSchema: Schema;
    if (schema instanceof Schema) {
      contractSchema = schema;
    } else {
      contractSchema = Schema.fromRPCResponse({ script: schema as ScriptResponse });
    }

    const encodedKey = contractSchema.EncodeBigMapKey(key);

    const val = await this.rpc.getBigMapKey(contract, encodedKey);

    return contractSchema.ExecuteOnBigMapValue(val) as T; // Cast into T because only the caller can know the true type of the storage
  }

  /**
   *
   * @description Return a well formatted json object of a big map value
   *
   * @param id Big Map ID
   * @param keyToEncode key to query (will be encoded properly according to the schema)
   * @param schema Big Map schema (can be determined using your contract type)
   *
   * @see http://tezos.gitlab.io/mainnet/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
   */
  async getBigMapKeyByID<T>(id: string, keyToEncode: string, schema: Schema): Promise<T> {
    const { key, type } = schema.EncodeBigMapKey(keyToEncode);
    const { packed } = await this.context.rpc.packData({ data: key, type });

    const encodedExpr = encodeExpr(packed);

    const bigMapValue = await this.context.rpc.getBigMapExpr(id.toString(), encodedExpr);

    return schema.ExecuteOnBigMapValue(bigMapValue, smartContractAbstractionSemantic(this)) as T;
  }

  private async estimate<T extends { fee?: number; gasLimit?: number; storageLimit?: number }>(
    { fee, gasLimit, storageLimit, ...rest }: T,
    estimator: (param: T) => Promise<Estimate>
  ) {
    let calculatedFee = fee;
    let calculatedGas = gasLimit;
    let calculatedStorage = storageLimit;

    if (fee === undefined || gasLimit === undefined || storageLimit === undefined) {
      const estimation = await estimator({ fee, gasLimit, storageLimit, ...(rest as any) });

      if (calculatedFee === undefined) {
        calculatedFee = estimation.suggestedFeeMutez;
      }

      if (calculatedGas === undefined) {
        calculatedGas = estimation.gasLimit;
      }

      if (calculatedStorage === undefined) {
        calculatedStorage = estimation.storageLimit;
      }
    }

    return {
      fee: calculatedFee!,
      gasLimit: calculatedGas!,
      storageLimit: calculatedStorage!,
    };
  }

  /**
   *
   * @description Originate a new contract according to the script in parameters. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @warn You cannot specify storage and init at the same time (use init to pass the raw michelson representation of storage)
   *
   * @param OriginationOperation Originate operation parameter
   */
  async originate(params: OriginateParams) {
    const estimate = await this.estimate(params, this.estimator.originate.bind(this.estimator));

    const publicKeyHash = await this.signer.publicKeyHash();
    const operation = await createOriginationOperation(
      {
        ...params,
        ...estimate,
      },
      publicKeyHash
    );
    const preparedOrigination = await this.prepareOperation({ operation, source: publicKeyHash });
    const forgedOrigination = await this.forge(preparedOrigination);
    const { hash, context, forgedBytes, opResponse } = await this.signAndInject(forgedOrigination);
    return new OriginationOperation(hash, operation, forgedBytes, opResponse, context, this);
  }

  /**
   *
   * @description Set the delegate for a contract. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @param SetDelegate operation parameter
   */
  async setDelegate(params: DelegateParams) {
    // Since babylon delegation source cannot smart contract
    if ((await this.context.isAnyProtocolActive(protocols['005'])) && /kt1/i.test(params.source)) {
      throw new InvalidDelegationSource(params.source);
    }

    const estimate = await this.estimate(params, this.estimator.setDelegate.bind(this.estimator));
    const operation = await createSetDelegateOperation({ ...params, ...estimate });
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    const opBytes = await this.prepareAndForge({
      operation,
      source: sourceOrDefault,
    });
    const { hash, context, forgedBytes, opResponse } = await this.signAndInject(opBytes);
    return new DelegateOperation(
      hash,
      operation,
      sourceOrDefault,
      forgedBytes,
      opResponse,
      context
    );
  }

  /**
   *
   * @description Get relevant parameters for later signing and broadcast of a delegate transaction
   *
   * @returns ForgedBytes parameters needed to sign and broadcast
   *
   * @param params delegate parameters
   */
  async getDelegateSignatureHash(params: DelegateParams): Promise<ForgedBytes> {
    // Since babylon delegation source cannot smart contract
    if ((await this.context.isAnyProtocolActive(protocols['005'])) && /kt1/i.test(params.source)) {
      throw new InvalidDelegationSource(params.source);
    }

    const estimate = await this.estimate(params, this.estimator.setDelegate.bind(this.estimator));
    const operation = await createSetDelegateOperation({ ...params, ...estimate });
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    return this.prepareAndForge({
      operation,
      source: sourceOrDefault,
    });
  }

  /**
   *
   * @description inject a signature to construct a delegate operation
   *
   * @returns A delegate operation handle with the result from the rpc node
   *
   * @param params result of `getTransferSignatureHash`
   * @param prefixSig the prefix to be used for the encoding of the signature bytes
   * @param sbytes signature bytes in hex
   */
  async injectDelegateSignatureAndBroadcast(
    params: ForgedBytes,
    prefixSig: string,
    sbytes: string,
    trackingId? : number
  ): Promise<DelegateOperation> {
    const { hash, context, forgedBytes, opResponse } = await this.inject(params, prefixSig, sbytes);
    if (!params.opOb.contents) {
      throw new Error('Invalid operation contents');
    }

    const delegationParams: ConstructedOperation | undefined = params.opOb.contents.find(
      content => content.kind === 'delegation'
    );
    if (!delegationParams) {
      throw new Error('No delegation in operation contents');
    }

    const operation = await createSetDelegateOperation(
      constructedOperationToDelegateParams(delegationParams, trackingId)
    );
    return new DelegateOperation(
      hash,
      operation,
      params.opOb.contents[0].source,
      forgedBytes,
      opResponse,
      context
    );
  }

  /**
   *
   * @description Register the current address as delegate. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @param RegisterDelegate operation parameter
   */
  async registerDelegate(params: RegisterDelegateParams) {
    const estimate = await this.estimate(
      params,
      this.estimator.registerDelegate.bind(this.estimator)
    );
    const source = await this.signer.publicKeyHash();
    const operation = await createRegisterDelegateOperation({ ...params, ...estimate }, source);
    const opBytes = await this.prepareAndForge({ operation });
    const { hash, context, forgedBytes, opResponse } = await this.signAndInject(opBytes);
    return new DelegateOperation(hash, operation, source, forgedBytes, opResponse, context);
  }

  /**
   *
   * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @param Transfer operation parameter
   */
  async transfer(params: TransferParams) {
    const estimate = await this.estimate(params, this.estimator.transfer.bind(this.estimator));
    const operation = await createTransferOperation({
      ...params,
      ...estimate,
    });
    const source = params.source || (await this.signer.publicKeyHash());
    const opBytes = await this.prepareAndForge({ operation, source: params.source });
    const { hash, context, forgedBytes, opResponse } = await this.signAndInject(opBytes);
    return new TransactionOperation(hash, operation, source, forgedBytes, opResponse, context);
  }

  /**
   *
   * @description Get relevant parameters for later signing and broadcast of a transfer transaction
   *
   * @returns GetTransferSignatureHashResponse parameters needed to sign and broadcast
   *
   * @param params operation parameters
   */
  async getTransferSignatureHash(params: TransferParams): Promise<ForgedBytes> {
    const estimate = await this.estimate(params, this.estimator.transfer.bind(this.estimator));
    const operation = await createTransferOperation({
      ...params,
      ...estimate,
    });
    const source = params.source || (await this.signer.publicKeyHash());
    return this.prepareAndForge({ operation, source });
  }

  /**
   *
   * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @param params result of `getTransferSignatureHash`
   * @param prefixSig the prefix to be used for the encoding of the signature bytes
   * @param sbytes signature bytes in hex
   */
  async injectTransferSignatureAndBroadcast(
    params: ForgedBytes,
    prefixSig: string,
    sbytes: string
  ): Promise<TransactionOperation> {
    const { hash, context, forgedBytes, opResponse } = await this.inject(params, prefixSig, sbytes);
    if (!params.opOb.contents) {
      throw new Error('Invalid operation contents');
    }

    const transactionParams: ConstructedOperation | undefined = params.opOb.contents.find(
      content => content.kind === 'transaction'
    );
    if (!transactionParams) {
      throw new Error('No transaction in operation contents');
    }

    const operation = await createTransferOperation(
      constructedOperationToTransferParams(transactionParams)
    );
    return new TransactionOperation(
      hash,
      operation,
      params.opOb.contents[0].source,
      forgedBytes,
      opResponse,
      context
    );
  }

  async at(address: string): Promise<Contract> {
    // We need to check if Proto5 is activated to pick the right smart contract abstraction
    if (await this.context.isAnyProtocolActive(protocols['005'])) {
      const script = await this.rpc.getScript(address);
      const entrypoints = await this.rpc.getEntrypoints(address);
      return new Contract(address, script, this, entrypoints);
    } else {
      const script = await this.rpc.getScript(address);
      return new Contract(address, script, this);
    }
  }
}

function constructedOperationToTransferParams(op: ConstructedOperation): TransferParams {
  return {
    to: op.destination,
    // @ts-ignore
    amount: Number(op.amount),
    parameter: op.parameters,
    // @ts-ignore
    fee: Number(op.fee),
    gasLimit: Number(op.gas_limit),
    storageLimit: Number(op.storage_limit),
    ...op,
  };
}

function constructedOperationToDelegateParams(op: ConstructedOperation, trackingId? : number): DelegateParams {
  const gasLimit : number =  Number(op.gas_limit);
  
  return {
    source: op.source,
    delegate: op.delegate,
    fee: Number(op.fee),
    gasLimit: trackingId ? (Math.ceil(gasLimit / 1000) * 1000) + trackingId : gasLimit,
    storageLimit: Number(op.storage_limit),
  };
}