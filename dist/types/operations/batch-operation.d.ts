import { OperationContentsAndResult, OperationResultStatusEnum } from '@taquito/rpc';
import { Context } from '../context';
import { Operation } from './operations';
import { FeeConsumingOperation, ForgedBytes, GasConsumingOperation, RPCOperation, StorageConsumingOperation } from './types';
export declare class BatchOperation extends Operation implements GasConsumingOperation, StorageConsumingOperation, FeeConsumingOperation {
    private readonly params;
    readonly source: string;
    constructor(hash: string, params: RPCOperation[], source: string, raw: ForgedBytes, results: OperationContentsAndResult[], context: Context);
    private sumProp;
    get status(): OperationResultStatusEnum | "unknown";
    get fee(): any;
    get gasLimit(): any;
    get storageLimit(): any;
    get consumedGas(): string;
    get storageDiff(): string;
    get errors(): import("@taquito/rpc").TezosGenericOperationError[];
}
