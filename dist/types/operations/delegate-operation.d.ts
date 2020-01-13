import { OperationContentsAndResult } from '@taquito/rpc';
import { Context } from '../context';
import { Operation } from './operations';
import { ForgedBytes, GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation, RPCDelegateOperation } from './types';
/**
 * @description Delegation operation provide utility function to fetch newly issued delegation
 *
 * @warn Currently support only one delegation per operation
 */
export declare class DelegateOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    readonly source: string;
    constructor(hash: string, params: RPCDelegateOperation, source: string, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context);
    readonly operationResults: import("@taquito/rpc").OperationResultDelegation | undefined;
    readonly delegate: string;
    readonly isRegisterOperation: boolean;
    readonly fee: number;
    readonly gasLimit: number;
    readonly storageLimit: number;
    readonly consumedGas: string | undefined;
    readonly errors: any;
}
