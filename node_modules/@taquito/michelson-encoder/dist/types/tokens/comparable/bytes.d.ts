import { Token, TokenFactory, ComparableToken } from '../token';
export declare class BytesToken extends Token implements ComparableToken {
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
    ToBigMapKey(val: string): {
        key: {
            bytes: string;
        };
        type: {
            prim: string;
        };
    };
    Encode(args: any[]): any;
    EncodeObject(val: any): {
        bytes: string;
    };
    Execute(val: any): string;
    ExtractSchema(): string;
    ToKey({ bytes, string }: any): any;
}
