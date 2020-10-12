import { RpcClient } from '@taquito/rpc';
import { Signer } from './signer/interface';
import { Protocols } from './constants';
import { Forger } from './forger/interface';
import { Injector } from './injector/interface';
export interface TaquitoProvider<T, K extends Array<any>> {
    new (context: Context, ...rest: K): T;
}
export interface Config {
    confirmationPollingIntervalSecond?: number;
    confirmationPollingTimeoutSecond?: number;
    defaultConfirmationCount?: number;
}
export declare const defaultConfig: Required<Config>;
/**
 * @description Encapsulate common service used throughout different part of the library
 */
export declare class Context {
    private _rpcClient;
    private _signer;
    private _proto?;
    private _config?;
    private _forger;
    private _injector;
    constructor(_rpcClient?: RpcClient, _signer?: Signer, _proto?: Protocols | undefined, _config?: Partial<Config> | undefined, forger?: Forger, injector?: Injector);
    config: Required<Config>;
    rpc: RpcClient;
    injector: Injector;
    forger: Forger;
    signer: Signer;
    proto: Protocols | undefined;
    isAnyProtocolActive(protocol?: string[]): Promise<boolean>;
    /**
     * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
     */
    clone(): Context;
}
