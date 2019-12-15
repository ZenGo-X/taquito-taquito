import { Schema } from '@taquito/michelson-encoder';
import BigNumber from 'bignumber.js';
import { ContractProvider } from './interface';
export declare class BigMapAbstraction {
    private id;
    private schema;
    private provider;
    constructor(id: BigNumber, schema: Schema, provider: ContractProvider);
    get(keyToEncode: string): Promise<unknown>;
    toJSON(): string;
    toString(): string;
}
