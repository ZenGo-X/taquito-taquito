import { RpcClient } from '@taquito/rpc';
import { Protocols } from './constants';
import { Config, Context, TaquitoProvider } from './context';
import { ContractProvider, EstimationProvider } from './contract/interface';
import { Forger } from './forger/interface';
import { format } from './format';
import { Signer } from './signer/interface';
import { SubscribeProvider } from './subscribe/interface';
import { TzProvider } from './tz/interface';
import { Wallet, WalletProvider } from './wallet';
import { OperationFactory } from './wallet/opreation-factory';
export { MichelsonMap, UnitValue } from '@taquito/michelson-encoder';
export * from './constants';
export * from './context';
export { TaquitoProvider } from './context';
export * from './contract';
export * from './contract/big-map';
export { CompositeForger } from './forger/composite-forger';
export * from './forger/interface';
export { RpcForger } from './forger/rpc-forger';
export { TezosOperationError, TezosOperationErrorWithMessage, TezosPreapplyFailureError, } from './operations/operation-errors';
export { OpKind } from './operations/types';
export * from './signer/interface';
export * from './subscribe/interface';
export { SubscribeProvider } from './subscribe/interface';
export { PollingSubscribeProvider } from './subscribe/polling-provider';
export * from './tz/interface';
export * from './wallet';
export interface SetProviderOptions {
    forger?: Forger;
    wallet?: WalletProvider;
    rpc?: string | RpcClient;
    stream?: string | SubscribeProvider;
    signer?: Signer;
    protocol?: Protocols;
    config?: Config;
}
/**
 * @description Facade class that surfaces all of the libraries capability and allow it's configuration
 *
 * @param _rpc The RPC server to use
 */
export declare class TezosToolkit {
    private _rpc;
    private _context;
    private _stream;
    private _options;
    private _rpcClient;
    private _wallet;
    readonly format: typeof format;
    constructor(_rpc: RpcClient | string, _context?: Context);
    /**
     * @description Sets configuration on the Tezos Taquito instance. Allows user to choose which signer, rpc client, rpc url, forger and so forth
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network
     *
     * @example Tezos.setProvider({rpc: 'https://api.tez.ie/rpc/mainnet', signer: new InMemorySigner.fromSecretKey(“edsk...”)})
     * @example Tezos.setProvider({ config: { confirmationPollingTimeoutSecond: 300 }})
     *
     */
    setProvider({ rpc, stream, signer, protocol, config, forger, wallet }: SetProviderOptions): void;
    /**
     * @description Sets signer provider on the Tezos Taquito instance.
     *
     * @param options signer to use to interact with the Tezos network
     *
     * @example Tezos.setSignerProvider(new InMemorySigner.fromSecretKey('edsk...'))
     *
     */
    setSignerProvider(signer?: SetProviderOptions['signer']): void;
    /**
     * @description Sets rpc provider on the Tezos Taquito instance
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network
     *
     * @example Tezos.setRpcProvider('https://api.tez.ie/rpc/mainnet')
     *
     */
    setRpcProvider(rpc?: SetProviderOptions['rpc']): void;
    /**
     * @description Sets forger provider on the Tezos Taquito instance
     *
     * @param options forger to use to interact with the Tezos network
     *
     * @example Tezos.setForgerProvider(localForger)
     *
     */
    setForgerProvider(forger?: SetProviderOptions['forger']): void;
    /**
     * @description Sets stream provider on the Tezos Taquito instance
     *
     * @param options stream to use to interact with the Tezos network
     *
     * @example Tezos.setStreamProvider(...)
     *
     */
    setStreamProvider(stream?: SetProviderOptions['stream']): void;
    /**
     * @description Sets wallet provider on the Tezos Taquito instance
     *
     * @param options wallet to use to interact with the Tezos network
     *
     * @example Tezos.setWalletProvider(...)
     *
     */
    setWalletProvider(wallet?: SetProviderOptions['wallet']): void;
    /**
     * @description Provide access to tezos account management
     */
    get tz(): TzProvider;
    /**
     * @description Provide access to smart contract utilities
     */
    get contract(): ContractProvider;
    get wallet(): Wallet;
    get operation(): OperationFactory;
    batch: (params?: import("./operations/types").ParamsWithKind[] | undefined) => import("./batch/rpc-batch-provider").OperationBatch;
    /**
     * @description Provide access to operation estimation utilities
     */
    get estimate(): EstimationProvider;
    /**
     * @description Provide access to streaming utilities backed by an streamer implementation
     */
    get stream(): SubscribeProvider;
    /**
     * @description Provide access to the currently used rpc client
     */
    get rpc(): RpcClient;
    /**
     * @description Provide access to the currently used signer
     */
    get signer(): Signer;
    getFactory<T, K extends Array<any>>(ctor: TaquitoProvider<T, K>): (...args: K) => T;
}
