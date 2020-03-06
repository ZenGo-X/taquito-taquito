import { ParameterSchema, Schema } from '@taquito/michelson-encoder';
import { EntrypointsResponse, ScriptResponse } from '@taquito/rpc';
import { ContractProvider } from './interface';
import { TransferParams } from '../operations/types';
interface SendParams {
    fee?: number;
    storageLimit?: number;
    gasLimit?: number;
    amount?: number;
}
/**
 * @description Utility class to send smart contract operation
 */
export declare class ContractMethod {
    private provider;
    private address;
    private parameterSchema;
    private name;
    private args;
    private isMultipleEntrypoint;
    private isAnonymous;
    constructor(provider: ContractProvider, address: string, parameterSchema: ParameterSchema, name: string, args: any[], isMultipleEntrypoint?: boolean, isAnonymous?: boolean);
    /**
     * @description Get the schema of the smart contract method
     */
    readonly schema: any;
    /**
     *
     * @description Send the smart contract operation
     *
     * @param Options generic operation parameter
     */
    send(params?: Partial<SendParams>): Promise<import("../operations/transaction-operation").TransactionOperation>;
    toTransferParams({ fee, gasLimit, storageLimit, amount, }?: Partial<SendParams>): TransferParams;
}
/**
 * @description Smart contract abstraction
 */
export declare class Contract {
    readonly address: string;
    readonly script: ScriptResponse;
    private provider;
    private entrypoints;
    /**
     * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
     * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
     *
     */
    methods: {
        [key: string]: (...args: any[]) => ContractMethod;
    };
    readonly schema: Schema;
    readonly parameterSchema: ParameterSchema;
    constructor(address: string, script: ScriptResponse, provider: ContractProvider, entrypoints: EntrypointsResponse);
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
     */
    bigMap(key: string): Promise<unknown>;
}
export {};
