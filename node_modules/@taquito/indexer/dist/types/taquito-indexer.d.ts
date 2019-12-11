import { HttpBackend } from '@taquito/http-utils';
import { BalanceHistory } from './types';
export interface BalanceHistoryOptions {
    start?: string | Date;
    end?: string | Date;
    limit?: number;
}
/***
 * @description RpcClient allows interaction with Tezos network through an rpc node
 */
export declare class IndexerClient {
    private url;
    private httpBackend;
    /**
     *
     * @param url indexer root url (default https://tezrpc.me)
     * @param httpBackend Http backend that issue http request.
     * You can override it by providing your own if you which to hook in the request/response
     *
     * @example new IndexerClient('https://api.tez.ie/indexer/mainnet')
     */
    constructor(url?: string, httpBackend?: HttpBackend);
    getBalanceHistory(address: string, { start, end, limit }?: BalanceHistoryOptions): Promise<BalanceHistory>;
}
