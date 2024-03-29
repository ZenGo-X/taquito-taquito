import { BigMapKeyType, MichelsonMap, MichelsonMapKey, Schema } from '@taquito/michelson-encoder';
import { OperationBatch } from '../batch/rpc-batch-provider';
import { Context } from '../context';
import { DelegateOperation } from '../operations/delegate-operation';
import { OperationEmitter } from '../operations/operation-emitter';
import { OriginationOperation } from '../operations/origination-operation';
import { RevealOperation } from '../operations/reveal-operation';
import { TransactionOperation } from '../operations/transaction-operation';
import { DelegateParams, ForgedBytes, OriginateParams, ParamsWithKind, RegisterDelegateParams, RevealParams, TransferParams } from '../operations/types';
import { ContractAbstraction } from './contract';
import { ContractProvider, ContractSchema, EstimationProvider, StorageProvider } from './interface';
export declare class RpcContractProvider extends OperationEmitter implements ContractProvider, StorageProvider {
    private estimator;
    constructor(context: Context, estimator: EstimationProvider);
    contractProviderTypeSymbol: symbol;
    /**
     *
     * @description Return a well formatted json object of the contract storage
     *
     * @param contract contract address you want to get the storage from
     * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
     */
    getStorage<T>(contract: string, schema?: ContractSchema): Promise<T>;
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
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
     */
    getBigMapKey<T>(contract: string, key: string, schema?: ContractSchema): Promise<T>;
    /**
     *
     * @description Return a well formatted json object of a big map value
     *
     * @param id Big Map ID
     * @param keyToEncode key to query (will be encoded properly according to the schema)
     * @param schema Big Map schema (can be determined using your contract type)
     * @param block optional block level to fetch the values from
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
     */
    getBigMapKeyByID<T>(id: string, keyToEncode: BigMapKeyType, schema: Schema, block?: number): Promise<T>;
    /**
     *
     * @description Fetch multiple values in a big map
     * All values will be fetched on the same block level. If a block is specified in the request, the values will be fetched at it.
     * Otherwise, a first request will be done to the node to fetch the level of the head and all values will be fetched at this level.
     * If one of the keys does not exist in the big map, its value will be set to undefined.
     *
     * @param id Big Map ID
     * @param keys Array of keys to query (will be encoded properly according to the schema)
     * @param schema Big Map schema (can be determined using your contract type)
     * @param block optional block level to fetch the values from
     * @param batchSize optional batch size representing the number of requests to execute in parallel
     * @returns A MichelsonMap containing the keys queried in the big map and their value in a well-formatted JSON object format
     *
     */
    getBigMapKeysByID<T>(id: string, keys: Array<BigMapKeyType>, schema: Schema, block?: number, batchSize?: number): Promise<MichelsonMap<MichelsonMapKey, T | undefined>>;
    private prepareAndForge;
    private getBlockForRequest;
    private getBigMapValueOrUndefined;
    /**
     *
     * @description Return a well formatted json object of a sapling state
     *
     * @param id Sapling state ID
     * @param block optional block level to fetch the value from
     *
     */
    getSaplingDiffByID(id: string, block?: number): Promise<import("@taquito/rpc").SaplingDiffResponse>;
    private addRevealOperationIfNeeded;
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
    originate(params: OriginateParams): Promise<OriginationOperation>;
    /**
     *
     * @description Set the delegate for a contract. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param SetDelegate operation parameter
     */
    setDelegate(params: DelegateParams): Promise<DelegateOperation>;
    /**
     *
     * @description Get relevant parameters for later signing and broadcast of a delegate transaction
     *
     * @returns ForgedBytes parameters needed to sign and broadcast
     *
     * @param params delegate parameters
     */
    getDelegateSignatureHash(params: DelegateParams): Promise<ForgedBytes>;
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
    injectDelegateSignatureAndBroadcast(params: ForgedBytes, prefixSig: string, sbytes: string): Promise<DelegateOperation>;
    /**
     *
     * @description Register the current address as delegate. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RegisterDelegate operation parameter
     */
    registerDelegate(params: RegisterDelegateParams): Promise<DelegateOperation>;
    /**
     *
     * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param Transfer operation parameter
     */
    transfer(params: TransferParams): Promise<TransactionOperation>;
    /**
     *
     * @description Get relevant parameters for later signing and broadcast of a transfer transaction
     *
     * @returns GetTransferSignatureHashResponse parameters needed to sign and broadcast
     *
     * @param params operation parameters
     */
    getTransferSignatureHash(params: TransferParams): Promise<ForgedBytes>;
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
    injectTransferSignatureAndBroadcast(params: ForgedBytes, prefixSig: string, sbytes: string): Promise<TransactionOperation>;
    /**
     *
     * @description Reveal the current address. Will throw an error if the address is already revealed.
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RevealParams operation parameter
     */
    reveal(params: RevealParams): Promise<RevealOperation>;
    at<T extends ContractAbstraction<ContractProvider>>(address: string, contractAbstractionComposer?: ContractAbstractionComposer<T>): Promise<T>;
    /**
     *
     * @description Batch a group of operation together. Operations will be applied in the order in which they are added to the batch
     *
     * @returns A batch object from which we can add more operation or send a command to execute the batch
     *
     * @param params List of operation to batch together
     */
    batch(params?: ParamsWithKind[]): OperationBatch;
}
declare type ContractAbstractionComposer<T> = (abs: ContractAbstraction<ContractProvider>, context: Context) => T;
export {};
