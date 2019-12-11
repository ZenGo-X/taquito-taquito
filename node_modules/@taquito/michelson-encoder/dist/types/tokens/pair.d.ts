import { Token, TokenFactory, Semantic } from './token';
export declare class PairToken extends Token {
    protected val: {
        prim: string;
        args: any[];
        annots: any[];
    };
    protected idx: number;
    protected fac: TokenFactory;
    static prim: string;
    constructor(val: {
        prim: string;
        args: any[];
        annots: any[];
    }, idx: number, fac: TokenFactory);
    Encode(args: any[]): any;
    ExtractSignature(): any;
    EncodeObject(args: any): any;
    private traversal;
    Execute(val: any, semantics?: Semantic): {
        [key: string]: any;
    };
    ExtractSchema(): any;
}
