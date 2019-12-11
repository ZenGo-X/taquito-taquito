import { Token, TokenFactory, Semantic } from './token';
export declare class ListToken extends Token {
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
    Execute(val: any, semantics?: Semantic): any;
    EncodeObject(args: any): any;
    ExtractSchema(): string;
}
