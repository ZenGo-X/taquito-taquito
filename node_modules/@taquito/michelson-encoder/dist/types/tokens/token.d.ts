import { MichelsonV1Expression } from '@taquito/rpc';
export declare type TokenFactory = (val: any, idx: number) => Token;
export interface Semantic {
    [key: string]: (value: MichelsonV1Expression, schema: MichelsonV1Expression) => any;
}
export interface ComparableToken extends Token {
    ToBigMapKey(val: string): {
        key: {
            [key: string]: string;
        };
        type: {
            prim: string;
        };
    };
    ToKey(val: string): string;
}
export declare abstract class Token {
    protected val: {
        prim: string;
        args: any[];
        annots?: any[];
    };
    protected idx: number;
    protected fac: TokenFactory;
    constructor(val: {
        prim: string;
        args: any[];
        annots?: any[];
    }, idx: number, fac: TokenFactory);
    annot(): any;
    hasAnnotations(): number | false;
    createToken: TokenFactory;
    abstract ExtractSchema(): any;
    abstract Execute(val: any, semantics?: Semantic): any;
    abstract Encode(_args: any[]): any;
    abstract EncodeObject(args: any): any;
    ExtractSignature(): any[][];
}
