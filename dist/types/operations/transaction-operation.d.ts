import { OperationContentsAndResult, OperationResultTransaction } from '@taquito/rpc';
import { Context } from '../context';
import { Operation } from './operations';
import { ForgedBytes, GasConsumingOperation, StorageConsumingOperation, RPCTransferOperation, FeeConsumingOperation } from './types';
import BigNumber from 'bignumber.js';
/**
 * @description Transaction operation provide utility function to fetch newly issued transaction
 *
 * @warn Currently support only one transaction per operation
 */
export declare class TransactionOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    readonly source: string;
    constructor(hash: string, params: RPCTransferOperation, source: string, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context);
    readonly operationResults: OperationResultTransaction | undefined;
    readonly amount: BigNumber;
    readonly destination: string;
    readonly fee: number;
    readonly gasLimit: number;
    readonly storageLimit: number;
    readonly consumedGas: string | undefined;
    readonly storageDiff: string | undefined;
    readonly storageSize: string | undefined;
    readonly errors: any;
}
