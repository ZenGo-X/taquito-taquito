import { Token, TokenFactory, ComparableToken, Semantic } from './token';
export declare class BigMapToken extends Token {
    protected val: {
        prim: string;
        args: any[];
        annots?: any[];
    };
    protected idx: number;
    protected fac: TokenFactory;
    static prim: string;
    constructor(val: {
        prim: string;
        args: any[];
        annots?: any[];
    }, idx: number, fac: TokenFactory);
    readonly ValueSchema: Token;
    readonly KeySchema: ComparableToken;
    ExtractSchema(): {
        [x: number]: any;
    };
    Encode(args: any[]): any;
    EncodeObject(args: any): any;
    Execute(val: any[] | {
        int: string;
    }, semantic?: Semantic): any;
}
