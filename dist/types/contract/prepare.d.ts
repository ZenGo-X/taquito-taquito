import { OriginateParams, RPCOriginationOperation, TransferParams, RPCTransferOperation, DelegateParams, RPCDelegateOperation, RegisterDelegateParams } from '../operations/types';
export declare const createOriginationOperation: ({ code, init, balance, spendable, delegatable, delegate, storage, fee, gasLimit, storageLimit, }: OriginateParams, publicKeyHash: string) => Promise<RPCOriginationOperation>;
export declare const createTransferOperation: ({ to, amount, parameter, fee, gasLimit, storageLimit, mutez, rawParam, }: TransferParams) => Promise<RPCTransferOperation>;
export declare const createSetDelegateOperation: ({ delegate, source, fee, gasLimit, storageLimit, }: DelegateParams) => Promise<RPCDelegateOperation>;
export declare const createRegisterDelegateOperation: ({ fee, gasLimit, storageLimit, }: RegisterDelegateParams, source: string) => Promise<RPCDelegateOperation>;
