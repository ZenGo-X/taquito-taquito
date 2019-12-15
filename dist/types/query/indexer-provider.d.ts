import { QueryProvider, BalanceHistory, BalanceHistoryOptions } from './interface';
import { IndexerClient } from '@taquito/indexer';
export declare class IndexerProvider implements QueryProvider {
    private indexerClient;
    constructor(indexerClient: IndexerClient);
    balanceHistory(address: string, { start, end, limit }?: BalanceHistoryOptions): Promise<BalanceHistory>;
}
