import { OperationContents, OperationContentsAndResult, RpcClient, RPCRunOperationParam } from '@taquito/rpc';
import { Context } from '../context';
import { Estimate } from '../contract/estimate';
import { ForgedBytes, ParamsWithKind, PrepareOperationParams, RPCOperation } from './types';
export interface PreparedOperation {
    opOb: {
        branch: string;
        contents: OperationContents[];
        protocol: string;
    };
    counter: number;
}
export declare abstract class OperationEmitter {
    protected context: Context;
    get rpc(): RpcClient;
    get signer(): import("../taquito").Signer;
    constructor(context: Context);
    protected isRevealOpNeeded(op: RPCOperation[] | ParamsWithKind[], pkh: string): Promise<boolean>;
    protected isAccountRevealRequired(publicKeyHash: string): Promise<boolean>;
    protected isRevealRequiredForOpType(op: RPCOperation[] | ParamsWithKind[]): boolean;
    protected prepareOperation({ operation, source, }: PrepareOperationParams): Promise<PreparedOperation>;
    protected forge({ opOb: { branch, contents, protocol }, counter }: PreparedOperation): Promise<{
        opbytes: string;
        opOb: {
            branch: string;
            contents: OperationContents[];
            protocol: string;
        };
        counter: number;
    }>;
    protected simulate(op: RPCRunOperationParam): Promise<{
        opResponse: import("@taquito/rpc").PreapplyResponse;
        op: RPCRunOperationParam;
        context: Context;
    }>;
    protected estimate<T extends {
        fee?: number;
        gasLimit?: number;
        storageLimit?: number;
    }>({ fee, gasLimit, storageLimit, ...rest }: T, estimator: (param: T) => Promise<Estimate>): Promise<{
        fee: number;
        gasLimit: number;
        storageLimit: number;
    }>;
    protected signAndInject(forgedBytes: ForgedBytes): Promise<{
        hash: string;
        forgedBytes: ForgedBytes;
        opResponse: OperationContentsAndResult[];
        context: Context;
    }>;
    protected inject(forgedBytes: ForgedBytes, prefixSig: string, sbytes: string): Promise<{
        hash: string;
        forgedBytes: ForgedBytes;
        opResponse: OperationContentsAndResult[];
        context: Context;
    }>;
}
