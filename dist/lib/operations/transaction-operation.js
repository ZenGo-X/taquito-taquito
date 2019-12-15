"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var operations_1 = require("./operations");
var bignumber_js_1 = require("bignumber.js");
/**
 * @description Transaction operation provide utility function to fetch newly issued transaction
 *
 * @warn Currently support only one transaction per operation
 */
var TransactionOperation = /** @class */ (function (_super) {
    __extends(TransactionOperation, _super);
    function TransactionOperation(hash, params, source, raw, results, context) {
        var _this = _super.call(this, hash, raw, results, context) || this;
        _this.params = params;
        _this.source = source;
        return _this;
    }
    Object.defineProperty(TransactionOperation.prototype, "operationResults", {
        get: function () {
            var transactionOp = Array.isArray(this.results) &&
                this.results.find(function (op) { return op.kind === 'transaction'; });
            var result = transactionOp && transactionOp.metadata && transactionOp.metadata.operation_result;
            return result ? result : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "amount", {
        get: function () {
            return new bignumber_js_1.default(this.params.amount);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "destination", {
        get: function () {
            return this.params.destination;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "fee", {
        get: function () {
            return this.params.fee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "gasLimit", {
        get: function () {
            return this.params.gas_limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "storageLimit", {
        get: function () {
            return this.params.storage_limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "consumedGas", {
        get: function () {
            var consumedGas = this.operationResults && this.operationResults.consumed_gas;
            return consumedGas ? consumedGas : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "storageDiff", {
        get: function () {
            var storageDiff = this.operationResults && this.operationResults.paid_storage_size_diff;
            return storageDiff ? storageDiff : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "storageSize", {
        get: function () {
            var storageSize = this.operationResults && this.operationResults.storage_size;
            return storageSize ? storageSize : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransactionOperation.prototype, "errors", {
        get: function () {
            return this.operationResults && this.operationResults.errors;
        },
        enumerable: true,
        configurable: true
    });
    return TransactionOperation;
}(operations_1.Operation));
exports.TransactionOperation = TransactionOperation;
//# sourceMappingURL=transaction-operation.js.map