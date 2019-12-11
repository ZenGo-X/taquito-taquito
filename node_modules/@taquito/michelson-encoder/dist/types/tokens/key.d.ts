import { Token, TokenFactory } from './token';
export declare class KeyToken extends Token {
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
    Execute(val: {
        bytes: string;
        string: string;
    }): string;
    Encode(args: any[]): any;
    EncodeObject(val: any): any;
    ExtractSchema(): string;
}
