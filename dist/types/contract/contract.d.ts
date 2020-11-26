import { ParameterSchema, Schema } from '@taquito/michelson-encoder';
import { EntrypointsResponse, ScriptResponse } from '@taquito/rpc';
import { TransactionOperation } from '../operations/transaction-operation';
import { TransferParams } from '../operations/types';
import { TransactionWalletOperation, Wallet } from '../wallet';
import { ContractProvider, StorageProvider } from './interface';
interface SendParams {
    fee?: number;
    storageLimit?: number;
    gasLimit?: number;
    amount: number;
    source?: string;
    mutez?: boolean;
}
/**
 * @description Utility class to send smart contract operation
 */
export declare class ContractMethod<T extends ContractProvider | Wallet> {
    private provider;
    private address;
    private parameterSchema;
    private name;
    private args;
    private isMultipleEntrypoint;
    private isAnonymous;
    constructor(provider: T, address: string, parameterSchema: ParameterSchema, name: string, args: any[], isMultipleEntrypoint?: boolean, isAnonymous?: boolean);
    /**
     * @description Get the schema of the smart contract method
     */
    get schema(): any;
    /**
     *
     * @description Send the smart contract operation
     *
     * @param Options generic operation parameter
     */
    send(params?: Partial<SendParams>): Promise<T extends Wallet ? TransactionWalletOperation : TransactionOperation>;
    /**
     *
     * @description Create transfer params to be used with TezosToolkit.contract.transfer methods
     *
     * @param Options generic transfer operation parameters
     */
    toTransferParams({ fee, gasLimit, storageLimit, source, amount, mutez, }?: Partial<SendParams>): TransferParams;
}
export declare type Contract = ContractAbstraction<ContractProvider>;
export declare type WalletContract = ContractAbstraction<Wallet>;
/**
 * @description Smart contract abstraction
 */
export declare class ContractAbstraction<T extends ContractProvider | Wallet> {
    readonly address: string;
    readonly script: ScriptResponse;
    private storageProvider;
    private entrypoints;
    /**
     * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
     * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
     *
     */
    methods: {
        [key: string]: (...args: any[]) => ContractMethod<T>;
    };
    readonly schema: Schema;
    readonly parameterSchema: ParameterSchema;
    constructor(address: string, script: ScriptResponse, provider: T, storageProvider: StorageProvider, entrypoints: EntrypointsResponse);
    private _initializeMethods;
    /**
     * @description Return a friendly representation of the smart contract storage
     */
    storage<T>(): Promise<T>;
    /**
     *
     * @description Return a friendly representation of the smart contract big map value
     *
     * @param key BigMap key to fetch
     *
     * @deprecated getBigMapKey has been deprecated in favor of getBigMapKeyByID
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
     */
    bigMap(key: string): Promise<unknown>;
}
export {};
