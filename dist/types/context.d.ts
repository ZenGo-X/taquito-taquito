import { RpcClient } from '@taquito/rpc';
import { Protocols } from './constants';
import { Forger } from './forger/interface';
import { Injector } from './injector/interface';
import { Signer } from './signer/interface';
import { OperationFactory } from './wallet/operation-factory';
import { RpcTzProvider } from './tz/rpc-tz-provider';
import { RPCEstimateProvider } from './contract/rpc-estimate-provider';
import { RpcContractProvider } from './contract/rpc-contract-provider';
import { RPCBatchProvider } from './batch/rpc-batch-provider';
import { Wallet, WalletProvider } from './wallet';
import { ParserProvider } from './parser/interface';
import { Packer } from './packer/interface';
import { BehaviorSubject, OperatorFunction } from 'rxjs';
export interface TaquitoProvider<T, K extends Array<any>> {
    new (context: Context, ...rest: K): T;
}
export interface ConfigConfirmation {
    confirmationPollingIntervalSecond?: number;
    confirmationPollingTimeoutSecond: number;
    defaultConfirmationCount: number;
}
export declare const defaultConfigConfirmation: ConfigConfirmation;
export interface ConfigStreamer {
    streamerPollingIntervalMilliseconds: number;
    shouldObservableSubscriptionRetry: boolean;
    observableSubscriptionRetryFunction: OperatorFunction<any, any>;
}
export declare const defaultConfigStreamer: ConfigStreamer;
/**
 * @description Encapsulate common service used throughout different part of the library
 */
export declare class Context {
    private _rpc;
    private _signer;
    private _proto?;
    readonly _config: BehaviorSubject<{
        confirmationPollingIntervalSecond?: number | undefined;
        confirmationPollingTimeoutSecond: number;
        defaultConfirmationCount: number;
        streamerPollingIntervalMilliseconds: number;
        shouldObservableSubscriptionRetry: boolean;
        observableSubscriptionRetryFunction: OperatorFunction<any, any>;
    }>;
    private _rpcClient;
    private _forger;
    private _parser;
    private _injector;
    private _walletProvider;
    readonly operationFactory: OperationFactory;
    private _packer;
    readonly tz: RpcTzProvider;
    readonly estimate: RPCEstimateProvider;
    readonly contract: RpcContractProvider;
    readonly batch: RPCBatchProvider;
    readonly wallet: Wallet;
    constructor(_rpc: RpcClient | string, _signer?: Signer, _proto?: Protocols | undefined, _config?: BehaviorSubject<{
        confirmationPollingIntervalSecond?: number | undefined;
        confirmationPollingTimeoutSecond: number;
        defaultConfirmationCount: number;
        streamerPollingIntervalMilliseconds: number;
        shouldObservableSubscriptionRetry: boolean;
        observableSubscriptionRetryFunction: OperatorFunction<any, any>;
    }>, forger?: Forger, injector?: Injector, packer?: Packer, wallet?: WalletProvider, parser?: ParserProvider);
    get config(): ConfigConfirmation & ConfigStreamer;
    set config(value: ConfigConfirmation & ConfigStreamer);
    setPartialConfig(value: Partial<ConfigConfirmation> & Partial<ConfigStreamer>): void;
    get rpc(): RpcClient;
    set rpc(value: RpcClient);
    get injector(): Injector;
    set injector(value: Injector);
    get forger(): Forger;
    set forger(value: Forger);
    get signer(): Signer;
    get walletProvider(): WalletProvider;
    set walletProvider(value: WalletProvider);
    set signer(value: Signer);
    set proto(value: Protocols | undefined);
    get proto(): Protocols | undefined;
    get parser(): ParserProvider;
    set parser(value: ParserProvider);
    get packer(): Packer;
    set packer(value: Packer);
    isAnyProtocolActive(protocol?: string[]): Promise<boolean>;
    getConfirmationPollingInterval(): Promise<number>;
    /**
     * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
     */
    clone(): Context;
}
