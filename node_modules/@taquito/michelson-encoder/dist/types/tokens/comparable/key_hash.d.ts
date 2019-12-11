import { Token, TokenFactory, ComparableToken } from '../token';
export declare class KeyHashToken extends Token implements ComparableToken {
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
    ToKey({ string, bytes }: any): any;
    ToBigMapKey(val: string): {
        key: {
            string: string;
        };
        type: {
            prim: string;
        };
    };
}
