import { Token, TokenFactory, Semantic } from './token';
export declare class MapToken extends Token {
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
    readonly ValueSchema: Token;
    readonly KeySchema: Token & {
        ToKey: (x: any) => string;
    };
    Execute(val: any[], semantics?: Semantic): {
        [key: string]: any;
    };
    Encode(args: any[]): any;
    EncodeObject(args: any): any;
    ExtractSchema(): {
        [x: number]: any;
    };
}
