import { OperationContentsAndResult, OperationContentsAndResultTransaction } from '@taquito/rpc';
import BigNumber from 'bignumber.js';
import { Context } from '../context';
import { Operation } from './operations';
import { FeeConsumingOperation, ForgedBytes, GasConsumingOperation, RPCTransferOperation, StorageConsumingOperation } from './types';
/**
 * @description Transaction operation provides utility functions to fetch a newly issued transaction
 *
 * @warn Currently supports one transaction per operation
 */
export declare class TransactionOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    readonly source: string;
    constructor(hash: string, params: RPCTransferOperation, source: string, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context);
    readonly operationResults: OperationContentsAndResultTransaction[];
    readonly amount: BigNumber;
    readonly destination: string;
    readonly fee: number;
    readonly gasLimit: number;
    readonly storageLimit: number;
    private sumProp;
    readonly consumedGas: string;
    readonly storageDiff: string;
    readonly storageSize: string;
    readonly errors: import("@taquito/rpc").TezosGenericOperationError[];
}
