import { Token, TokenFactory } from '../token';
export declare class BoolToken extends Token {
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
    Execute(val: any): boolean;
    Encode(args: any[]): any;
    EncodeObject(val: any): {
        prim: string;
    };
    ExtractSchema(): string;
}
