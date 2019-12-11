import { Token, TokenFactory, ComparableToken } from '../token';
import BigNumber from 'bignumber.js';
export declare class MutezToken extends Token implements ComparableToken {
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
    Execute(val: any): BigNumber;
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
