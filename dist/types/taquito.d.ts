import { RpcClient } from '@taquito/rpc';
import { Protocols } from './constants';
import { Config, TaquitoProvider } from './context';
import { ContractProvider, EstimationProvider } from './contract/interface';
import { format } from './format';
import { Signer } from './signer/interface';
import { SubscribeProvider } from './subscribe/interface';
import { TzProvider } from './tz/interface';
import { Forger } from './forger/interface';
export * from './signer/interface';
export * from './subscribe/interface';
export * from './forger/interface';
export * from './tz/interface';
export * from './contract';
export * from './contract/big-map';
export * from './constants';
export { OpKind } from './operations/types';
export { TaquitoProvider } from './context';
export { PollingSubscribeProvider } from './subscribe/polling-provider';
export { RpcForger } from './forger/rpc-forger';
export { CompositeForger } from './forger/composite-forger';
export { MichelsonMap, MichelsonMapKey, MapTypecheckError, UnitValue, } from '@taquito/michelson-encoder';
export { TezosOperationError, TezosOperationErrorWithMessage, TezosPreapplyFailureError, } from './operations/operation-errors';
export { SubscribeProvider } from './subscribe/interface';
export interface SetProviderOptions {
    forger?: Forger;
    rpc?: string | RpcClient;
    stream?: string | SubscribeProvider;
    signer?: Signer;
    protocol?: Protocols;
    config?: Config;
}
/**
 * @description Facade class that surfaces all of the libraries capability and allow it's configuration
 */
export declare class TezosToolkit {
    private _rpcClient;
    private _stream;
    private _options;
    private _context;
    private _tz;
    private _estimate;
    private _contract;
    private _batch;
    readonly format: typeof format;
    constructor();
    /**
     * @description Sets configuration on the Tezos Taquito instance. Allows user to choose which signer, rpc client, rpc url, forger and so forth
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network and  url to use to interact with the Tezos network
     *
     * @example Tezos.setProvider({signer: new InMemorySigner(“edsk...”)})
     * @example Tezos.setProvider({config: {confirmationPollingTimeoutSecond: 300}})
     *
     */
    setProvider({ rpc, stream, signer, protocol, config, forger }: SetProviderOptions): void;
    private setSignerProvider;
    private setRpcProvider;
    private setForgerProvider;
    private setStreamProvider;
    /**
     * @description Provide access to tezos account management
     */
    readonly tz: TzProvider;
    /**
     * @description Provide access to smart contract utilities
     */
    readonly contract: ContractProvider;
    batch: (params?: import("./operations/types").ParamsWithKind[] | undefined) => import("./batch/rpc-batch-provider").OperationBatch;
    /**
     * @description Provide access to operation estimation utilities
     */
    readonly estimate: EstimationProvider;
    /**
     * @description Provide access to streaming utilities backed by an streamer implementation
     */
    readonly stream: SubscribeProvider;
    /**
     * @description Provide access to the currently used rpc client
     */
    readonly rpc: RpcClient;
    /**
     * @description Provide access to the currently used signer
     */
    readonly signer: Signer;
    /**
     *
     * @description Import a key to sign operation
     *
     * @param privateKey Key to load in memory
     * @param passphrase If the key is encrypted passphrase to decrypt it
     */
    importKey(privateKey: string, passphrase?: string): Promise<void>;
    /**
     *
     * @description Import a key using faucet/fundraiser parameter
     *
     * @param email Faucet email
     * @param password Faucet password
     * @param mnemonic Faucet mnemonic
     * @param secret Faucet secret
     */
    importKey(email: string, password: string, mnemonic: string, secret: string): Promise<void>;
    getFactory<T, K extends Array<any>>(ctor: TaquitoProvider<T, K>): (...args: K) => T;
}
/**
 * @description Default Tezos toolkit instance
 */
export declare const Tezos: TezosToolkit;
