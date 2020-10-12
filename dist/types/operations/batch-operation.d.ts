import { RPCOperation, GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation, ForgedBytes } from './types';
import { Operation } from './operations';
import { OperationContentsAndResult } from '@taquito/rpc';
import { Context } from '../context';
export declare class BatchOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    readonly source: string;
    constructor(hash: string, params: RPCOperation[], source: string, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context);
    private sumProp;
    readonly fee: any;
    readonly gasLimit: any;
    readonly storageLimit: any;
    readonly consumedGas: string;
    readonly storageDiff: string;
    readonly errors: import("@taquito/rpc").TezosGenericOperationError[];
}
