import { OperationContentsAndResult } from '@taquito/rpc';
import { Context } from '../context';
import { RpcContractProvider } from '../contract/rpc-contract-provider';
import { Operation } from './operations';
import { ForgedBytes, GasConsumingOperation, StorageConsumingOperation, RPCOriginationOperation, FeeConsumingOperation } from './types';
/**
 * @description Origination operation provide utility function to fetch newly originated contract
 *
 * @warn Currently support only one origination per operation
 */
export declare class OriginationOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    private contractProvider;
    /**
     * @description Contract address of the newly originated contract
     */
    readonly contractAddress?: string;
    constructor(hash: string, params: RPCOriginationOperation, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context, contractProvider: RpcContractProvider);
    readonly operationResults: any;
    readonly fee: number;
    readonly gasLimit: number;
    readonly storageLimit: number;
    readonly consumedGas: any;
    readonly storageDiff: any;
    readonly storageSize: any;
    readonly errors: any;
    /**
     * @description Provide the contract abstract of the newly originated contract
     */
    contract(confirmations?: number, interval?: number, timeout?: number): Promise<import("../contract/contract").Contract>;
}
