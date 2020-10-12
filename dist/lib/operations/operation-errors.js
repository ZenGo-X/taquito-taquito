"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var isErrorWithMessage = function (error) {
    return 'with' in error;
};
var TezosOperationError = /** @class */ (function () {
    function TezosOperationError(errors) {
        this.errors = errors;
        this.name = 'TezosOperationError';
        // Last error is 'often' the one with more detail
        var lastError = errors[errors.length - 1];
        this.id = lastError.id;
        this.kind = lastError.kind;
        this.message = "(" + this.kind + ") " + this.id;
        if (isErrorWithMessage(lastError) && lastError.with.string) {
            this.message = lastError.with.string;
        }
    }
    return TezosOperationError;
}());
exports.TezosOperationError = TezosOperationError;
var TezosPreapplyFailureError = /** @class */ (function () {
    function TezosPreapplyFailureError(result) {
        this.result = result;
        this.name = 'TezosPreapplyFailureError';
        this.message = 'Preapply returned an unexpected result';
    }
    return TezosPreapplyFailureError;
}());
exports.TezosPreapplyFailureError = TezosPreapplyFailureError;
exports.flattenOperationResult = function (response) {
    var results = Array.isArray(response) ? response : [response];
    var returnedResults = [];
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].contents.length; j++) {
            var content = results[i].contents[j];
            if ('metadata' in content && typeof content.metadata.operation_result !== 'undefined') {
                returnedResults.push(content.metadata.operation_result);
                if (Array.isArray(content.metadata.internal_operation_results)) {
                    content.metadata.internal_operation_results.forEach(function (x) {
                        return returnedResults.push(x.result);
                    });
                }
            }
        }
    }
    return returnedResults;
};
/***
 * @description Flatten all error from preapply response (including internal error)
 */
exports.flattenErrors = function (response, status) {
    var e_1, _a;
    if (status === void 0) { status = 'failed'; }
    var results = Array.isArray(response) ? response : [response];
    var errors = [];
    // Transaction that do not fail will be backtracked in case one failure occur
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].contents.length; j++) {
            var content = results[i].contents[j];
            if ('metadata' in content) {
                if (typeof content.metadata.operation_result !== 'undefined' &&
                    content.metadata.operation_result.status === status) {
                    errors = errors.concat(content.metadata.operation_result.errors || []);
                }
                if (Array.isArray(content.metadata.internal_operation_results)) {
                    try {
                        for (var _b = (e_1 = void 0, __values(content.metadata.internal_operation_results)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var internalResult = _c.value;
                            if ('result' in internalResult && internalResult.result.status === status) {
                                errors = errors.concat(internalResult.result.errors || []);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        }
    }
    return errors;
};
//# sourceMappingURL=operation-errors.js.map