import { Token, TokenFactory } from './token';
export declare class ContractToken extends Token {
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
    }): any;
    Encode(args: any[]): any;
    EncodeObject(val: any): any;
    ExtractSchema(): string;
}
