import { ConstructedOperation } from '@taquito/rpc';
export interface ForgeParams {
    branch: string;
    contents: ConstructedOperation[];
}
export declare type ForgeResponse = string;
export interface Forger {
    forge(params: ForgeParams): Promise<ForgeResponse>;
}
