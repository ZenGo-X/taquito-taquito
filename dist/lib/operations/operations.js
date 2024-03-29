"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var types_1 = require("./types");
/**
 * @description Utility class to interact with Tezos operations
 */
var Operation = /** @class */ (function () {
    /**
     *
     * @param hash Operation hash
     * @param raw Raw operation that was injected
     * @param context Taquito context allowing access to rpc and signer
     */
    function Operation(hash, raw, results, context) {
        var _this = this;
        this.hash = hash;
        this.raw = raw;
        this.results = results;
        this.context = context;
        this._pollingConfig$ = new rxjs_1.ReplaySubject(1);
        this._currentHeadPromise = undefined;
        // Caching the current head for one second
        this.currentHead$ = rxjs_1.defer(function () {
            if (!_this._currentHeadPromise) {
                _this._currentHeadPromise = _this.context.rpc.getBlock();
                rxjs_1.timer(1000)
                    .pipe(operators_1.first())
                    .subscribe(function () {
                    _this._currentHeadPromise = undefined;
                });
            }
            return rxjs_1.from(_this._currentHeadPromise);
        });
        // Polling observable that emit until timeout is reached
        this.polling$ = rxjs_1.defer(function () {
            return _this._pollingConfig$.pipe(operators_1.tap(function (_a) {
                var timeout = _a.timeout, interval = _a.interval;
                if (timeout <= 0) {
                    throw new Error('Timeout must be more than 0');
                }
                if (interval <= 0) {
                    throw new Error('Interval must be more than 0');
                }
            }), operators_1.map(function (config) { return (__assign(__assign({}, config), { timeoutAt: Math.ceil(config.timeout / config.interval) + 1, count: 0 })); }), operators_1.switchMap(function (config) { return rxjs_1.timer(0, config.interval * 1000).pipe(operators_1.mapTo(config)); }), operators_1.tap(function (config) {
                config.count++;
                if (config.count > config.timeoutAt) {
                    throw new Error("Confirmation polling timed out");
                }
            }));
        });
        // Observable that emit once operation is seen in a block
        this.confirmed$ = this.polling$.pipe(operators_1.switchMapTo(this.currentHead$), operators_1.map(function (head) {
            for (var i = 3; i >= 0; i--) {
                head.operations[i].forEach(function (op) {
                    if (op.hash === _this.hash) {
                        _this._foundAt = head.header.level;
                    }
                });
            }
            if (head.header.level - _this._foundAt >= 0) {
                return _this._foundAt;
            }
        }), operators_1.filter(function (x) { return x !== undefined; }), operators_1.first(), operators_1.shareReplay());
        this._foundAt = Number.POSITIVE_INFINITY;
        this.confirmed$.pipe(operators_1.first()).subscribe();
    }
    Object.defineProperty(Operation.prototype, "includedInBlock", {
        get: function () {
            return this._foundAt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operation.prototype, "revealOperation", {
        get: function () {
            return (Array.isArray(this.results) &&
                this.results.find(function (op) { return op.kind === 'reveal'; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operation.prototype, "revealStatus", {
        get: function () {
            if (this.revealOperation) {
                return this.revealOperation.metadata.operation_result.status;
            }
            else {
                return 'unknown';
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operation.prototype, "status", {
        get: function () {
            return (this.results.map(function (result) {
                if (types_1.hasMetadataWithResult(result)) {
                    return result.metadata.operation_result.status;
                }
                else {
                    return 'unknown';
                }
            })[0] || 'unknown');
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param confirmations [0] Number of confirmation to wait for
     * @param interval [10] Polling interval
     * @param timeout [180] Timeout
     */
    Operation.prototype.confirmation = function (confirmations, interval, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmationPollingIntervalSecond, _a, _b, defaultConfirmationCount, confirmationPollingTimeoutSecond, conf;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (typeof confirmations !== 'undefined' && confirmations < 1) {
                            throw new Error('Confirmation count must be at least 1');
                        }
                        if (!(this.context.config.confirmationPollingIntervalSecond !== undefined)) return [3 /*break*/, 1];
                        _a = this.context.config.confirmationPollingIntervalSecond;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.context.getConfirmationPollingInterval()];
                    case 2:
                        _a = _c.sent();
                        _c.label = 3;
                    case 3:
                        confirmationPollingIntervalSecond = _a;
                        _b = this.context.config, defaultConfirmationCount = _b.defaultConfirmationCount, confirmationPollingTimeoutSecond = _b.confirmationPollingTimeoutSecond;
                        this._pollingConfig$.next({
                            interval: interval || confirmationPollingIntervalSecond,
                            timeout: timeout || confirmationPollingTimeoutSecond,
                        });
                        conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                _this.confirmed$
                                    .pipe(operators_1.switchMap(function () { return _this.polling$; }), operators_1.switchMap(function () { return _this.currentHead$; }), operators_1.filter(function (head) { return head.header.level - _this._foundAt >= conf - 1; }), operators_1.first())
                                    .subscribe(function (_) {
                                    resolve(_this._foundAt + (conf - 1));
                                }, reject);
                            })];
                }
            });
        });
    };
    return Operation;
}());
exports.Operation = Operation;
//# sourceMappingURL=operations.js.map