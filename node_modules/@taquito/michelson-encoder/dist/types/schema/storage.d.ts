import { MichelsonV1Expression, ScriptResponse } from '@taquito/rpc';
import { Semantic } from '../tokens/token';
import { RpcTransaction } from './model';
/**
 * @warn Our current smart contract abstraction feature is currently in preview. It's API is not final, and it may not cover every use case (yet). We will greatly appreciate any feedback on this feature.
 */
export declare class Schema {
    private root;
    private bigMap?;
    static fromRPCResponse(val: {
        script: ScriptResponse;
    }): Schema;
    private isExpressionExtended;
    constructor(val: MichelsonV1Expression);
    private removeTopLevelAnnotation;
    Execute(val: any, semantics?: Semantic): any;
    ExecuteOnBigMapDiff(diff: any[], semantics?: Semantic): any;
    ExecuteOnBigMapValue(key: any, semantics?: Semantic): any;
    EncodeBigMapKey(key: string): {
        key: {
            [key: string]: string;
        };
        type: {
            prim: string;
        };
    };
    Encode(_value?: any): any;
    ExtractSchema(): any;
    /**
     * @deprecated
     */
    ComputeState(tx: RpcTransaction[], state: any): any;
}
