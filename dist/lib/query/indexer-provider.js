"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexerProvider = /** @class */ (function () {
    function IndexerProvider(indexerClient) {
        this.indexerClient = indexerClient;
    }
    IndexerProvider.prototype.balanceHistory = function (address, _a) {
        var _b = _a === void 0 ? {} : _a, start = _b.start, end = _b.end, limit = _b.limit;
        return this.indexerClient.getBalanceHistory(address, { start: start, end: end, limit: limit });
    };
    return IndexerProvider;
}());
exports.IndexerProvider = IndexerProvider;
//# sourceMappingURL=indexer-provider.js.map