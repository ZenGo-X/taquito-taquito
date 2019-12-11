import { Token, TokenFactory, ComparableToken } from '../token';
export declare class IntToken extends Token implements ComparableToken {
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
        [key: string]: string;
    }): {
        [key: string]: any;
    };
    ExtractSchema(): string;
    Encode(args: any[]): any;
    EncodeObject(val: any): any;
    ToBigMapKey(val: string): {
        key: {
            int: string;
        };
        type: {
            prim: string;
        };
    };
    ToKey({ int }: any): any;
}
