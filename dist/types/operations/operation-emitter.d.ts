import { ConstructedOperation, OperationContentsAndResult, RpcClient, RPCRunOperationParam } from '@taquito/rpc';
import { Context } from '../context';
import { ForgedBytes, PrepareOperationParams } from './types';
export interface PreparedOperation {
    opOb: {
        branch: string;
        contents: ConstructedOperation[];
        protocol: string;
    };
    counter: number;
}
export declare abstract class OperationEmitter {
    protected context: Context;
    readonly rpc: RpcClient;
    readonly signer: import("../taquito").Signer;
    constructor(context: Context);
    private isSourceOp;
    private isFeeOp;
    protected prepareOperation({ operation, source, }: PrepareOperationParams): Promise<PreparedOperation>;
    protected prepareAndForge(params: PrepareOperationParams): Promise<{
        opbytes: string;
        opOb: {
            branch: string;
            contents: ConstructedOperation[];
            protocol: string;
        };
        counter: number;
    }>;
    protected forge({ opOb: { branch, contents, protocol }, counter }: PreparedOperation): Promise<{
        opbytes: string;
        opOb: {
            branch: string;
            contents: ConstructedOperation[];
            protocol: string;
        };
        counter: number;
    }>;
    protected simulate(op: RPCRunOperationParam): Promise<{
        opResponse: import("@taquito/rpc").PreapplyResponse;
        op: RPCRunOperationParam;
        context: Context;
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
