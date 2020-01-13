import { Schema } from '@taquito/michelson-encoder';
import { DelegateOperation } from '../operations/delegate-operation';
import { OriginationOperation } from '../operations/origination-operation';
import { TransactionOperation } from '../operations/transaction-operation';
import { DelegateParams, OriginateParams, TransferParams, RegisterDelegateParams, ForgedBytes } from '../operations/types';
import { Contract } from './contract';
import { Estimate } from './estimate';
export declare type ContractSchema = Schema | unknown;
export interface EstimationProvider {
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an origination operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    originate(params: OriginateParams): Promise<Estimate>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an transfer operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    transfer({ fee, storageLimit, gasLimit, ...rest }: TransferParams): Promise<Estimate>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    setDelegate(params: DelegateParams): Promise<Estimate>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    registerDelegate(params?: RegisterDelegateParams): Promise<Estimate>;
}
export interface ContractProvider {
    /**
     *
     * @description Return a well formatted json object of the contract storage
     *
     * @param contract contract address you want to get the storage from
     * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
     *
     * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
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
     * @see http://tezos.gitlab.io/master/api/rpc.html#get-block-id-context-contracts-contract-id-script
     */
    getBigMapKey<T>(contract: string, key: string, schema?: ContractSchema): Promise<T>;
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
    getBigMapKeyByID<T>(id: string, keyToEncode: string, schema: Schema): Promise<T>;
    /**
     *
     * @description Originate a new contract according to the script in parameters. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param OriginationOperation Originate operation parameter
     */
    originate(contract: OriginateParams): Promise<OriginationOperation>;
    /**
     *
     * @description Get relevant parameters for later signing and broadcast of a delegate transaction
     *
     * @returns ForgedBytes parameters needed to sign and broadcast
     *
     * @param params transfer parameters
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
     * @param (optional) trackingId Id for the provider to know the delegators source
     */
    injectDelegateSignatureAndBroadcast(params: ForgedBytes, prefixSig: string, sbytes: string, trackingId?: number): Promise<DelegateOperation>;
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
     * @description Register the current address as delegate. Will sign and inject an operation using the current context
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RegisterDelegate operation parameter
     */
    registerDelegate(params: DelegateParams): Promise<DelegateOperation>;
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
     * @returns ForgedBytes parameters needed to sign and broadcast
     *
     * @param params transfer parameters
     */
    getTransferSignatureHash(params: TransferParams): Promise<ForgedBytes>;
    /**
     *
     * @description inject a signature to construct a transfer operation
     *
     * @returns A transfer operation handle with the result from the rpc node
     *
     * @param params result of `getTransferSignatureHash`
     * @param prefixSig the prefix to be used for the encoding of the signature bytes
     * @param sbytes signature bytes in hex
     */
    injectTransferSignatureAndBroadcast(params: ForgedBytes, prefixSig: string, sbytes: string): Promise<TransactionOperation>;
    at(address: string, schema?: ContractSchema): Promise<Contract>;
}
