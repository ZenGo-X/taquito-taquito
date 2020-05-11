import { Schema } from '@taquito/michelson-encoder';
import {
  OperationContents,
  OperationContentsDelegation,
  OperationContentsReveal,
  OperationContentsTransaction,
  ScriptResponse,
} from '@taquito/rpc';
import { encodeExpr } from '@taquito/utils';
import { Context } from '../context';
import { DelegateOperation } from '../operations/delegate-operation';
import { OperationEmitter } from '../operations/operation-emitter';
import { OriginationOperation } from '../operations/origination-operation';
import { TransactionOperation } from '../operations/transaction-operation';
import {
  DelegateParams,
  OriginateParams,
  RegisterDelegateParams,
  ForgedBytes,
  TransferParams,
} from '../operations/types';
import { Contract } from './contract';
import { InvalidDelegationSource } from './errors';
import { ContractProvider, ContractSchema, EstimationProvider } from './interface';
import {
  createOriginationOperation,
  createRegisterDelegateOperation,
  createSetDelegateOperation,
  createTransferOperation,
} from './prepare';
import { smartContractAbstractionSemantic } from './semantic';
import { protocols } from '../constants';

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
   * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
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
   * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
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
   * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
   */
  async getBigMapKeyByID<T>(id: string, keyToEncode: string, schema: Schema): Promise<T> {
    const { key, type } = schema.EncodeBigMapKey(keyToEncode);
    const { packed } = await this.context.rpc.packData({ data: key, type });

    const encodedExpr = encodeExpr(packed);

    const bigMapValue = await this.context.rpc.getBigMapExpr(id.toString(), encodedExpr);

    return schema.ExecuteOnBigMapValue(bigMapValue, smartContractAbstractionSemantic(this)) as T;
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
    const operation = await createOriginationOperation({
      ...params,
      ...estimate,
    });
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
    if (/kt1/i.test(params.source)) {
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
   * @returns ForgedBytes parameters needed to sign and broadcast, and Number to represent fees in mutez
   *
   * @param params delegate parameters
   */
  async getDelegateSignatureHashAndFees(
    params: DelegateParams
  ): Promise<{ forgedBytes: ForgedBytes; fees: Number }> {
    // Since babylon delegation source cannot smart contract
    if ((await this.context.isAnyProtocolActive(protocols['005'])) && /kt1/i.test(params.source)) {
      throw new InvalidDelegationSource(params.source);
    }

    const estimate = await this.estimate(params, this.estimator.setDelegate.bind(this.estimator));
    const operation = await createSetDelegateOperation({ ...params, ...estimate });
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    const forgedBytes = await this.prepareAndForge({
      operation,
      source: sourceOrDefault,
    });
    const fees = this.calculateTotalFees(forgedBytes);
    return { forgedBytes, fees };
  }

  calculateTotalFees(forgedBytes: ForgedBytes): Number {
    return (forgedBytes.opOb.contents as any[]).reduce((acc, content) => {
      acc += parseInt(content.fee, 10) + parseInt(content.storage_limit, 10) * 1000; // storage_limit is given in mtz
      return acc;
    }, 0);
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
    sbytes: string
  ): Promise<DelegateOperation> {
    const { hash, context, forgedBytes, opResponse } = await this.inject(params, prefixSig, sbytes);
    if (!params.opOb.contents) {
      throw new Error('Invalid operation contents');
    }

    const delegationParams: OperationContents | undefined = params.opOb.contents.find(
      content => content.kind === 'delegation'
    );
    if (!delegationParams) {
      throw new Error('No delegation in operation contents');
    }

    const operation = await createSetDelegateOperation(
      operationContentsToDelegateParams(delegationParams as OperationContentsDelegation)
    );
    return new DelegateOperation(
      hash,
      operation,
      (params.opOb.contents[0] as OperationContentsDelegation).source,
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
    const sourceOrDefault = params.source || (await this.signer.publicKeyHash());
    const operation = await createRegisterDelegateOperation(
      { ...params, ...estimate },
      sourceOrDefault
    );
    const opBytes = await this.prepareAndForge({ operation });
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
   * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
   *
   * @returns An operation handle with the result from the rpc node
   *
   * @param Transfer operation parameter
   */
  async transfer(params: TransferParams) {
    const estimate = await this.estimate(
      params,
      this.estimator.transfer.bind(this.estimator, params)
    );
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
   * @returns GetTransferSignatureHashResponse parameters needed to sign and broadcast, and a number which represent the fees in mutez
   *
   * @param params operation parameters
   */
  async getTransferSignatureHashAndFees(
    params: TransferParams
  ): Promise<{ forgedBytes: ForgedBytes; fees: Number }> {
    const estimate = await this.estimate(params, this.estimator.transfer.bind(this.estimator));
    const operation = await createTransferOperation({
      ...params,
      ...estimate,
    });
    const source = params.source || (await this.signer.publicKeyHash());
    const forgedBytes = await this.prepareAndForge({ operation, source });
    const fees = this.calculateTotalFees(forgedBytes);
    return { forgedBytes, fees };
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

    const transactionParams: OperationContents | undefined = params.opOb.contents.find(
      content => content.kind === 'transaction'
    );
    if (!transactionParams) {
      throw new Error('No transaction in operation contents');
    }

    const operation = await createTransferOperation(
      operationContentsToTransferParams(transactionParams as OperationContentsTransaction)
    );
    return new TransactionOperation(
      hash,
      operation,
      (params.opOb.contents[0] as OperationContentsTransaction).source,
      forgedBytes,
      opResponse,
      context
    );
  }

  async at(address: string): Promise<Contract> {
    const script = await this.rpc.getScript(address);
    const entrypoints = await this.rpc.getEntrypoints(address);
    return new Contract(address, script, this, entrypoints);
  }
}

function operationContentsToTransferParams(op: OperationContentsTransaction): TransferParams {
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

function operationContentsToDelegateParams(op: OperationContentsDelegation): DelegateParams {
  return {
    source: op.source,
    delegate: op.delegate || '',
    fee: Number(op.fee),
    gasLimit: Number(op.gas_limit),
    storageLimit: Number(op.storage_limit),
  };
}
