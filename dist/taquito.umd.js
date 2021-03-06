(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@taquito/rpc'), require('rxjs'), require('rxjs/operators'), require('bignumber.js'), require('@taquito/michelson-encoder'), require('@taquito/michel-codec'), require('@taquito/utils'), require('@taquito/http-utils')) :
    typeof define === 'function' && define.amd ? define(['exports', '@taquito/rpc', 'rxjs', 'rxjs/operators', 'bignumber.js', '@taquito/michelson-encoder', '@taquito/michel-codec', '@taquito/utils', '@taquito/http-utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.taquito = {}, global.rpc, global.rxjs, global.operators, global.BigNumber, global.michelsonEncoder, global.michelCodec, global.utils, global.httpUtils));
}(this, (function (exports, rpc, rxjs, operators, BigNumber, michelsonEncoder, michelCodec, utils, httpUtils) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BigNumber__default = /*#__PURE__*/_interopDefaultLegacy(BigNumber);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var RpcForger = /** @class */ (function () {
        function RpcForger(context) {
            this.context = context;
        }
        RpcForger.prototype.forge = function (_a) {
            var branch = _a.branch, contents = _a.contents;
            return this.context.rpc.forgeOperations({ branch: branch, contents: contents });
        };
        return RpcForger;
    }());

    var RpcInjector = /** @class */ (function () {
        function RpcInjector(context) {
            this.context = context;
        }
        RpcInjector.prototype.inject = function (signedOperationBytes) {
            return this.context.rpc.injectOperation(signedOperationBytes);
        };
        return RpcInjector;
    }());

    var UnconfiguredSignerError = /** @class */ (function () {
        function UnconfiguredSignerError() {
            this.name = 'UnconfiguredSignerError';
            this.message = 'No signer has been configured. Please configure one by calling setProvider({signer}) on your TezosToolkit instance.';
        }
        return UnconfiguredSignerError;
    }());
    /**
     * @description Default signer implementation which does nothing and produce invalid signature
     */
    var NoopSigner = /** @class */ (function () {
        function NoopSigner() {
        }
        NoopSigner.prototype.publicKey = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new UnconfiguredSignerError();
                });
            });
        };
        NoopSigner.prototype.publicKeyHash = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new UnconfiguredSignerError();
                });
            });
        };
        NoopSigner.prototype.secretKey = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new UnconfiguredSignerError();
                });
            });
        };
        NoopSigner.prototype.sign = function (_bytes, _watermark) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new UnconfiguredSignerError();
                });
            });
        };
        return NoopSigner;
    }());

    var attachKind = function (op, kind) {
        return __assign(__assign({}, op), { kind: kind });
    };
    var findWithKind = function (arr, kind) {
        if (Array.isArray(arr)) {
            var found = arr.find(function (op) { return op.kind === kind; });
            if (found && isKind(found, kind)) {
                return found;
            }
        }
    };
    var isKind = function (op, kind) {
        return op.kind === kind;
    };
    var isOpWithFee = function (op) {
        return ['transaction', 'delegation', 'origination', 'reveal'].indexOf(op.kind) !== -1;
    };
    var isOpRequireReveal = function (op) {
        return ['transaction', 'delegation', 'origination'].indexOf(op.kind) !== -1;
    };
    var hasMetadata = function (op) {
        return 'metadata' in op;
    };
    var hasMetadataWithResult = function (op) {
        return hasMetadata(op) && 'operation_result' in op.metadata;
    };
    var hasMetadataWithInternalOperationResult = function (op) {
        return hasMetadata(op) && 'internal_operation_results' in op.metadata;
    };

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
    var TezosPreapplyFailureError = /** @class */ (function () {
        function TezosPreapplyFailureError(result) {
            this.result = result;
            this.name = 'TezosPreapplyFailureError';
            this.message = 'Preapply returned an unexpected result';
        }
        return TezosPreapplyFailureError;
    }());
    // Flatten all operation content results and internal operation results into a single array
    // Some cases where we can have multiple operation results or internal operation results are:
    // - When an operation includes a reveal operation
    // - When an operation is made using the batch API
    // - Smart contract call can contains internal operation results when they call other smart contract internally or originate contracts
    var flattenOperationResult = function (response) {
        var results = Array.isArray(response) ? response : [response];
        var returnedResults = [];
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].contents.length; j++) {
                var content = results[i].contents[j];
                if (hasMetadataWithResult(content)) {
                    returnedResults.push(__assign({ fee: content.fee }, content.metadata.operation_result));
                    if (Array.isArray(content.metadata.internal_operation_results)) {
                        content.metadata.internal_operation_results.forEach(function (x) { return returnedResults.push(x.result); });
                    }
                }
            }
        }
        return returnedResults;
    };
    /***
     * @description Flatten all error from preapply response (including internal error)
     */
    var flattenErrors = function (response, status) {
        var e_1, _a;
        if (status === void 0) { status = 'failed'; }
        var results = Array.isArray(response) ? response : [response];
        var errors = [];
        // Transaction that do not fail will be backtracked in case one failure occur
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].contents.length; j++) {
                var content = results[i].contents[j];
                if (hasMetadata(content)) {
                    if (hasMetadataWithResult(content) && content.metadata.operation_result.status === status) {
                        errors = errors.concat(content.metadata.operation_result.errors || []);
                    }
                    if (hasMetadataWithInternalOperationResult(content) &&
                        Array.isArray(content.metadata.internal_operation_results)) {
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

    var receiptFromOperation = function (op, _a) {
        var _b = _a === void 0 ? {
            ALLOCATION_BURN: 257,
            ORIGINATION_BURN: 257,
        } : _a, ALLOCATION_BURN = _b.ALLOCATION_BURN, ORIGINATION_BURN = _b.ORIGINATION_BURN;
        var operationResults = flattenOperationResult({ contents: op });
        var totalGas = new BigNumber__default['default'](0);
        var totalStorage = new BigNumber__default['default'](0);
        var totalFee = new BigNumber__default['default'](0);
        var totalOriginationBurn = new BigNumber__default['default'](0);
        var totalAllocationBurn = new BigNumber__default['default'](0);
        var totalPaidStorageDiff = new BigNumber__default['default'](0);
        operationResults.forEach(function (result) {
            totalFee = totalFee.plus(result.fee || 0);
            totalOriginationBurn = totalOriginationBurn.plus(Array.isArray(result.originated_contracts)
                ? result.originated_contracts.length * ORIGINATION_BURN
                : 0);
            totalAllocationBurn = totalAllocationBurn.plus('allocated_destination_contract' in result ? ALLOCATION_BURN : 0);
            totalGas = totalGas.plus(result.consumed_gas || 0);
            totalPaidStorageDiff = totalPaidStorageDiff.plus('paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0);
        });
        totalStorage = totalStorage
            .plus(totalAllocationBurn)
            .plus(totalOriginationBurn)
            .plus(totalPaidStorageDiff);
        return {
            totalFee: totalFee,
            totalGas: totalGas,
            totalStorage: totalStorage,
            totalAllocationBurn: totalAllocationBurn,
            totalOriginationBurn: totalOriginationBurn,
            totalPaidStorageDiff: totalPaidStorageDiff,
            totalStorageBurn: new BigNumber__default['default'](totalStorage.multipliedBy(1000)),
        };
    };

    var MissedBlockDuringConfirmationError = /** @class */ (function () {
        function MissedBlockDuringConfirmationError() {
            this.name = 'MissedBlockDuringConfirmationError';
            this.message = 'Taquito missed a block while waiting for operation confirmation and was not able to find the operation';
        }
        return MissedBlockDuringConfirmationError;
    }());
    var MAX_BRANCH_ANCESTORS = 60;
    /**
     * @description WalletOperation allows to monitor operation inclusion on chains and surface information related to the operation
     */
    var WalletOperation = /** @class */ (function () {
        /**
         *
         * @param opHash Operation hash
         * @param raw Raw operation that was injected
         * @param context Taquito context allowing access to rpc and signer
         */
        function WalletOperation(opHash, context, _newHead$) {
            var _this = this;
            this.opHash = opHash;
            this.context = context;
            this._newHead$ = _newHead$;
            this._operationResult = new rxjs.ReplaySubject(1);
            this._includedInBlock = new rxjs.ReplaySubject(1);
            this._included = false;
            this.newHead$ = this._newHead$.pipe(operators.tap(function (newHead) {
                if (!_this._included &&
                    _this.lastHead &&
                    newHead.header.level - _this.lastHead.header.level > 1) {
                    throw new MissedBlockDuringConfirmationError();
                }
                _this.lastHead = newHead;
            }), operators.shareReplay({ bufferSize: 1, refCount: true }));
            // Observable that emit once operation is seen in a block
            this.confirmed$ = this.newHead$.pipe(operators.map(function (head) {
                var e_1, _a, e_2, _b;
                try {
                    for (var _c = __values(head.operations), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var opGroup = _d.value;
                        try {
                            for (var opGroup_1 = (e_2 = void 0, __values(opGroup)), opGroup_1_1 = opGroup_1.next(); !opGroup_1_1.done; opGroup_1_1 = opGroup_1.next()) {
                                var op = opGroup_1_1.value;
                                if (op.hash === _this.opHash) {
                                    _this._included = true;
                                    _this._includedInBlock.next(head);
                                    _this._operationResult.next(op.contents);
                                    // Return the block where the operation was found
                                    return head;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (opGroup_1_1 && !opGroup_1_1.done && (_b = opGroup_1.return)) _b.call(opGroup_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }), operators.filter(function (x) {
                return typeof x !== 'undefined';
            }), operators.first(), operators.shareReplay({ bufferSize: 1, refCount: true }));
            this.confirmed$.pipe(operators.first()).subscribe();
        }
        WalletOperation.prototype.operationResults = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._operationResult.pipe(operators.first()).toPromise()];
                });
            });
        };
        /**
         * @description Receipt expose the total amount of tezos token burn and spent on fees
         * The promise returned by receipt will resolve only once the transaction is included
         */
        WalletOperation.prototype.receipt = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = receiptFromOperation;
                            return [4 /*yield*/, this.operationResults()];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        WalletOperation.prototype.getCurrentConfirmation = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this._included) {
                        return [2 /*return*/, 0];
                    }
                    return [2 /*return*/, rxjs.combineLatest([this._includedInBlock, rxjs.from(this.context.rpc.getBlock())])
                            .pipe(operators.map(function (_a) {
                            var _b = __read(_a, 2), foundAtBlock = _b[0], head = _b[1];
                            return head.header.level - foundAtBlock.header.level + 1;
                        }), operators.first())
                            .toPromise()];
                });
            });
        };
        WalletOperation.prototype.isInCurrentBranch = function (tipBlockIdentifier) {
            if (tipBlockIdentifier === void 0) { tipBlockIdentifier = 'head'; }
            return __awaiter(this, void 0, void 0, function () {
                var tipBlockHeader, inclusionBlock, levelDiff, tipBlockLevel, blocks, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // By default it is assumed that the operation is in the current branch
                            if (!this._included) {
                                return [2 /*return*/, true];
                            }
                            return [4 /*yield*/, this.context.rpc.getBlockHeader({ block: tipBlockIdentifier })];
                        case 1:
                            tipBlockHeader = _b.sent();
                            return [4 /*yield*/, this._includedInBlock.pipe(operators.first()).toPromise()];
                        case 2:
                            inclusionBlock = _b.sent();
                            levelDiff = tipBlockHeader.level - inclusionBlock.header.level;
                            // Block produced before the operation is included are assumed to be part of the current branch
                            if (levelDiff <= 0) {
                                return [2 /*return*/, true];
                            }
                            tipBlockLevel = Math.min(inclusionBlock.header.level + levelDiff, inclusionBlock.header.level + MAX_BRANCH_ANCESTORS);
                            _a = Set.bind;
                            return [4 /*yield*/, this.context.rpc.getLiveBlocks({ block: String(tipBlockLevel) })];
                        case 3:
                            blocks = new (_a.apply(Set, [void 0, _b.sent()]))();
                            return [2 /*return*/, blocks.has(inclusionBlock.hash)];
                    }
                });
            });
        };
        WalletOperation.prototype.confirmationObservable = function (confirmations) {
            var _this = this;
            if (typeof confirmations !== 'undefined' && confirmations < 1) {
                throw new Error('Confirmation count must be at least 1');
            }
            var defaultConfirmationCount = this.context.config.defaultConfirmationCount;
            var conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
            return rxjs.combineLatest([this._includedInBlock, this.newHead$]).pipe(operators.distinctUntilChanged(function (_a, _b) {
                var _c = __read(_a, 2), previousHead = _c[1];
                var _d = __read(_b, 2), newHead = _d[1];
                return previousHead.hash === newHead.hash;
            }), operators.map(function (_a) {
                var _b = __read(_a, 2), foundAtBlock = _b[0], head = _b[1];
                return {
                    block: head,
                    expectedConfirmation: conf,
                    currentConfirmation: head.header.level - foundAtBlock.header.level + 1,
                    completed: head.header.level - foundAtBlock.header.level >= conf - 1,
                    isInCurrentBranch: function () { return _this.isInCurrentBranch(head.hash); },
                };
            }), operators.takeWhile(function (_a) {
                var completed = _a.completed;
                return !completed;
            }, true));
        };
        /**
         *
         * @param confirmations [0] Number of confirmation to wait for
         */
        WalletOperation.prototype.confirmation = function (confirmations) {
            return this.confirmationObservable(confirmations).toPromise();
        };
        return WalletOperation;
    }());

    var DelegationWalletOperation = /** @class */ (function (_super) {
        __extends(DelegationWalletOperation, _super);
        function DelegationWalletOperation(opHash, context, newHead$) {
            var _this = _super.call(this, opHash, context, newHead$) || this;
            _this.opHash = opHash;
            _this.context = context;
            return _this;
        }
        DelegationWalletOperation.prototype.revealOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, operationResult.find(function (x) { return x.kind === rpc.OpKind.REVEAL; })];
                    }
                });
            });
        };
        DelegationWalletOperation.prototype.delegationOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, operationResult.find(function (x) { return x.kind === rpc.OpKind.DELEGATION; })];
                    }
                });
            });
        };
        DelegationWalletOperation.prototype.status = function () {
            return __awaiter(this, void 0, void 0, function () {
                var op;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._included) {
                                return [2 /*return*/, 'pending'];
                            }
                            return [4 /*yield*/, this.delegationOperation()];
                        case 1:
                            op = _a.sent();
                            if (!op) {
                                return [2 /*return*/, 'unknown'];
                            }
                            return [2 /*return*/, op.metadata.operation_result.status];
                    }
                });
            });
        };
        return DelegationWalletOperation;
    }(WalletOperation));

    var OriginationWalletOperation = /** @class */ (function (_super) {
        __extends(OriginationWalletOperation, _super);
        function OriginationWalletOperation(opHash, context, newHead$) {
            var _this = _super.call(this, opHash, context, newHead$) || this;
            _this.opHash = opHash;
            _this.context = context;
            return _this;
        }
        OriginationWalletOperation.prototype.originationOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, findWithKind(operationResult, rpc.OpKind.ORIGINATION)];
                    }
                });
            });
        };
        OriginationWalletOperation.prototype.revealOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, findWithKind(operationResult, rpc.OpKind.REVEAL)];
                    }
                });
            });
        };
        OriginationWalletOperation.prototype.status = function () {
            return __awaiter(this, void 0, void 0, function () {
                var op;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._included) {
                                return [2 /*return*/, 'pending'];
                            }
                            return [4 /*yield*/, this.originationOperation()];
                        case 1:
                            op = _a.sent();
                            if (!op) {
                                return [2 /*return*/, 'unknown'];
                            }
                            return [2 /*return*/, op.metadata.operation_result.status];
                    }
                });
            });
        };
        OriginationWalletOperation.prototype.contract = function () {
            return __awaiter(this, void 0, void 0, function () {
                var op, address;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.originationOperation()];
                        case 1:
                            op = _a.sent();
                            address = (op.metadata.operation_result.originated_contracts || [])[0];
                            return [2 /*return*/, this.context.wallet.at(address)];
                    }
                });
            });
        };
        return OriginationWalletOperation;
    }(WalletOperation));

    var TransactionWalletOperation = /** @class */ (function (_super) {
        __extends(TransactionWalletOperation, _super);
        function TransactionWalletOperation(opHash, context, newHead$) {
            var _this = _super.call(this, opHash, context, newHead$) || this;
            _this.opHash = opHash;
            _this.context = context;
            return _this;
        }
        TransactionWalletOperation.prototype.revealOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, operationResult.find(function (x) { return x.kind === rpc.OpKind.REVEAL; })];
                    }
                });
            });
        };
        TransactionWalletOperation.prototype.transactionOperation = function () {
            return __awaiter(this, void 0, void 0, function () {
                var operationResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.operationResults()];
                        case 1:
                            operationResult = _a.sent();
                            return [2 /*return*/, operationResult.find(function (x) { return x.kind === rpc.OpKind.TRANSACTION; })];
                    }
                });
            });
        };
        TransactionWalletOperation.prototype.status = function () {
            return __awaiter(this, void 0, void 0, function () {
                var op;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._included) {
                                return [2 /*return*/, 'pending'];
                            }
                            return [4 /*yield*/, this.transactionOperation()];
                        case 1:
                            op = _a.sent();
                            if (!op) {
                                return [2 /*return*/, 'unknown'];
                            }
                            return [2 /*return*/, op.metadata.operation_result.status];
                    }
                });
            });
        };
        return TransactionWalletOperation;
    }(WalletOperation));

    var cacheUntil = function (cacheUntilObs) { return function (source) {
        var subject = null;
        return rxjs.defer(function () {
            if (!subject) {
                subject = new rxjs.ReplaySubject();
                source.pipe(operators.first()).subscribe(subject);
                cacheUntilObs.pipe(operators.first()).subscribe(function () {
                    subject = null;
                });
            }
            return subject;
        });
    }; };
    var createNewPollingBasedHeadObservable = function (pollingTimer, sharedHeadOb, context, scheduler) {
        return pollingTimer.pipe(operators.switchMap(function () { return sharedHeadOb; }), operators.distinctUntilKeyChanged('hash'), operators.timeoutWith(context.config.confirmationPollingTimeoutSecond * 1000, rxjs.throwError(new Error('Confirmation polling timed out')), scheduler), operators.shareReplay({
            refCount: true,
            scheduler: scheduler,
        }));
    };
    var OperationFactory = /** @class */ (function () {
        function OperationFactory(context) {
            var _this = this;
            this.context = context;
            // Cache the last block for one second across all operations
            this.sharedHeadObs = rxjs.defer(function () { return rxjs.from(_this.context.rpc.getBlock()); }).pipe(cacheUntil(rxjs.timer(0, 1000)));
        }
        OperationFactory.prototype.createNewHeadObservable = function () {
            return createNewPollingBasedHeadObservable(rxjs.timer(0, this.context.config.confirmationPollingIntervalSecond * 1000), this.sharedHeadObs, this.context);
        };
        OperationFactory.prototype.createPastBlockWalker = function (startBlock, count) {
            var _this = this;
            if (count === void 0) { count = 1; }
            return rxjs.from(this.context.rpc.getBlock({ block: startBlock })).pipe(operators.switchMap(function (block) {
                if (count === 1) {
                    return rxjs.of(block);
                }
                return rxjs.range(block.header.level, count - 1).pipe(operators.startWith(block), operators.concatMap(function (level) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, this.context.rpc.getBlock({ block: String(level) })];
                    });
                }); }));
            }));
        };
        OperationFactory.prototype.createHeadObservableFromConfig = function (_a) {
            var blockIdentifier = _a.blockIdentifier;
            var observableSequence = [];
            if (blockIdentifier) {
                observableSequence.push(this.createPastBlockWalker(blockIdentifier));
            }
            observableSequence.push(this.createNewHeadObservable());
            return rxjs.concat.apply(void 0, __spread(observableSequence));
        };
        OperationFactory.prototype.createOperation = function (hash, config) {
            if (config === void 0) { config = {}; }
            return new WalletOperation(hash, this.context.clone(), this.createHeadObservableFromConfig(config));
        };
        OperationFactory.prototype.createTransactionOperation = function (hash, config) {
            if (config === void 0) { config = {}; }
            return new TransactionWalletOperation(hash, this.context.clone(), this.createHeadObservableFromConfig(config));
        };
        OperationFactory.prototype.createDelegationOperation = function (hash, config) {
            if (config === void 0) { config = {}; }
            return new DelegationWalletOperation(hash, this.context.clone(), this.createHeadObservableFromConfig(config));
        };
        OperationFactory.prototype.createOriginationOperation = function (hash, config) {
            if (config === void 0) { config = {}; }
            return new OriginationWalletOperation(hash, this.context.clone(), this.createHeadObservableFromConfig(config));
        };
        return OperationFactory;
    }());

    (function (DEFAULT_GAS_LIMIT) {
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["DELEGATION"] = 10600] = "DELEGATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["ORIGINATION"] = 10600] = "ORIGINATION";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["TRANSFER"] = 10600] = "TRANSFER";
        DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL"] = 10600] = "REVEAL";
    })(exports.DEFAULT_GAS_LIMIT || (exports.DEFAULT_GAS_LIMIT = {}));
    (function (DEFAULT_FEE) {
        DEFAULT_FEE[DEFAULT_FEE["DELEGATION"] = 1257] = "DELEGATION";
        DEFAULT_FEE[DEFAULT_FEE["ORIGINATION"] = 10000] = "ORIGINATION";
        DEFAULT_FEE[DEFAULT_FEE["TRANSFER"] = 10000] = "TRANSFER";
        DEFAULT_FEE[DEFAULT_FEE["REVEAL"] = 1420] = "REVEAL";
    })(exports.DEFAULT_FEE || (exports.DEFAULT_FEE = {}));
    (function (DEFAULT_STORAGE_LIMIT) {
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["DELEGATION"] = 0] = "DELEGATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["ORIGINATION"] = 257] = "ORIGINATION";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["TRANSFER"] = 257] = "TRANSFER";
        DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["REVEAL"] = 0] = "REVEAL";
    })(exports.DEFAULT_STORAGE_LIMIT || (exports.DEFAULT_STORAGE_LIMIT = {}));
    (function (Protocols) {
        Protocols["Pt24m4xi"] = "Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd";
        Protocols["PsBABY5H"] = "PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU";
        Protocols["PsBabyM1"] = "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS";
        Protocols["PsCARTHA"] = "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb";
        Protocols["PsDELPH1"] = "PsDELPH1Kxsxt8f9eWbxQeRxkjfbxoqM52jvs5Y5fBxWWh4ifpo";
    })(exports.Protocols || (exports.Protocols = {}));
    var protocols = {
        '004': [exports.Protocols.Pt24m4xi],
        '005': [exports.Protocols.PsBABY5H, exports.Protocols.PsBabyM1],
        '006': [exports.Protocols.PsCARTHA],
        '007': [exports.Protocols.PsDELPH1]
    };

    var OperationEmitter = /** @class */ (function () {
        function OperationEmitter(context) {
            this.context = context;
        }
        Object.defineProperty(OperationEmitter.prototype, "rpc", {
            get: function () {
                return this.context.rpc;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OperationEmitter.prototype, "signer", {
            get: function () {
                return this.context.signer;
            },
            enumerable: false,
            configurable: true
        });
        // Originally from sotez (Copyright (c) 2018 Andrew Kishino)
        OperationEmitter.prototype.prepareOperation = function (_a) {
            var operation = _a.operation, source = _a.source;
            return __awaiter(this, void 0, void 0, function () {
                var counter, counters, requiresReveal, ops, head, blockHeaderPromise, blockMetaPromise, publicKeyHash, counterPromise, managerPromise, i, counter_1, _b, header, metadata, headCounter, manager, haveManager, reveal, getFee, getSource, constructOps, branch, contents, protocol;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            counters = {};
                            requiresReveal = false;
                            ops = [];
                            blockHeaderPromise = this.rpc.getBlockHeader();
                            blockMetaPromise = this.rpc.getBlockMetadata();
                            if (Array.isArray(operation)) {
                                ops = __spread(operation);
                            }
                            else {
                                ops = [operation];
                            }
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            publicKeyHash = _d.sent();
                            counterPromise = Promise.resolve(undefined);
                            managerPromise = Promise.resolve(undefined);
                            i = 0;
                            _d.label = 2;
                        case 2:
                            if (!(i < ops.length)) return [3 /*break*/, 5];
                            if (!isOpRequireReveal(ops[i])) return [3 /*break*/, 4];
                            requiresReveal = true;
                            return [4 /*yield*/, this.rpc.getContract(publicKeyHash)];
                        case 3:
                            counter_1 = (_d.sent()).counter;
                            counterPromise = Promise.resolve(counter_1);
                            managerPromise = this.rpc.getManagerKey(publicKeyHash);
                            return [3 /*break*/, 5];
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [4 /*yield*/, Promise.all([
                                blockHeaderPromise,
                                blockMetaPromise,
                                counterPromise,
                                managerPromise,
                            ])];
                        case 6:
                            _b = __read.apply(void 0, [_d.sent(), 4]), header = _b[0], metadata = _b[1], headCounter = _b[2], manager = _b[3];
                            if (!header) {
                                throw new Error('Unable to fetch latest block header');
                            }
                            if (!metadata) {
                                throw new Error('Unable to fetch latest metadata');
                            }
                            head = header;
                            if (!requiresReveal) return [3 /*break*/, 8];
                            haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
                            if (!!haveManager) return [3 /*break*/, 8];
                            _c = {
                                kind: rpc.OpKind.REVEAL,
                                fee: exports.DEFAULT_FEE.REVEAL
                            };
                            return [4 /*yield*/, this.signer.publicKey()];
                        case 7:
                            reveal = (_c.public_key = _d.sent(),
                                _c.source = publicKeyHash,
                                _c.gas_limit = exports.DEFAULT_GAS_LIMIT.REVEAL,
                                _c.storage_limit = exports.DEFAULT_STORAGE_LIMIT.REVEAL,
                                _c);
                            ops.unshift(reveal);
                            _d.label = 8;
                        case 8:
                            counter = parseInt(headCounter || '0', 10);
                            if (!counters[publicKeyHash] || counters[publicKeyHash] < counter) {
                                counters[publicKeyHash] = counter;
                            }
                            getFee = function (op) {
                                var opCounter = ++counters[publicKeyHash];
                                return {
                                    counter: "" + opCounter,
                                    // tslint:disable-next-line: strict-type-predicates
                                    fee: typeof op.fee === 'undefined' ? '0' : "" + op.fee,
                                    // tslint:disable-next-line: strict-type-predicates
                                    gas_limit: typeof op.gas_limit === 'undefined' ? '0' : "" + op.gas_limit,
                                    // tslint:disable-next-line: strict-type-predicates
                                    storage_limit: typeof op.storage_limit === 'undefined' ? '0' : "" + op.storage_limit,
                                };
                            };
                            getSource = function (op) {
                                return {
                                    source: typeof op.source === 'undefined' ? source || publicKeyHash : op.source,
                                };
                            };
                            constructOps = function (cOps) {
                                // tslint:disable strict-type-predicates
                                return cOps.map(function (op) {
                                    switch (op.kind) {
                                        case rpc.OpKind.ACTIVATION:
                                            return __assign({}, op);
                                        case rpc.OpKind.REVEAL:
                                            return __assign(__assign(__assign({}, op), getSource(op)), getFee(op));
                                        case rpc.OpKind.ORIGINATION:
                                            return __assign(__assign(__assign(__assign({}, op), { balance: typeof op.balance !== 'undefined' ? "" + op.balance : '0' }), getSource(op)), getFee(op));
                                        case rpc.OpKind.TRANSACTION:
                                            var cops = __assign(__assign(__assign(__assign({}, op), { amount: typeof op.amount !== 'undefined' ? "" + op.amount : '0' }), getSource(op)), getFee(op));
                                            if (cops.source.toLowerCase().startsWith('kt1')) {
                                                throw new Error("KT1 addresses are not supported as source since " + exports.Protocols.PsBabyM1);
                                            }
                                            return cops;
                                        case rpc.OpKind.DELEGATION:
                                            return __assign(__assign(__assign({}, op), getSource(op)), getFee(op));
                                        default:
                                            throw new Error('Unsupported operation');
                                    }
                                });
                            };
                            branch = head.hash;
                            contents = constructOps(ops);
                            protocol = metadata.next_protocol;
                            return [2 /*return*/, {
                                    opOb: {
                                        branch: branch,
                                        contents: contents,
                                        protocol: protocol,
                                    },
                                    counter: counter,
                                }];
                    }
                });
            });
        };
        OperationEmitter.prototype.prepareAndForge = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var prepared;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prepareOperation(params)];
                        case 1:
                            prepared = _a.sent();
                            return [2 /*return*/, this.forge(prepared)];
                    }
                });
            });
        };
        OperationEmitter.prototype.forge = function (_a) {
            var _b = _a.opOb, branch = _b.branch, contents = _b.contents, protocol = _b.protocol, counter = _a.counter;
            return __awaiter(this, void 0, void 0, function () {
                var forgedBytes;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.context.forger.forge({ branch: branch, contents: contents })];
                        case 1:
                            forgedBytes = _c.sent();
                            return [2 /*return*/, {
                                    opbytes: forgedBytes,
                                    opOb: {
                                        branch: branch,
                                        contents: contents,
                                        protocol: protocol,
                                    },
                                    counter: counter,
                                }];
                    }
                });
            });
        };
        OperationEmitter.prototype.simulate = function (op) {
            return __awaiter(this, void 0, void 0, function () {
                var opResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rpc.runOperation(op)];
                        case 1:
                            opResponse = _a.sent();
                            return [2 /*return*/, {
                                    opResponse: opResponse,
                                    op: op,
                                    context: this.context.clone(),
                                }];
                    }
                });
            });
        };
        OperationEmitter.prototype.estimate = function (_a, estimator) {
            var fee = _a.fee, gasLimit = _a.gasLimit, storageLimit = _a.storageLimit, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var calculatedFee, calculatedGas, calculatedStorage, estimation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            calculatedFee = fee;
                            calculatedGas = gasLimit;
                            calculatedStorage = storageLimit;
                            if (!(fee === undefined || gasLimit === undefined || storageLimit === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, estimator(__assign({ fee: fee, gasLimit: gasLimit, storageLimit: storageLimit }, rest))];
                        case 1:
                            estimation = _b.sent();
                            if (calculatedFee === undefined) {
                                calculatedFee = estimation.suggestedFeeMutez;
                            }
                            if (calculatedGas === undefined) {
                                calculatedGas = estimation.gasLimit;
                            }
                            if (calculatedStorage === undefined) {
                                calculatedStorage = estimation.storageLimit;
                            }
                            _b.label = 2;
                        case 2: return [2 /*return*/, {
                                fee: calculatedFee,
                                gasLimit: calculatedGas,
                                storageLimit: calculatedStorage,
                            }];
                    }
                });
            });
        };
        OperationEmitter.prototype.signAndInject = function (forgedBytes) {
            return __awaiter(this, void 0, void 0, function () {
                var signed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.signer.sign(forgedBytes.opbytes, new Uint8Array([3]))];
                        case 1:
                            signed = _a.sent();
                            return [2 /*return*/, this.inject(forgedBytes, signed.prefixSig, signed.sbytes)];
                    }
                });
            });
        };
        OperationEmitter.prototype.inject = function (forgedBytes, prefixSig, sbytes) {
            return __awaiter(this, void 0, void 0, function () {
                var opResponse, results, i, j, errors;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            forgedBytes.opbytes = sbytes;
                            forgedBytes.opOb.signature = prefixSig;
                            opResponse = [];
                            return [4 /*yield*/, this.rpc.preapplyOperations([forgedBytes.opOb])];
                        case 1:
                            results = _b.sent();
                            if (!Array.isArray(results)) {
                                throw new TezosPreapplyFailureError(results);
                            }
                            for (i = 0; i < results.length; i++) {
                                for (j = 0; j < results[i].contents.length; j++) {
                                    opResponse.push(results[i].contents[j]);
                                }
                            }
                            errors = flattenErrors(results);
                            if (errors.length) {
                                // @ts-ignore
                                throw new TezosOperationError(errors);
                            }
                            _a = {};
                            return [4 /*yield*/, this.context.injector.inject(forgedBytes.opbytes)];
                        case 2: return [2 /*return*/, (_a.hash = _b.sent(),
                                _a.forgedBytes = forgedBytes,
                                _a.opResponse = opResponse,
                                _a.context = this.context.clone(),
                                _a)];
                    }
                });
            });
        };
        return OperationEmitter;
    }());

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
            this._pollingConfig$ = new rxjs.ReplaySubject(1);
            this._currentHeadPromise = undefined;
            // Caching the current head for one second
            this.currentHead$ = rxjs.defer(function () {
                if (!_this._currentHeadPromise) {
                    _this._currentHeadPromise = _this.context.rpc.getBlock();
                    rxjs.timer(1000)
                        .pipe(operators.first())
                        .subscribe(function () {
                        _this._currentHeadPromise = undefined;
                    });
                }
                return rxjs.from(_this._currentHeadPromise);
            });
            // Polling observable that emit until timeout is reached
            this.polling$ = rxjs.defer(function () {
                return _this._pollingConfig$.pipe(operators.tap(function (_a) {
                    var timeout = _a.timeout, interval = _a.interval;
                    if (timeout <= 0) {
                        throw new Error('Timeout must be more than 0');
                    }
                    if (interval <= 0) {
                        throw new Error('Interval must be more than 0');
                    }
                }), operators.map(function (config) { return (__assign(__assign({}, config), { timeoutAt: Math.ceil(config.timeout / config.interval) + 1, count: 0 })); }), operators.switchMap(function (config) { return rxjs.timer(0, config.interval * 1000).pipe(operators.mapTo(config)); }), operators.tap(function (config) {
                    config.count++;
                    if (config.count > config.timeoutAt) {
                        throw new Error("Confirmation polling timed out");
                    }
                }));
            });
            // Observable that emit once operation is seen in a block
            this.confirmed$ = this.polling$.pipe(operators.switchMapTo(this.currentHead$), operators.map(function (head) {
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
            }), operators.filter(function (x) { return x !== undefined; }), operators.first(), operators.shareReplay());
            this._foundAt = Number.POSITIVE_INFINITY;
            this.confirmed$.pipe(operators.first()).subscribe();
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
                    if (hasMetadataWithResult(result)) {
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
            var _this = this;
            if (typeof confirmations !== 'undefined' && confirmations < 1) {
                throw new Error('Confirmation count must be at least 1');
            }
            var _a = this.context.config, defaultConfirmationCount = _a.defaultConfirmationCount, confirmationPollingIntervalSecond = _a.confirmationPollingIntervalSecond, confirmationPollingTimeoutSecond = _a.confirmationPollingTimeoutSecond;
            this._pollingConfig$.next({
                interval: interval || confirmationPollingIntervalSecond,
                timeout: timeout || confirmationPollingTimeoutSecond,
            });
            var conf = confirmations !== undefined ? confirmations : defaultConfirmationCount;
            return new Promise(function (resolve, reject) {
                _this.confirmed$
                    .pipe(operators.switchMap(function () { return _this.polling$; }), operators.switchMap(function () { return _this.currentHead$; }), operators.filter(function (head) { return head.header.level - _this._foundAt >= conf - 1; }), operators.first())
                    .subscribe(function (_) {
                    resolve(_this._foundAt + (conf - 1));
                }, reject);
            });
        };
        return Operation;
    }());

    var RpcTzProvider = /** @class */ (function (_super) {
        __extends(RpcTzProvider, _super);
        function RpcTzProvider(context) {
            return _super.call(this, context) || this;
        }
        RpcTzProvider.prototype.getBalance = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.rpc.getBalance(address)];
                });
            });
        };
        RpcTzProvider.prototype.getDelegate = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.rpc.getDelegate(address)];
                });
            });
        };
        RpcTzProvider.prototype.activate = function (pkh, secret) {
            return __awaiter(this, void 0, void 0, function () {
                var operation, forgedBytes, bytes, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            operation = {
                                kind: rpc.OpKind.ACTIVATION,
                                pkh: pkh,
                                secret: secret,
                            };
                            return [4 /*yield*/, this.prepareAndForge({ operation: [operation], source: pkh })];
                        case 1:
                            forgedBytes = _b.sent();
                            bytes = forgedBytes.opbytes + "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
                            _a = Operation.bind;
                            return [4 /*yield*/, this.rpc.injectOperation(bytes)];
                        case 2: return [2 /*return*/, new (_a.apply(Operation, [void 0, _b.sent(), __assign(__assign({}, forgedBytes), { opbytes: bytes }), [],
                                this.context.clone()]))()];
                    }
                });
            });
        };
        return RpcTzProvider;
    }(OperationEmitter));

    var MINIMAL_FEE_MUTEZ = 100;
    var MINIMAL_FEE_PER_BYTE_MUTEZ = 1;
    var MINIMAL_FEE_PER_GAS_MUTEZ = 0.1;
    var GAS_BUFFER = 100;
    /**
     * Examples of use :
     *
     *  Estimate a transfer operation :
     * ```
     * // Assuming that provider and signer are already configured...
     *
     * const amount = 2;
     * const address = 'tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY';
     *
     * // Estimate gasLimit, storageLimit and fees for a transfer operation
     * const est = await Tezos.estimate.transfer({ to: address, amount: amount })
     * console.log(est.burnFeeMutez, est.gasLimit, est.minimalFeeMutez, est.storageLimit,
     *  est.suggestedFeeMutez, est.totalCost, est.usingBaseFeeMutez)
     *
     * ```
     *
     * Estimate a contract origination :
     * ```
     * // generic.json is referring to a Michelson Smart Contract
     *
     * const genericMultisigJSON = require('./generic.json')
     * const est = await Tezos.estimate.originate({
     *   code: genericMultisigJSON,
     *   storage: {
     *     stored_counter: 0,
     *     threshold: 1,
     *     keys: ['edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t']
     *   }
     * })
     * console.log(est.burnFeeMutez, est.gasLimit, est.minimalFeeMutez, est.storageLimit,
     *   est.suggestedFeeMutez, est.totalCost, est.usingBaseFeeMutez)
     *
     * ```
     */
    var Estimate = /** @class */ (function () {
        function Estimate(_milligasLimit, _storageLimit, opSize, minimalFeePerStorageByteMutez, 
        /**
         * @description Base fee in mutez (1 mutez = 1e10−6 tez)
         */
        baseFeeMutez) {
            if (baseFeeMutez === void 0) { baseFeeMutez = MINIMAL_FEE_MUTEZ; }
            this._milligasLimit = _milligasLimit;
            this._storageLimit = _storageLimit;
            this.opSize = opSize;
            this.minimalFeePerStorageByteMutez = minimalFeePerStorageByteMutez;
            this.baseFeeMutez = baseFeeMutez;
        }
        Object.defineProperty(Estimate.prototype, "burnFeeMutez", {
            /**
             * @description The number of Mutez that will be burned for the storage of the [operation](https://tezos.gitlab.io/user/glossary.html#operations). (Storage + Allocation fees)
             */
            get: function () {
                return this.roundUp(Number(this.storageLimit) * Number(this.minimalFeePerStorageByteMutez));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "storageLimit", {
            /**
             * @description  The limit on the amount of storage an [operation](https://tezos.gitlab.io/user/glossary.html#operations) can use.
             */
            get: function () {
                var limit = Math.max(Number(this._storageLimit), 0);
                return limit > 0 ? limit : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "gasLimit", {
            /**
             * @description The limit on the amount of [gas](https://tezos.gitlab.io/user/glossary.html#gas) a given operation can consume.
             */
            get: function () {
                return this.roundUp(Number(this._milligasLimit) / 1000 + GAS_BUFFER);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "operationFeeMutez", {
            get: function () {
                return ((Number(this._milligasLimit) / 1000 + GAS_BUFFER) * MINIMAL_FEE_PER_GAS_MUTEZ + Number(this.opSize) * MINIMAL_FEE_PER_BYTE_MUTEZ);
            },
            enumerable: false,
            configurable: true
        });
        Estimate.prototype.roundUp = function (nanotez) {
            return Math.ceil(Number(nanotez));
        };
        Object.defineProperty(Estimate.prototype, "minimalFeeMutez", {
            /**
             * @description Minimum fees for the [operation](https://tezos.gitlab.io/user/glossary.html#operations) according to [baker](https://tezos.gitlab.io/user/glossary.html#baker) defaults.
             */
            get: function () {
                return this.roundUp(MINIMAL_FEE_MUTEZ + this.operationFeeMutez);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "suggestedFeeMutez", {
            /**
             * @description The suggested fee for the operation which includes minimal fees and a small buffer.
             */
            get: function () {
                return this.roundUp(this.operationFeeMutez + MINIMAL_FEE_MUTEZ * 2);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "usingBaseFeeMutez", {
            /**
             * @description Fees according to your specified base fee will ensure that at least minimum fees are used.
             */
            get: function () {
                return (Math.max(Number(this.baseFeeMutez), MINIMAL_FEE_MUTEZ) + this.roundUp(this.operationFeeMutez));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "totalCost", {
            /**
             * @description The sum of `minimalFeeMutez` + `burnFeeMutez`.
             */
            get: function () {
                return this.minimalFeeMutez + this.burnFeeMutez;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Estimate.prototype, "consumedMilligas", {
            /**
             * @description Since Delphinet, consumed gas is provided in milligas for more precision.
             * This function returns an estimation of the gas that operation will consume in milligas.
             */
            get: function () {
                return Number(this._milligasLimit);
            },
            enumerable: false,
            configurable: true
        });
        return Estimate;
    }());

    var TZ_DECIMALS = 6;
    var MTZ_DECIMALS = 3;
    function getDecimal(format) {
        switch (format) {
            case 'tz':
                return TZ_DECIMALS;
            case 'mtz':
                return MTZ_DECIMALS;
            case 'mutez':
            default:
                return 0;
        }
    }
    function format(from, to, amount) {
        if (from === void 0) { from = 'mutez'; }
        if (to === void 0) { to = 'mutez'; }
        var bigNum = new BigNumber__default['default'](amount);
        if (bigNum.isNaN()) {
            return amount;
        }
        return bigNum
            .multipliedBy(Math.pow(10, getDecimal(from)))
            .dividedBy(Math.pow(10, getDecimal(to)));
    }

    var createOriginationOperation = function (_a) {
        var code = _a.code, init = _a.init, _b = _a.balance, balance = _b === void 0 ? "0" : _b, delegate = _a.delegate, storage = _a.storage, _c = _a.fee, fee = _c === void 0 ? exports.DEFAULT_FEE.ORIGINATION : _c, _d = _a.gasLimit, gasLimit = _d === void 0 ? exports.DEFAULT_GAS_LIMIT.ORIGINATION : _d, _e = _a.storageLimit, storageLimit = _e === void 0 ? exports.DEFAULT_STORAGE_LIMIT.ORIGINATION : _e;
        return __awaiter(void 0, void 0, void 0, function () {
            var parser, contractCode, c, c, order_1, contractStorage, storageType, schema, c, script, operation;
            return __generator(this, function (_f) {
                // tslint:disable-next-line: strict-type-predicates
                if (storage !== undefined && init !== undefined) {
                    throw new Error("Storage and Init cannot be set a the same time. Please either use storage or init but not both.");
                }
                parser = new michelCodec.Parser({ expandMacros: true });
                if (typeof code === 'string') {
                    c = parser.parseScript(code);
                    if (c === null) {
                        throw new Error('Empty Michelson source');
                    }
                    contractCode = c;
                }
                else {
                    c = parser.parseJSON(code);
                    if (!Array.isArray(c)) {
                        throw new Error('JSON encoded Michelson script must be an array');
                    }
                    order_1 = ['parameter', 'storage', 'code'];
                    // Ensure correct ordering for RPC
                    contractCode = c.sort(function (a, b) { return order_1.indexOf(a.prim) - order_1.indexOf(b.prim); });
                }
                if (storage !== undefined) {
                    storageType = contractCode.find(function (p) { return ('prim' in p) && p.prim === 'storage'; });
                    if ((storageType === null || storageType === void 0 ? void 0 : storageType.args) === undefined) {
                        throw new Error('Missing storage section');
                    }
                    schema = new michelsonEncoder.Schema(storageType.args[0]);
                    contractStorage = schema.Encode(storage);
                }
                else if (typeof init === 'string') {
                    c = parser.parseMichelineExpression(init);
                    if (c === null) {
                        throw new Error('Empty initial storage value');
                    }
                    contractStorage = c;
                }
                else if (typeof init === 'object') {
                    contractStorage = parser.parseJSON(init);
                }
                script = {
                    code: contractCode,
                    storage: contractStorage,
                };
                operation = {
                    kind: rpc.OpKind.ORIGINATION,
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    balance: format("tz", "mutez", balance).toString(),
                    script: script,
                };
                if (delegate) {
                    operation.delegate = delegate;
                }
                return [2 /*return*/, operation];
            });
        });
    };
    var createTransferOperation = function (_a) {
        var to = _a.to, amount = _a.amount, parameter = _a.parameter, _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.TRANSFER : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.TRANSFER : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.TRANSFER : _d, _e = _a.mutez, mutez = _e === void 0 ? false : _e;
        return __awaiter(void 0, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_f) {
                operation = {
                    kind: rpc.OpKind.TRANSACTION,
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    amount: mutez
                        ? amount.toString()
                        : format("tz", "mutez", amount).toString(),
                    destination: to,
                    parameters: parameter,
                };
                return [2 /*return*/, operation];
            });
        });
    };
    var createSetDelegateOperation = function (_a) {
        var delegate = _a.delegate, source = _a.source, _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            var operation;
            return __generator(this, function (_e) {
                operation = {
                    kind: rpc.OpKind.DELEGATION,
                    source: source,
                    fee: fee,
                    gas_limit: gasLimit,
                    storage_limit: storageLimit,
                    delegate: delegate,
                };
                return [2 /*return*/, operation];
            });
        });
    };
    var createRegisterDelegateOperation = function (_a, source) {
        var _b = _a.fee, fee = _b === void 0 ? exports.DEFAULT_FEE.DELEGATION : _b, _c = _a.gasLimit, gasLimit = _c === void 0 ? exports.DEFAULT_GAS_LIMIT.DELEGATION : _c, _d = _a.storageLimit, storageLimit = _d === void 0 ? exports.DEFAULT_STORAGE_LIMIT.DELEGATION : _d;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_e) {
                return [2 /*return*/, {
                        kind: rpc.OpKind.DELEGATION,
                        fee: fee,
                        gas_limit: gasLimit,
                        storage_limit: storageLimit,
                        delegate: source,
                    }];
            });
        });
    };

    var mergeLimits = function (userDefinedLimit, defaultLimits) {
        return {
            fee: typeof userDefinedLimit.fee === 'undefined' ? defaultLimits.fee : userDefinedLimit.fee,
            gasLimit: typeof userDefinedLimit.gasLimit === 'undefined'
                ? defaultLimits.gasLimit
                : userDefinedLimit.gasLimit,
            storageLimit: typeof userDefinedLimit.storageLimit === 'undefined'
                ? defaultLimits.storageLimit
                : userDefinedLimit.storageLimit,
        };
    };
    // RPC requires a signature but does not verify it
    var SIGNATURE_STUB = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';
    var RPCEstimateProvider = /** @class */ (function (_super) {
        __extends(RPCEstimateProvider, _super);
        function RPCEstimateProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ALLOCATION_STORAGE = 257;
            _this.ORIGINATION_STORAGE = 257;
            return _this;
        }
        // Maximum values defined by the protocol
        RPCEstimateProvider.prototype.getAccountLimits = function (pkh) {
            return __awaiter(this, void 0, void 0, function () {
                var balance, _a, hard_gas_limit_per_operation, hard_storage_limit_per_operation, cost_per_byte;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.rpc.getBalance(pkh)];
                        case 1:
                            balance = _b.sent();
                            return [4 /*yield*/, this.rpc.getConstants()];
                        case 2:
                            _a = _b.sent(), hard_gas_limit_per_operation = _a.hard_gas_limit_per_operation, hard_storage_limit_per_operation = _a.hard_storage_limit_per_operation, cost_per_byte = _a.cost_per_byte;
                            return [2 /*return*/, {
                                    fee: 0,
                                    gasLimit: hard_gas_limit_per_operation.toNumber(),
                                    storageLimit: Math.floor(BigNumber__default['default'].min(balance.dividedBy(cost_per_byte), hard_storage_limit_per_operation).toNumber()),
                                }];
                    }
                });
            });
        };
        RPCEstimateProvider.prototype.createEstimateFromOperationContent = function (content, size, costPerByte) {
            var _this = this;
            var operationResults = flattenOperationResult({ contents: [content] });
            var totalGas = 0;
            var totalMilligas = 0;
            var totalStorage = 0;
            operationResults.forEach(function (result) {
                totalStorage +=
                    'originated_contracts' in result && typeof result.originated_contracts !== 'undefined'
                        ? result.originated_contracts.length * _this.ORIGINATION_STORAGE
                        : 0;
                totalStorage += 'allocated_destination_contract' in result ? _this.ALLOCATION_STORAGE : 0;
                totalGas += Number(result.consumed_gas) || 0;
                totalMilligas += Number(result.consumed_milligas) || 0;
                totalStorage +=
                    'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
            });
            if (totalGas !== 0 && totalMilligas === 0) {
                // This will convert gas to milligas for Carthagenet where result does not contain consumed gas in milligas.
                totalMilligas = totalGas * 1000;
            }
            if (isOpWithFee(content)) {
                return new Estimate(totalMilligas || 0, Number(totalStorage || 0), size, costPerByte.toNumber());
            }
            else {
                return new Estimate(0, 0, size, costPerByte.toNumber(), 0);
            }
        };
        RPCEstimateProvider.prototype.createEstimate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, opbytes, _b, branch, contents, operation, opResponse, cost_per_byte, errors;
                var _c;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.prepareAndForge(params)];
                        case 1:
                            _a = _d.sent(), opbytes = _a.opbytes, _b = _a.opOb, branch = _b.branch, contents = _b.contents;
                            _c = {
                                operation: { branch: branch, contents: contents, signature: SIGNATURE_STUB }
                            };
                            return [4 /*yield*/, this.rpc.getChainId()];
                        case 2:
                            operation = (_c.chain_id = _d.sent(),
                                _c);
                            return [4 /*yield*/, this.simulate(operation)];
                        case 3:
                            opResponse = (_d.sent()).opResponse;
                            return [4 /*yield*/, this.rpc.getConstants()];
                        case 4:
                            cost_per_byte = (_d.sent()).cost_per_byte;
                            errors = __spread(flattenErrors(opResponse, 'backtracked'), flattenErrors(opResponse));
                            // Fail early in case of errors
                            if (errors.length) {
                                throw new TezosOperationError(errors);
                            }
                            while (opResponse.contents.length !== (Array.isArray(params.operation) ? params.operation.length : 1)) {
                                opResponse.contents.shift();
                            }
                            return [2 /*return*/, opResponse.contents.map(function (x) {
                                    return _this.createEstimateFromOperationContent(x, opbytes.length / 2 / opResponse.contents.length, cost_per_byte);
                                })];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an origination operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param OriginationOperation Originate operation parameter
         */
        RPCEstimateProvider.prototype.originate = function (_a) {
            var fee = _a.fee, storageLimit = _a.storageLimit, gasLimit = _a.gasLimit, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var pkh, DEFAULT_PARAMS, op;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            pkh = _b.sent();
                            return [4 /*yield*/, this.getAccountLimits(pkh)];
                        case 2:
                            DEFAULT_PARAMS = _b.sent();
                            return [4 /*yield*/, createOriginationOperation(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                        case 3:
                            op = _b.sent();
                            return [4 /*yield*/, this.createEstimate({ operation: op, source: pkh })];
                        case 4: return [2 /*return*/, (_b.sent())[0]];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for an transfer operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param TransferOperation Originate operation parameter
         */
        RPCEstimateProvider.prototype.transfer = function (_a) {
            var fee = _a.fee, storageLimit = _a.storageLimit, gasLimit = _a.gasLimit, rest = __rest(_a, ["fee", "storageLimit", "gasLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var pkh, DEFAULT_PARAMS, op;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            pkh = _b.sent();
                            return [4 /*yield*/, this.getAccountLimits(pkh)];
                        case 2:
                            DEFAULT_PARAMS = _b.sent();
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                        case 3:
                            op = _b.sent();
                            return [4 /*yield*/, this.createEstimate({ operation: op, source: pkh })];
                        case 4: return [2 /*return*/, (_b.sent())[0]];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a delegate operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        RPCEstimateProvider.prototype.setDelegate = function (_a) {
            var fee = _a.fee, gasLimit = _a.gasLimit, storageLimit = _a.storageLimit, rest = __rest(_a, ["fee", "gasLimit", "storageLimit"]);
            return __awaiter(this, void 0, void 0, function () {
                var sourceOrDefault, _b, DEFAULT_PARAMS, op;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = rest.source;
                            if (_b) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1:
                            _b = (_c.sent());
                            _c.label = 2;
                        case 2:
                            sourceOrDefault = _b;
                            return [4 /*yield*/, this.getAccountLimits(sourceOrDefault)];
                        case 3:
                            DEFAULT_PARAMS = _c.sent();
                            return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                        case 4:
                            op = _c.sent();
                            return [4 /*yield*/, this.createEstimate({ operation: op, source: sourceOrDefault })];
                        case 5: return [2 /*return*/, (_c.sent())[0]];
                    }
                });
            });
        };
        RPCEstimateProvider.prototype.batch = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var operations, DEFAULT_PARAMS, _a, params_1, params_1_1, param, _b, _c, _d, _e, _f, _g, _h, e_1_1;
                var e_1, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            operations = [];
                            _a = this.getAccountLimits;
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1: return [4 /*yield*/, _a.apply(this, [_k.sent()])];
                        case 2:
                            DEFAULT_PARAMS = _k.sent();
                            _k.label = 3;
                        case 3:
                            _k.trys.push([3, 15, 16, 17]);
                            params_1 = __values(params), params_1_1 = params_1.next();
                            _k.label = 4;
                        case 4:
                            if (!!params_1_1.done) return [3 /*break*/, 14];
                            param = params_1_1.value;
                            _b = param.kind;
                            switch (_b) {
                                case rpc.OpKind.TRANSACTION: return [3 /*break*/, 5];
                                case rpc.OpKind.ORIGINATION: return [3 /*break*/, 7];
                                case rpc.OpKind.DELEGATION: return [3 /*break*/, 9];
                                case rpc.OpKind.ACTIVATION: return [3 /*break*/, 11];
                            }
                            return [3 /*break*/, 12];
                        case 5:
                            _d = (_c = operations).push;
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                        case 6:
                            _d.apply(_c, [_k.sent()]);
                            return [3 /*break*/, 13];
                        case 7:
                            _f = (_e = operations).push;
                            return [4 /*yield*/, createOriginationOperation(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                        case 8:
                            _f.apply(_e, [_k.sent()]);
                            return [3 /*break*/, 13];
                        case 9:
                            _h = (_g = operations).push;
                            return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                        case 10:
                            _h.apply(_g, [_k.sent()]);
                            return [3 /*break*/, 13];
                        case 11:
                            operations.push(__assign(__assign({}, param), DEFAULT_PARAMS));
                            return [3 /*break*/, 13];
                        case 12: throw new Error("Unsupported operation kind: " + param.kind);
                        case 13:
                            params_1_1 = params_1.next();
                            return [3 /*break*/, 4];
                        case 14: return [3 /*break*/, 17];
                        case 15:
                            e_1_1 = _k.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 17];
                        case 16:
                            try {
                                if (params_1_1 && !params_1_1.done && (_j = params_1.return)) _j.call(params_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 17: return [2 /*return*/, this.createEstimate({ operation: operations })];
                    }
                });
            });
        };
        /**
         *
         * @description Estimate gasLimit, storageLimit and fees for a delegate operation
         *
         * @returns An estimation of gasLimit, storageLimit and fees for the operation
         *
         * @param Estimate
         */
        RPCEstimateProvider.prototype.registerDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var DEFAULT_PARAMS, _a, op, _b, _c, _d;
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _a = this.getAccountLimits;
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 1: return [4 /*yield*/, _a.apply(this, [_f.sent()])];
                        case 2:
                            DEFAULT_PARAMS = _f.sent();
                            _b = createRegisterDelegateOperation;
                            _c = [__assign(__assign({}, params), DEFAULT_PARAMS)];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3: return [4 /*yield*/, _b.apply(void 0, _c.concat([_f.sent()]))];
                        case 4:
                            op = _f.sent();
                            _d = this.createEstimate;
                            _e = { operation: op };
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 5: return [4 /*yield*/, _d.apply(this, [(_e.source = _f.sent(), _e)])];
                        case 6: return [2 /*return*/, (_f.sent())[0]];
                    }
                });
            });
        };
        return RPCEstimateProvider;
    }(OperationEmitter));

    /**
     * @description Delegation operation provide utility function to fetch newly issued delegation
     *
     * @warn Currently support only one delegation per operation
     */
    var DelegateOperation = /** @class */ (function (_super) {
        __extends(DelegateOperation, _super);
        function DelegateOperation(hash, params, source, raw, results, context) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.source = source;
            return _this;
        }
        Object.defineProperty(DelegateOperation.prototype, "operationResults", {
            get: function () {
                var delegationOp = Array.isArray(this.results) &&
                    this.results.find(function (op) { return op.kind === 'delegation'; });
                var result = delegationOp && delegationOp.metadata && delegationOp.metadata.operation_result;
                return result ? result : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "status", {
            get: function () {
                var operationResults = this.operationResults;
                if (operationResults) {
                    return operationResults.status;
                }
                else {
                    return 'unknown';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "delegate", {
            get: function () {
                return this.delegate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "isRegisterOperation", {
            get: function () {
                return this.delegate === this.source;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "consumedGas", {
            get: function () {
                var consumedGas = this.operationResults && this.operationResults.consumed_gas;
                return consumedGas ? consumedGas : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DelegateOperation.prototype, "errors", {
            get: function () {
                return this.operationResults && this.operationResults.errors;
            },
            enumerable: false,
            configurable: true
        });
        return DelegateOperation;
    }(Operation));

    /**
     * @description Origination operation provide utility function to fetch newly originated contract
     *
     * @warn Currently support only one origination per operation
     */
    var OriginationOperation = /** @class */ (function (_super) {
        __extends(OriginationOperation, _super);
        function OriginationOperation(hash, params, raw, results, context, contractProvider) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.contractProvider = contractProvider;
            var originatedContracts = _this.operationResults && _this.operationResults.originated_contracts;
            if (Array.isArray(originatedContracts)) {
                _this.contractAddress = originatedContracts[0];
            }
            return _this;
        }
        Object.defineProperty(OriginationOperation.prototype, "status", {
            get: function () {
                var operationResults = this.operationResults;
                if (operationResults) {
                    return operationResults.status;
                }
                else {
                    return 'unknown';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "operationResults", {
            get: function () {
                var originationOp = Array.isArray(this.results) &&
                    this.results.find(function (op) { return op.kind === 'origination'; });
                var result = originationOp &&
                    hasMetadataWithResult(originationOp) &&
                    originationOp.metadata.operation_result;
                return result ? result : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "consumedGas", {
            get: function () {
                var consumedGas = this.operationResults && this.operationResults.consumed_gas;
                return consumedGas ? consumedGas : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageDiff", {
            get: function () {
                var storageDiff = this.operationResults && this.operationResults.paid_storage_size_diff;
                return storageDiff ? storageDiff : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "storageSize", {
            get: function () {
                var storageSize = this.operationResults && this.operationResults.storage_size;
                return storageSize ? storageSize : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OriginationOperation.prototype, "errors", {
            get: function () {
                return this.operationResults && this.operationResults.errors;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description Provide the contract abstract of the newly originated contract
         */
        OriginationOperation.prototype.contract = function (confirmations, interval, timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.contractAddress) {
                                throw new Error('No contract was originated in this operation');
                            }
                            return [4 /*yield*/, this.confirmation(confirmations, interval, timeout)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.contractProvider.at(this.contractAddress)];
                    }
                });
            });
        };
        return OriginationOperation;
    }(Operation));

    /**
     * @description Transaction operation provides utility functions to fetch a newly issued transaction
     *
     * @warn Currently supports one transaction per operation
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
                return transactionOp ? [transactionOp] : [];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "status", {
            get: function () {
                var operationResults = this.operationResults;
                var txResult = operationResults[0];
                if (txResult) {
                    return txResult.metadata.operation_result.status;
                }
                else {
                    return 'unknown';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "amount", {
            get: function () {
                return new BigNumber__default['default'](this.params.amount);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "destination", {
            get: function () {
                return this.params.destination;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "fee", {
            get: function () {
                return this.params.fee;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "gasLimit", {
            get: function () {
                return this.params.gas_limit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageLimit", {
            get: function () {
                return this.params.storage_limit;
            },
            enumerable: false,
            configurable: true
        });
        TransactionOperation.prototype.sumProp = function (arr, prop) {
            return arr.reduce(function (prev, current) {
                return prop in current ? Number(current[prop]) + prev : prev;
            }, 0);
        };
        Object.defineProperty(TransactionOperation.prototype, "consumedGas", {
            get: function () {
                return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'consumed_gas'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageDiff", {
            get: function () {
                return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'paid_storage_size_diff'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "storageSize", {
            get: function () {
                return String(this.sumProp(flattenOperationResult({ contents: this.operationResults }), 'storage_size'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TransactionOperation.prototype, "errors", {
            get: function () {
                return flattenErrors({ contents: this.operationResults });
            },
            enumerable: false,
            configurable: true
        });
        return TransactionOperation;
    }(Operation));

    var InvalidParameterError = /** @class */ (function () {
        function InvalidParameterError(smartContractMethodName, sigs, args) {
            this.smartContractMethodName = smartContractMethodName;
            this.sigs = sigs;
            this.args = args;
            this.name = 'Invalid parameters error';
            this.message = smartContractMethodName + " Received " + args.length + " arguments while expecting one of the following signatures (" + JSON.stringify(sigs) + ")";
        }
        return InvalidParameterError;
    }());
    var InvalidDelegationSource = /** @class */ (function () {
        function InvalidDelegationSource(source) {
            this.source = source;
            this.name = 'Invalid delegation source error';
            this.message = "Since Babylon delegation source can no longer be a contract address " + source + ". Please use the smart contract abstraction to set your delegate.";
        }
        return InvalidDelegationSource;
    }());

    var setDelegate = function (key) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'key_hash' }, { string: key }],
            },
            { prim: 'SOME' },
            { prim: 'SET_DELEGATE' },
            { prim: 'CONS' },
        ];
    };
    var transferImplicit = function (key, mutez) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'key_hash' }, { string: key }],
            },
            { prim: 'IMPLICIT_ACCOUNT' },
            {
                prim: 'PUSH',
                args: [{ prim: 'mutez' }, { int: "" + mutez }],
            },
            { prim: 'UNIT' },
            { prim: 'TRANSFER_TOKENS' },
            { prim: 'CONS' },
        ];
    };
    var removeDelegate = function () {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            { prim: 'NONE', args: [{ prim: 'key_hash' }] },
            { prim: 'SET_DELEGATE' },
            { prim: 'CONS' },
        ];
    };
    var transferToContract = function (key, amount) {
        return [
            { prim: 'DROP' },
            { prim: 'NIL', args: [{ prim: 'operation' }] },
            {
                prim: 'PUSH',
                args: [{ prim: 'address' }, { string: key }],
            },
            { prim: 'CONTRACT', args: [{ prim: 'unit' }] },
            [
                {
                    prim: 'IF_NONE',
                    args: [[[{ prim: 'UNIT' }, { prim: 'FAILWITH' }]], []],
                },
            ],
            {
                prim: 'PUSH',
                args: [{ prim: 'mutez' }, { int: "" + amount }],
            },
            { prim: 'UNIT' },
            { prim: 'TRANSFER_TOKENS' },
            { prim: 'CONS' },
        ];
    };
    var MANAGER_LAMBDA = {
        setDelegate: setDelegate,
        removeDelegate: removeDelegate,
        transferImplicit: transferImplicit,
        transferToContract: transferToContract,
    };

    var WalletOperationBatch = /** @class */ (function () {
        function WalletOperationBatch(walletProvider, operationFactory) {
            this.walletProvider = walletProvider;
            this.operationFactory = operationFactory;
            this.operations = [];
        }
        /**
         *
         * @description Add a transaction operation to the batch
         *
         * @param params Transfer operation parameter
         */
        WalletOperationBatch.prototype.withTransfer = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.TRANSACTION }, params));
            return this;
        };
        /**
         *
         * @description Add a transaction operation to the batch
         *
         * @param params Transfer operation parameter
         */
        WalletOperationBatch.prototype.withContractCall = function (params) {
            return this.withTransfer(params.toTransferParams());
        };
        /**
         *
         * @description Add a delegation operation to the batch
         *
         * @param params Delegation operation parameter
         */
        WalletOperationBatch.prototype.withDelegation = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.DELEGATION }, params));
            return this;
        };
        /**
         *
         * @description Add an origination operation to the batch
         *
         * @param params Origination operation parameter
         */
        WalletOperationBatch.prototype.withOrigination = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.ORIGINATION }, params));
            return this;
        };
        WalletOperationBatch.prototype.mapOperation = function (param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (param.kind) {
                        case rpc.OpKind.TRANSACTION:
                            return [2 /*return*/, this.walletProvider.mapTransferParamsToWalletParams(__assign({}, param))];
                        case rpc.OpKind.ORIGINATION:
                            return [2 /*return*/, this.walletProvider.mapOriginateParamsToWalletParams(__assign({}, param))];
                        case rpc.OpKind.DELEGATION:
                            return [2 /*return*/, this.walletProvider.mapDelegateParamsToWalletParams(__assign({}, param))];
                        default:
                            throw new Error("Unsupported operation kind: " + param.kind);
                    }
                });
            });
        };
        /**
         *
         * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
         *
         * @param params Operations parameter
         */
        WalletOperationBatch.prototype.with = function (params) {
            var e_1, _a;
            try {
                for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                    var param = params_1_1.value;
                    switch (param.kind) {
                        case rpc.OpKind.TRANSACTION:
                            this.withTransfer(param);
                            break;
                        case rpc.OpKind.ORIGINATION:
                            this.withOrigination(param);
                            break;
                        case rpc.OpKind.DELEGATION:
                            this.withDelegation(param);
                            break;
                        default:
                            throw new Error("Unsupported operation kind: " + param.kind);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (params_1_1 && !params_1_1.done && (_a = params_1.return)) _a.call(params_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this;
        };
        /**
         *
         * @description Submit batch operation to wallet
         *
         */
        WalletOperationBatch.prototype.send = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ops, _a, _b, op, _c, _d, e_2_1, opHash;
                var e_2, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            ops = [];
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 6, 7, 8]);
                            _a = __values(this.operations), _b = _a.next();
                            _f.label = 2;
                        case 2:
                            if (!!_b.done) return [3 /*break*/, 5];
                            op = _b.value;
                            _d = (_c = ops).push;
                            return [4 /*yield*/, this.mapOperation(op)];
                        case 3:
                            _d.apply(_c, [_f.sent()]);
                            _f.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_2_1 = _f.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 /*endfinally*/];
                        case 8: return [4 /*yield*/, this.walletProvider.sendOperations(ops)];
                        case 9:
                            opHash = _f.sent();
                            return [2 /*return*/, this.operationFactory.createOperation(opHash)];
                    }
                });
            });
        };
        return WalletOperationBatch;
    }());
    var Wallet = /** @class */ (function () {
        function Wallet(context) {
            this.context = context;
            this.walletCommand = function (send) {
                return {
                    send: send,
                };
            };
        }
        Object.defineProperty(Wallet.prototype, "walletProvider", {
            get: function () {
                return this.context.walletProvider;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @description Retrieve the PKH of the account that is currently in use by the wallet
         *
         * @param option Option to use while fetching the PKH.
         * If forceRefetch is specified the wallet provider implementation will refetch the PKH from the wallet
         */
        Wallet.prototype.pkh = function (_a) {
            var forceRefetch = (_a === void 0 ? {} : _a).forceRefetch;
            return __awaiter(this, void 0, void 0, function () {
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!this._pkh || forceRefetch)) return [3 /*break*/, 2];
                            _b = this;
                            return [4 /*yield*/, this.walletProvider.getPKH()];
                        case 1:
                            _b._pkh = _c.sent();
                            _c.label = 2;
                        case 2: return [2 /*return*/, this._pkh];
                    }
                });
            });
        };
        /**
         *
         * @description Originate a new contract according to the script in parameters.
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param originateParams Originate operation parameter
         */
        Wallet.prototype.originate = function (params) {
            var _this = this;
            return this.walletCommand(function () { return __awaiter(_this, void 0, void 0, function () {
                var mappedParams, opHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletProvider.mapOriginateParamsToWalletParams(__assign({}, params))];
                        case 1:
                            mappedParams = _a.sent();
                            return [4 /*yield*/, this.walletProvider.sendOperations([mappedParams])];
                        case 2:
                            opHash = _a.sent();
                            return [2 /*return*/, this.context.operationFactory.createOriginationOperation(opHash)];
                    }
                });
            }); });
        };
        /**
         *
         * @description Set the delegate for a contract.
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param delegateParams operation parameter
         */
        Wallet.prototype.setDelegate = function (params) {
            var _this = this;
            return this.walletCommand(function () { return __awaiter(_this, void 0, void 0, function () {
                var mappedParams, opHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletProvider.mapDelegateParamsToWalletParams(__assign({}, params))];
                        case 1:
                            mappedParams = _a.sent();
                            return [4 /*yield*/, this.walletProvider.sendOperations([mappedParams])];
                        case 2:
                            opHash = _a.sent();
                            return [2 /*return*/, this.context.operationFactory.createDelegationOperation(opHash)];
                    }
                });
            }); });
        };
        /**
         *
         * @description Register the current address as delegate.
         *
         * @returns An operation handle with the result from the rpc node
         *
         */
        Wallet.prototype.registerDelegate = function () {
            var _this = this;
            return this.walletCommand(function () { return __awaiter(_this, void 0, void 0, function () {
                var mappedParams, _a, _b, opHash;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.walletProvider).mapDelegateParamsToWalletParams;
                            _c = {};
                            return [4 /*yield*/, this.pkh()];
                        case 1: return [4 /*yield*/, _b.apply(_a, [(_c.delegate = _d.sent(),
                                    _c)])];
                        case 2:
                            mappedParams = _d.sent();
                            return [4 /*yield*/, this.walletProvider.sendOperations([mappedParams])];
                        case 3:
                            opHash = _d.sent();
                            return [2 /*return*/, this.context.operationFactory.createDelegationOperation(opHash)];
                    }
                });
            }); });
        };
        /**
         *
         * @description Transfer tezos tokens from current address to a specific address or call a smart contract.
         *
         * @returns A wallet command from which we can send the operation to the wallet
         *
         * @param params operation parameter
         */
        Wallet.prototype.transfer = function (params) {
            var _this = this;
            return this.walletCommand(function () { return __awaiter(_this, void 0, void 0, function () {
                var mappedParams, opHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletProvider.mapTransferParamsToWalletParams(params)];
                        case 1:
                            mappedParams = _a.sent();
                            return [4 /*yield*/, this.walletProvider.sendOperations([mappedParams])];
                        case 2:
                            opHash = _a.sent();
                            return [2 /*return*/, this.context.operationFactory.createTransactionOperation(opHash)];
                    }
                });
            }); });
        };
        /**
         *
         * @description Create a batch of operation
         *
         * @returns A batch object from which we can add more operation or send a command to the wallet to execute the batch
         *
         * @param params List of operation to initialize the batch with
         */
        Wallet.prototype.batch = function (params) {
            var batch = new WalletOperationBatch(this.walletProvider, this.context.operationFactory);
            batch.with(params);
            return batch;
        };
        /**
         *
         * @description Create an smart contract abstraction for the address specified. Calling entrypoints with the returned
         * smart contract abstraction will leverage the wallet provider to make smart contract calls
         *
         * @param address Smart contract address
         */
        Wallet.prototype.at = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                var script, entrypoints;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.context.rpc.getScript(address)];
                        case 1:
                            script = _a.sent();
                            return [4 /*yield*/, this.context.rpc.getEntrypoints(address)];
                        case 2:
                            entrypoints = _a.sent();
                            return [2 /*return*/, new ContractAbstraction(address, script, this, this.context.contract, entrypoints)];
                    }
                });
            });
        };
        return Wallet;
    }());

    var LegacyWalletProvider = /** @class */ (function () {
        function LegacyWalletProvider(context) {
            this.context = context;
        }
        LegacyWalletProvider.prototype.getPKH = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.context.signer.publicKeyHash()];
                });
            });
        };
        LegacyWalletProvider.prototype.mapTransferParamsToWalletParams = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, attachKind(params, rpc.OpKind.TRANSACTION)];
                });
            });
        };
        LegacyWalletProvider.prototype.mapOriginateParamsToWalletParams = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, attachKind(params, rpc.OpKind.ORIGINATION)];
                });
            });
        };
        LegacyWalletProvider.prototype.mapDelegateParamsToWalletParams = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, attachKind(params, rpc.OpKind.DELEGATION)];
                });
            });
        };
        LegacyWalletProvider.prototype.sendOperations = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var op;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.context.batch.batch(params).send()];
                        case 1:
                            op = _a.sent();
                            return [2 /*return*/, op.hash];
                    }
                });
            });
        };
        return LegacyWalletProvider;
    }());

    var DEFAULT_SMART_CONTRACT_METHOD_NAME = 'default';
    /**
     * @description Utility class to send smart contract operation
     */
    var ContractMethod = /** @class */ (function () {
        function ContractMethod(provider, address, parameterSchema, name, args, isMultipleEntrypoint, isAnonymous) {
            if (isMultipleEntrypoint === void 0) { isMultipleEntrypoint = true; }
            if (isAnonymous === void 0) { isAnonymous = false; }
            this.provider = provider;
            this.address = address;
            this.parameterSchema = parameterSchema;
            this.name = name;
            this.args = args;
            this.isMultipleEntrypoint = isMultipleEntrypoint;
            this.isAnonymous = isAnonymous;
        }
        Object.defineProperty(ContractMethod.prototype, "schema", {
            /**
             * @description Get the schema of the smart contract method
             */
            get: function () {
                return this.isAnonymous
                    ? this.parameterSchema.ExtractSchema()[this.name]
                    : this.parameterSchema.ExtractSchema();
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         * @description Send the smart contract operation
         *
         * @param Options generic operation parameter
         */
        ContractMethod.prototype.send = function (params) {
            if (params === void 0) { params = {}; }
            if (this.provider instanceof Wallet) {
                // TODO got around TS2352: Conversion of type 'T & Wallet' to type 'Wallet' by adding `as unknown`. Needs clarification
                return this.provider.transfer(this.toTransferParams(params)).send();
            }
            else {
                return this.provider.transfer(this.toTransferParams(params));
            }
        };
        /**
         *
         * @description Create transfer params to be used with TezosToolkit.contract.transfer methods
         *
         * @param Options generic transfer operation parameters
         */
        ContractMethod.prototype.toTransferParams = function (_a) {
            var _b, _c;
            var _d = _a === void 0 ? {} : _a, fee = _d.fee, gasLimit = _d.gasLimit, storageLimit = _d.storageLimit, source = _d.source, _e = _d.amount, amount = _e === void 0 ? 0 : _e, _f = _d.mutez, mutez = _f === void 0 ? false : _f;
            var fullTransferParams = {
                to: this.address,
                amount: amount,
                fee: fee,
                mutez: mutez,
                source: source,
                gasLimit: gasLimit,
                storageLimit: storageLimit,
                parameter: {
                    entrypoint: this.isMultipleEntrypoint ? this.name : 'default',
                    value: this.isAnonymous
                        ? (_b = this.parameterSchema).Encode.apply(_b, __spread([this.name], this.args)) : (_c = this.parameterSchema).Encode.apply(_c, __spread(this.args)),
                },
            };
            return fullTransferParams;
        };
        return ContractMethod;
    }());
    var validateArgs = function (args, schema, name) {
        var sigs = schema.ExtractSignatures();
        if (!sigs.find(function (x) { return x.length === args.length; })) {
            throw new InvalidParameterError(name, sigs, args);
        }
    };
    /**
     * @description Smart contract abstraction
     */
    var ContractAbstraction = /** @class */ (function () {
        function ContractAbstraction(address, script, provider, storageProvider, entrypoints) {
            this.address = address;
            this.script = script;
            this.storageProvider = storageProvider;
            this.entrypoints = entrypoints;
            /**
             * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
             * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
             *
             */
            this.methods = {};
            this.schema = michelsonEncoder.Schema.fromRPCResponse({ script: this.script });
            this.parameterSchema = michelsonEncoder.ParameterSchema.fromRPCResponse({ script: this.script });
            this._initializeMethods(address, provider, this.entrypoints.entrypoints);
        }
        ContractAbstraction.prototype._initializeMethods = function (address, provider, entrypoints) {
            var _this = this;
            var parameterSchema = this.parameterSchema;
            var keys = Object.keys(entrypoints);
            if (parameterSchema.isMultipleEntryPoint) {
                keys.forEach(function (smartContractMethodName) {
                    var method = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var smartContractMethodSchema = new michelsonEncoder.ParameterSchema(entrypoints[smartContractMethodName]);
                        validateArgs(args, smartContractMethodSchema, smartContractMethodName);
                        return new ContractMethod(provider, address, smartContractMethodSchema, smartContractMethodName, args);
                    };
                    _this.methods[smartContractMethodName] = method;
                });
                // Deal with methods with no annotations which were not discovered by the RPC endpoint
                // Methods with no annotations are discovered using parameter schema
                var anonymousMethods = Object.keys(parameterSchema.ExtractSchema()).filter(function (key) { return Object.keys(entrypoints).indexOf(key) === -1; });
                anonymousMethods.forEach(function (smartContractMethodName) {
                    var method = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        validateArgs(__spread([smartContractMethodName], args), parameterSchema, smartContractMethodName);
                        return new ContractMethod(provider, address, parameterSchema, smartContractMethodName, args, false, true);
                    };
                    _this.methods[smartContractMethodName] = method;
                });
            }
            else {
                var smartContractMethodSchema_1 = this.parameterSchema;
                var method = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    validateArgs(args, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME);
                    return new ContractMethod(provider, address, smartContractMethodSchema_1, DEFAULT_SMART_CONTRACT_METHOD_NAME, args, false);
                };
                this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = method;
            }
        };
        /**
         * @description Return a friendly representation of the smart contract storage
         */
        ContractAbstraction.prototype.storage = function () {
            return this.storageProvider.getStorage(this.address, this.schema);
        };
        /**
         *
         * @description Return a friendly representation of the smart contract big map value
         *
         * @param key BigMap key to fetch
         *
         * @deprecated getBigMapKey has been deprecated in favor of getBigMapKeyByID
         *
         * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        ContractAbstraction.prototype.bigMap = function (key) {
            // tslint:disable-next-line: deprecation
            return this.storageProvider.getBigMapKey(this.address, key, this.schema);
        };
        return ContractAbstraction;
    }());

    var BigMapAbstraction = /** @class */ (function () {
        function BigMapAbstraction(id, schema, provider) {
            this.id = id;
            this.schema = schema;
            this.provider = provider;
        }
        BigMapAbstraction.prototype.get = function (keyToEncode) {
            return __awaiter(this, void 0, void 0, function () {
                var id, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.provider.getBigMapKeyByID(this.id.toString(), keyToEncode, this.schema)];
                        case 1:
                            id = _a.sent();
                            return [2 /*return*/, id];
                        case 2:
                            e_1 = _a.sent();
                            if (e_1 instanceof httpUtils.HttpResponseError && e_1.status === httpUtils.STATUS_CODE.NOT_FOUND) {
                                return [2 /*return*/, undefined];
                            }
                            else {
                                throw e_1;
                            }
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        BigMapAbstraction.prototype.toJSON = function () {
            return this.id.toString();
        };
        BigMapAbstraction.prototype.toString = function () {
            return this.id.toString();
        };
        return BigMapAbstraction;
    }());

    // Override the default michelson encoder semantic to provide richer abstraction over storage properties
    var smartContractAbstractionSemantic = function (provider) { return ({
        // Provide a specific abstraction for BigMaps
        big_map: function (val, code) {
            if (!val || !('int' in val) || val.int === undefined) {
                // Return an empty object in case of missing big map ID
                return {};
            }
            else {
                var schema = new michelsonEncoder.Schema(code);
                return new BigMapAbstraction(new BigNumber__default['default'](val.int), schema, provider);
            }
        },
    }); };

    var RpcContractProvider = /** @class */ (function (_super) {
        __extends(RpcContractProvider, _super);
        function RpcContractProvider(context, estimator) {
            var _this = _super.call(this, context) || this;
            _this.estimator = estimator;
            return _this;
        }
        /**
         *
         * @description Return a well formatted json object of the contract storage
         *
         * @param contract contract address you want to get the storage from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         *
         * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        RpcContractProvider.prototype.getStorage = function (contract, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var contractSchema, storage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!schema) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.rpc.getScript(contract)];
                        case 1:
                            schema = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (michelsonEncoder.Schema.isSchema(schema)) {
                                contractSchema = schema;
                            }
                            else {
                                contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
                            }
                            return [4 /*yield*/, this.rpc.getStorage(contract)];
                        case 3:
                            storage = _a.sent();
                            return [2 /*return*/, contractSchema.Execute(storage, smartContractAbstractionSemantic(this))]; // Cast into T because only the caller can know the true type of the storage
                    }
                });
            });
        };
        /**
         *
         * @description Return a well formatted json object of the contract big map storage
         *
         * @param contract contract address you want to get the storage from
         * @param key contract big map key to fetch value from
         * @param schema optional schema can either be the contract script rpc response or a michelson-encoder schema
         *
         * @deprecated Deprecated in favor of getBigMapKeyByID
         *
         * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
         */
        RpcContractProvider.prototype.getBigMapKey = function (contract, key, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var contractSchema, encodedKey, val;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!schema) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.rpc.getScript(contract)];
                        case 1:
                            schema = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (michelsonEncoder.Schema.isSchema(schema)) {
                                contractSchema = schema;
                            }
                            else {
                                contractSchema = michelsonEncoder.Schema.fromRPCResponse({ script: schema });
                            }
                            encodedKey = contractSchema.EncodeBigMapKey(key);
                            return [4 /*yield*/, this.rpc.getBigMapKey(contract, encodedKey)];
                        case 3:
                            val = _a.sent();
                            return [2 /*return*/, contractSchema.ExecuteOnBigMapValue(val)]; // Cast into T because only the caller can know the true type of the storage
                    }
                });
            });
        };
        /**
         *
         * @description Return a well formatted json object of a big map value
         *
         * @param id Big Map ID
         * @param keyToEncode key to query (will be encoded properly according to the schema)
         * @param schema Big Map schema (can be determined using your contract type)
         *
         * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
         */
        RpcContractProvider.prototype.getBigMapKeyByID = function (id, keyToEncode, schema) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, key, type, packed, encodedExpr, bigMapValue;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = schema.EncodeBigMapKey(keyToEncode), key = _a.key, type = _a.type;
                            return [4 /*yield*/, this.context.rpc.packData({ data: key, type: type })];
                        case 1:
                            packed = (_b.sent()).packed;
                            encodedExpr = utils.encodeExpr(packed);
                            return [4 /*yield*/, this.context.rpc.getBigMapExpr(id.toString(), encodedExpr)];
                        case 2:
                            bigMapValue = _b.sent();
                            return [2 /*return*/, schema.ExecuteOnBigMapValue(bigMapValue, smartContractAbstractionSemantic(this))];
                    }
                });
            });
        };
        /**
         *
         * @description Originate a new contract according to the script in parameters. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @warn You cannot specify storage and init at the same time (use init to pass the raw michelson representation of storage)
         *
         * @param OriginationOperation Originate operation parameter
         */
        RpcContractProvider.prototype.originate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, publicKeyHash, operation, preparedOrigination, forgedOrigination, _a, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.originate.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 2:
                            publicKeyHash = _b.sent();
                            return [4 /*yield*/, createOriginationOperation(__assign(__assign({}, params), estimate))];
                        case 3:
                            operation = _b.sent();
                            return [4 /*yield*/, this.prepareOperation({ operation: operation, source: publicKeyHash })];
                        case 4:
                            preparedOrigination = _b.sent();
                            return [4 /*yield*/, this.forge(preparedOrigination)];
                        case 5:
                            forgedOrigination = _b.sent();
                            return [4 /*yield*/, this.signAndInject(forgedOrigination)];
                        case 6:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            return [2 /*return*/, new OriginationOperation(hash, operation, forgedBytes, opResponse, context, this)];
                    }
                });
            });
        };
        /**
         *
         * @description Set the delegate for a contract. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param SetDelegate operation parameter
         */
        RpcContractProvider.prototype.setDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, sourceOrDefault, _a, opBytes, _b, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // Since babylon delegation source cannot smart contract
                            if (/kt1/i.test(params.source)) {
                                throw new InvalidDelegationSource(params.source);
                            }
                            return [4 /*yield*/, this.estimate(params, this.estimator.setDelegate.bind(this.estimator))];
                        case 1:
                            estimate = _c.sent();
                            return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, params), estimate))];
                        case 2:
                            operation = _c.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3:
                            _a = (_c.sent());
                            _c.label = 4;
                        case 4:
                            sourceOrDefault = _a;
                            return [4 /*yield*/, this.prepareAndForge({
                                    operation: operation,
                                    source: sourceOrDefault,
                                })];
                        case 5:
                            opBytes = _c.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 6:
                            _b = _c.sent(), hash = _b.hash, context = _b.context, forgedBytes = _b.forgedBytes, opResponse = _b.opResponse;
                            return [2 /*return*/, new DelegateOperation(hash, operation, sourceOrDefault, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Get relevant parameters for later signing and broadcast of a delegate transaction
         *
         * @returns ForgedBytes parameters needed to sign and broadcast
         *
         * @param params delegate parameters
         */
        RpcContractProvider.prototype.getDelegateSignatureHash = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, sourceOrDefault, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.context.isAnyProtocolActive(protocols['005'])];
                        case 1:
                            // Since babylon delegation source cannot smart contract
                            if ((_b.sent()) && /kt1/i.test(params.source)) {
                                throw new InvalidDelegationSource(params.source);
                            }
                            return [4 /*yield*/, this.estimate(params, this.estimator.setDelegate.bind(this.estimator))];
                        case 2:
                            estimate = _b.sent();
                            return [4 /*yield*/, createSetDelegateOperation(__assign(__assign({}, params), estimate))];
                        case 3:
                            operation = _b.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 4:
                            _a = (_b.sent());
                            _b.label = 5;
                        case 5:
                            sourceOrDefault = _a;
                            return [2 /*return*/, this.prepareAndForge({
                                    operation: operation,
                                    source: sourceOrDefault,
                                })];
                    }
                });
            });
        };
        /**
         *
         * @description inject a signature to construct a delegate operation
         *
         * @returns A delegate operation handle with the result from the rpc node
         *
         * @param params result of `getTransferSignatureHash`
         * @param prefixSig the prefix to be used for the encoding of the signature bytes
         * @param sbytes signature bytes in hex
         */
        RpcContractProvider.prototype.injectDelegateSignatureAndBroadcast = function (params, prefixSig, sbytes) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, hash, context, forgedBytes, opResponse, delegationParams, operation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.inject(params, prefixSig, sbytes)];
                        case 1:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            if (!params.opOb.contents) {
                                throw new Error('Invalid operation contents');
                            }
                            delegationParams = params.opOb.contents.find(function (content) { return content.kind === 'delegation'; });
                            if (!delegationParams) {
                                throw new Error('No delegation in operation contents');
                            }
                            return [4 /*yield*/, createSetDelegateOperation(operationContentsToDelegateParams(delegationParams))];
                        case 2:
                            operation = _b.sent();
                            return [2 /*return*/, new DelegateOperation(hash, operation, params.opOb.contents[0].source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Register the current address as delegate. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param RegisterDelegate operation parameter
         */
        RpcContractProvider.prototype.registerDelegate = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, source, operation, opBytes, _a, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.registerDelegate.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 2:
                            source = _b.sent();
                            return [4 /*yield*/, createRegisterDelegateOperation(__assign(__assign({}, params), estimate), source)];
                        case 3:
                            operation = _b.sent();
                            return [4 /*yield*/, this.prepareAndForge({ operation: operation })];
                        case 4:
                            opBytes = _b.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 5:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            return [2 /*return*/, new DelegateOperation(hash, operation, source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param Transfer operation parameter
         */
        RpcContractProvider.prototype.transfer = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, source, _a, opBytes, _b, hash, context, forgedBytes, opResponse;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.transfer.bind(this.estimator, params))];
                        case 1:
                            estimate = _c.sent();
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, params), estimate))];
                        case 2:
                            operation = _c.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3:
                            _a = (_c.sent());
                            _c.label = 4;
                        case 4:
                            source = _a;
                            return [4 /*yield*/, this.prepareAndForge({ operation: operation, source: params.source })];
                        case 5:
                            opBytes = _c.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 6:
                            _b = _c.sent(), hash = _b.hash, context = _b.context, forgedBytes = _b.forgedBytes, opResponse = _b.opResponse;
                            return [2 /*return*/, new TransactionOperation(hash, operation, source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        /**
         *
         * @description Get relevant parameters for later signing and broadcast of a transfer transaction
         *
         * @returns GetTransferSignatureHashResponse parameters needed to sign and broadcast
         *
         * @param params operation parameters
         */
        RpcContractProvider.prototype.getTransferSignatureHash = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimate, operation, source, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.estimate(params, this.estimator.transfer.bind(this.estimator))];
                        case 1:
                            estimate = _b.sent();
                            return [4 /*yield*/, createTransferOperation(__assign(__assign({}, params), estimate))];
                        case 2:
                            operation = _b.sent();
                            _a = params.source;
                            if (_a) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 3:
                            _a = (_b.sent());
                            _b.label = 4;
                        case 4:
                            source = _a;
                            return [2 /*return*/, this.prepareAndForge({ operation: operation, source: source })];
                    }
                });
            });
        };
        /**
         *
         * @description Transfer tz from current address to a specific address. Will sign and inject an operation using the current context
         *
         * @returns An operation handle with the result from the rpc node
         *
         * @param params result of `getTransferSignatureHash`
         * @param prefixSig the prefix to be used for the encoding of the signature bytes
         * @param sbytes signature bytes in hex
         */
        RpcContractProvider.prototype.injectTransferSignatureAndBroadcast = function (params, prefixSig, sbytes) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, hash, context, forgedBytes, opResponse, transactionParams, operation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.inject(params, prefixSig, sbytes)];
                        case 1:
                            _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                            if (!params.opOb.contents) {
                                throw new Error('Invalid operation contents');
                            }
                            transactionParams = params.opOb.contents.find(function (content) { return content.kind === 'transaction'; });
                            if (!transactionParams) {
                                throw new Error('No transaction in operation contents');
                            }
                            return [4 /*yield*/, createTransferOperation(operationContentsToTransferParams(transactionParams))];
                        case 2:
                            operation = _b.sent();
                            return [2 /*return*/, new TransactionOperation(hash, operation, params.opOb.contents[0].source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        RpcContractProvider.prototype.at = function (address) {
            return __awaiter(this, void 0, void 0, function () {
                var script, entrypoints;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rpc.getScript(address)];
                        case 1:
                            script = _a.sent();
                            return [4 /*yield*/, this.rpc.getEntrypoints(address)];
                        case 2:
                            entrypoints = _a.sent();
                            return [2 /*return*/, new ContractAbstraction(address, script, this, this, entrypoints)];
                    }
                });
            });
        };
        return RpcContractProvider;
    }(OperationEmitter));
    function operationContentsToTransferParams(op) {
        return __assign({ to: op.destination, 
            // @ts-ignore
            amount: Number(op.amount), parameter: op.parameters, 
            // @ts-ignore
            fee: Number(op.fee), gasLimit: Number(op.gas_limit), storageLimit: Number(op.storage_limit) }, op);
    }
    function operationContentsToDelegateParams(op) {
        return {
            source: op.source,
            delegate: op.delegate || '',
            fee: Number(op.fee),
            gasLimit: Number(op.gas_limit),
            storageLimit: Number(op.storage_limit),
        };
    }

    var BatchOperation = /** @class */ (function (_super) {
        __extends(BatchOperation, _super);
        function BatchOperation(hash, params, source, raw, results, context) {
            var _this = _super.call(this, hash, raw, results, context) || this;
            _this.params = params;
            _this.source = source;
            return _this;
        }
        BatchOperation.prototype.sumProp = function (arr, prop) {
            return arr.reduce(function (prev, current) {
                return prop in current ? Number(current[prop]) + prev : prev;
            }, 0);
        };
        Object.defineProperty(BatchOperation.prototype, "status", {
            get: function () {
                return (this.results
                    .filter(function (result) { return BATCH_KINDS.indexOf(result.kind) !== -1; })
                    .map(function (result) {
                    if (hasMetadataWithResult(result)) {
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
        Object.defineProperty(BatchOperation.prototype, "fee", {
            get: function () {
                return this.sumProp(this.params, 'fee');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BatchOperation.prototype, "gasLimit", {
            get: function () {
                return this.sumProp(this.params, 'gas_limit');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BatchOperation.prototype, "storageLimit", {
            get: function () {
                return this.sumProp(this.params, 'storage_limit');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BatchOperation.prototype, "consumedGas", {
            get: function () {
                return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'consumed_gas'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BatchOperation.prototype, "storageDiff", {
            get: function () {
                return String(this.sumProp(flattenOperationResult({ contents: this.results }), 'paid_storage_size_diff'));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BatchOperation.prototype, "errors", {
            get: function () {
                return flattenErrors({ contents: this.results });
            },
            enumerable: false,
            configurable: true
        });
        return BatchOperation;
    }(Operation));

    var BATCH_KINDS = [
        rpc.OpKind.ACTIVATION,
        rpc.OpKind.ORIGINATION,
        rpc.OpKind.TRANSACTION,
        rpc.OpKind.DELEGATION,
    ];
    var OperationBatch = /** @class */ (function (_super) {
        __extends(OperationBatch, _super);
        function OperationBatch(context, estimator) {
            var _this = _super.call(this, context) || this;
            _this.estimator = estimator;
            _this.operations = [];
            return _this;
        }
        /**
         *
         * @description Add a transaction operation to the batch
         *
         * @param params Transfer operation parameter
         */
        OperationBatch.prototype.withTransfer = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.TRANSACTION }, params));
            return this;
        };
        /**
         *
         * @description Add a transaction operation to the batch
         *
         * @param params Transfer operation parameter
         */
        OperationBatch.prototype.withContractCall = function (params) {
            return this.withTransfer(params.toTransferParams());
        };
        /**
         *
         * @description Add a delegation operation to the batch
         *
         * @param params Delegation operation parameter
         */
        OperationBatch.prototype.withDelegation = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.DELEGATION }, params));
            return this;
        };
        /**
         *
         * @description Add an activation operation to the batch
         *
         * @param params Activation operation parameter
         */
        OperationBatch.prototype.withActivation = function (_a) {
            var pkh = _a.pkh, secret = _a.secret;
            this.operations.push({ kind: rpc.OpKind.ACTIVATION, pkh: pkh, secret: secret });
            return this;
        };
        /**
         *
         * @description Add an origination operation to the batch
         *
         * @param params Origination operation parameter
         */
        OperationBatch.prototype.withOrigination = function (params) {
            this.operations.push(__assign({ kind: rpc.OpKind.ORIGINATION }, params));
            return this;
        };
        OperationBatch.prototype.getRPCOp = function (param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (param.kind) {
                        case rpc.OpKind.TRANSACTION:
                            return [2 /*return*/, createTransferOperation(__assign({}, param))];
                        case rpc.OpKind.ORIGINATION:
                            return [2 /*return*/, createOriginationOperation(__assign({}, param))];
                        case rpc.OpKind.DELEGATION:
                            return [2 /*return*/, createSetDelegateOperation(__assign({}, param))];
                        case rpc.OpKind.ACTIVATION:
                            return [2 /*return*/, __assign({}, param)];
                        default:
                            throw new Error("Unsupported operation kind: " + param.kind);
                    }
                });
            });
        };
        /**
         *
         * @description Add a group operation to the batch. Operation will be applied in the order they are in the params array
         *
         * @param params Operations parameter
         */
        OperationBatch.prototype.with = function (params) {
            var e_1, _a;
            try {
                for (var params_1 = __values(params), params_1_1 = params_1.next(); !params_1_1.done; params_1_1 = params_1.next()) {
                    var param = params_1_1.value;
                    switch (param.kind) {
                        case rpc.OpKind.TRANSACTION:
                            this.withTransfer(param);
                            break;
                        case rpc.OpKind.ORIGINATION:
                            this.withOrigination(param);
                            break;
                        case rpc.OpKind.DELEGATION:
                            this.withDelegation(param);
                            break;
                        case rpc.OpKind.ACTIVATION:
                            this.withActivation(param);
                            break;
                        default:
                            throw new Error("Unsupported operation kind: " + param.kind);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (params_1_1 && !params_1_1.done && (_a = params_1.return)) _a.call(params_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this;
        };
        /**
         *
         * @description Forge and Inject the operation batch
         *
         * @param params Optionally specify the source of the operation
         */
        OperationBatch.prototype.send = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var estimates, ops, i, _a, _b, op, estimated, _c, _d, e_2_1, source, _e, opBytes, _f, hash, context, forgedBytes, opResponse;
                var e_2, _g;
                var _this = this;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0: return [4 /*yield*/, this.estimator.batch(this.operations)];
                        case 1:
                            estimates = _h.sent();
                            ops = [];
                            i = 0;
                            _h.label = 2;
                        case 2:
                            _h.trys.push([2, 10, 11, 12]);
                            _a = __values(this.operations), _b = _a.next();
                            _h.label = 3;
                        case 3:
                            if (!!_b.done) return [3 /*break*/, 9];
                            op = _b.value;
                            if (!isOpWithFee(op)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.estimate(op, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/, estimates[i]];
                                }); }); })];
                        case 4:
                            estimated = _h.sent();
                            _d = (_c = ops).push;
                            return [4 /*yield*/, this.getRPCOp(__assign(__assign({}, op), estimated))];
                        case 5:
                            _d.apply(_c, [_h.sent()]);
                            return [3 /*break*/, 7];
                        case 6:
                            ops.push(__assign({}, op));
                            _h.label = 7;
                        case 7:
                            i++;
                            _h.label = 8;
                        case 8:
                            _b = _a.next();
                            return [3 /*break*/, 3];
                        case 9: return [3 /*break*/, 12];
                        case 10:
                            e_2_1 = _h.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 12];
                        case 11:
                            try {
                                if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 /*endfinally*/];
                        case 12:
                            _e = (params && params.source);
                            if (_e) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.signer.publicKeyHash()];
                        case 13:
                            _e = (_h.sent());
                            _h.label = 14;
                        case 14:
                            source = _e;
                            return [4 /*yield*/, this.prepareAndForge({
                                    operation: ops,
                                    source: source,
                                })];
                        case 15:
                            opBytes = _h.sent();
                            return [4 /*yield*/, this.signAndInject(opBytes)];
                        case 16:
                            _f = _h.sent(), hash = _f.hash, context = _f.context, forgedBytes = _f.forgedBytes, opResponse = _f.opResponse;
                            return [2 /*return*/, new BatchOperation(hash, ops, source, forgedBytes, opResponse, context)];
                    }
                });
            });
        };
        return OperationBatch;
    }(OperationEmitter));
    var RPCBatchProvider = /** @class */ (function () {
        function RPCBatchProvider(context, estimator) {
            this.context = context;
            this.estimator = estimator;
        }
        /***
         *
         * @description Batch a group of operation together. Operations will be applied in the order in which they are added to the batch
         *
         * @param params List of operation to batch together
         */
        RPCBatchProvider.prototype.batch = function (params) {
            var batch = new OperationBatch(this.context, this.estimator);
            if (Array.isArray(params)) {
                batch.with(params);
            }
            return batch;
        };
        return RPCBatchProvider;
    }());

    var defaultConfig = {
        confirmationPollingIntervalSecond: 10,
        defaultConfirmationCount: 1,
        confirmationPollingTimeoutSecond: 180,
        shouldObservableSubscriptionRetry: false
    };
    /**
     * @description Encapsulate common service used throughout different part of the library
     */
    var Context = /** @class */ (function () {
        function Context(_rpc, _signer, _proto, _config, forger, injector, wallet) {
            if (_signer === void 0) { _signer = new NoopSigner(); }
            this._rpc = _rpc;
            this._signer = _signer;
            this._proto = _proto;
            this._config = _config;
            this.tz = new RpcTzProvider(this);
            this.estimate = new RPCEstimateProvider(this);
            this.contract = new RpcContractProvider(this, this.estimate);
            this.batch = new RPCBatchProvider(this, this.estimate);
            this.wallet = new Wallet(this);
            if (typeof this._rpc === 'string') {
                this._rpcClient = new rpc.RpcClient(this._rpc);
            }
            else {
                this._rpcClient = this._rpc;
            }
            this.config = _config;
            this._forger = forger ? forger : new RpcForger(this);
            this._injector = injector ? injector : new RpcInjector(this);
            this.operationFactory = new OperationFactory(this);
            this._walletProvider = wallet ? wallet : new LegacyWalletProvider(this);
        }
        Object.defineProperty(Context.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (value) {
                this._config = __assign(__assign({}, defaultConfig), value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "rpc", {
            get: function () {
                return this._rpcClient;
            },
            set: function (value) {
                this._rpcClient = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "injector", {
            get: function () {
                return this._injector;
            },
            set: function (value) {
                this._injector = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "forger", {
            get: function () {
                return this._forger;
            },
            set: function (value) {
                this._forger = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "signer", {
            get: function () {
                return this._signer;
            },
            set: function (value) {
                this._signer = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "walletProvider", {
            get: function () {
                return this._walletProvider;
            },
            set: function (value) {
                this._walletProvider = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Context.prototype, "proto", {
            get: function () {
                return this._proto;
            },
            set: function (value) {
                this._proto = value;
            },
            enumerable: false,
            configurable: true
        });
        Context.prototype.isAnyProtocolActive = function (protocol) {
            if (protocol === void 0) { protocol = []; }
            return __awaiter(this, void 0, void 0, function () {
                var next_protocol;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._proto) return [3 /*break*/, 1];
                            return [2 /*return*/, protocol.includes(this._proto)];
                        case 1: return [4 /*yield*/, this.rpc.getBlockMetadata()];
                        case 2:
                            next_protocol = (_a.sent()).next_protocol;
                            return [2 /*return*/, protocol.includes(next_protocol)];
                    }
                });
            });
        };
        /**
         * @description Create a copy of the current context. Useful when you have long running operation and you do not want a context change to affect the operation
         */
        Context.prototype.clone = function () {
            return new Context(this.rpc, this.signer, this.proto, this.config, this.forger, this._injector);
        };
        return Context;
    }());

    var opHashFilter = function (op, filter) { return op.hash === filter.opHash; };
    var sourceFilter = function (x, filter) {
        switch (x.kind) {
            case 'endorsement':
                return 'metadata' in x && x.metadata.delegate === filter.source;
            case 'activate_account':
                return 'metadata' in x && x.pkh === filter.source;
            default:
                return 'source' in x && x.source === filter.source;
        }
    };
    var kindFilter = function (x, filter) { return 'kind' in x && x.kind === filter.kind; };
    var destinationFilter = function (x, filter) {
        switch (x.kind) {
            case 'delegation':
                return x.delegate === filter.destination;
            case 'origination':
                if ('metadata' in x &&
                    'operation_result' in x.metadata &&
                    'originated_contracts' in x.metadata.operation_result &&
                    Array.isArray(x.metadata.operation_result.originated_contracts)) {
                    return x.metadata.operation_result.originated_contracts.some(function (contract) { return contract === filter.destination; });
                }
                break;
            case 'transaction':
                return x.destination === filter.destination;
            default:
                return false;
        }
    };
    var evaluateOpFilter = function (op, filter) {
        if ('opHash' in filter) {
            return opHashFilter(op, filter);
        }
        else if ('source' in filter) {
            return sourceFilter(op, filter);
        }
        else if ('kind' in filter) {
            return kindFilter(op, filter);
        }
        else if ('destination' in filter) {
            return destinationFilter(op, filter);
        }
        return false;
    };
    var evaluateExpression = function (op, exp) {
        if (Array.isArray(exp.and)) {
            return exp.and.every(function (x) { return evaluateFilter(op, x); });
        }
        else if (Array.isArray(exp.or)) {
            return exp.or.some(function (x) { return evaluateFilter(op, x); });
        }
        else {
            throw new Error('Filter expression must contains either and/or property');
        }
    };
    var evaluateFilter = function (op, filter) {
        var filters = [];
        if (!Array.isArray(filter)) {
            filters.push(filter);
        }
        else {
            filters.push.apply(filters, __spread(filter));
        }
        return filters.every(function (filterOrExp) {
            if ('and' in filterOrExp || 'or' in filterOrExp) {
                return evaluateExpression(op, filterOrExp);
            }
            else {
                return evaluateOpFilter(op, filterOrExp);
            }
        });
    };

    var ObservableSubscription = /** @class */ (function () {
        function ObservableSubscription(obs, shouldRetry) {
            var _this = this;
            if (shouldRetry === void 0) { shouldRetry = false; }
            this.shouldRetry = shouldRetry;
            this.errorListeners = [];
            this.messageListeners = [];
            this.closeListeners = [];
            this.completed$ = new rxjs.Subject();
            obs
                .pipe(operators.takeUntil(this.completed$), operators.tap(function (data) {
                _this.call(_this.messageListeners, data);
            }, function (error) {
                _this.call(_this.errorListeners, error);
            }, function () {
                _this.call(_this.closeListeners);
            }), this.shouldRetry ? operators.retry() : operators.tap(), operators.catchError(function () { return rxjs.NEVER; }))
                .subscribe();
        }
        ObservableSubscription.prototype.call = function (listeners, value) {
            var e_1, _a;
            try {
                for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                    var l = listeners_1_1.value;
                    try {
                        l(value);
                    }
                    catch (ex) {
                        console.error(ex);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        ObservableSubscription.prototype.remove = function (listeners, value) {
            var idx = listeners.indexOf(value);
            if (idx !== -1) {
                listeners.splice(idx, 1);
            }
        };
        ObservableSubscription.prototype.on = function (type, cb) {
            switch (type) {
                case 'data':
                    this.messageListeners.push(cb);
                    break;
                case 'error':
                    this.errorListeners.push(cb);
                    break;
                case 'close':
                    this.closeListeners.push(cb);
                    break;
                default:
                    throw new Error("Trying to register on an unsupported event: " + type);
            }
        };
        ObservableSubscription.prototype.off = function (type, cb) {
            switch (type) {
                case 'data':
                    this.remove(this.messageListeners, cb);
                    break;
                case 'error':
                    this.remove(this.errorListeners, cb);
                    break;
                case 'close':
                    this.remove(this.closeListeners, cb);
                    break;
                default:
                    throw new Error("Trying to unregister on an unsupported event: " + type);
            }
        };
        ObservableSubscription.prototype.close = function () {
            this.completed$.next();
        };
        return ObservableSubscription;
    }());

    var getLastBlock = function (context) {
        return rxjs.from(context.rpc.getBlock()).pipe(operators.first());
    };
    var applyFilter = function (filter) {
        return operators.concatMap(function (block) {
            return new rxjs.Observable(function (sub) {
                var e_1, _a, e_2, _b, e_3, _c;
                try {
                    for (var _d = __values(block.operations), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var ops = _e.value;
                        try {
                            for (var ops_1 = (e_2 = void 0, __values(ops)), ops_1_1 = ops_1.next(); !ops_1_1.done; ops_1_1 = ops_1.next()) {
                                var op = ops_1_1.value;
                                try {
                                    for (var _f = (e_3 = void 0, __values(op.contents)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                        var content = _g.value;
                                        if (evaluateFilter(__assign({ hash: op.hash }, content), filter)) {
                                            sub.next(__assign({ hash: op.hash }, content));
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (ops_1_1 && !ops_1_1.done && (_b = ops_1.return)) _b.call(ops_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                sub.complete();
            });
        });
    };
    var PollingSubscribeProvider = /** @class */ (function () {
        function PollingSubscribeProvider(context, POLL_INTERVAL) {
            var _this = this;
            if (POLL_INTERVAL === void 0) { POLL_INTERVAL = 20000; }
            this.context = context;
            this.POLL_INTERVAL = POLL_INTERVAL;
            this.newBlock$ = rxjs.timer(0, this.POLL_INTERVAL).pipe(operators.map(function () { return _this.context; }), operators.switchMap(getLastBlock), operators.distinctUntilKeyChanged('hash'));
        }
        PollingSubscribeProvider.prototype.subscribe = function (_filter) {
            return new ObservableSubscription(this.newBlock$.pipe(operators.pluck('hash')), this.context.config.shouldObservableSubscriptionRetry);
        };
        PollingSubscribeProvider.prototype.subscribeOperation = function (filter) {
            return new ObservableSubscription(this.newBlock$.pipe(applyFilter(filter)), this.context.config.shouldObservableSubscriptionRetry);
        };
        return PollingSubscribeProvider;
    }());

    var ForgingMismatchError = /** @class */ (function () {
        function ForgingMismatchError(results) {
            this.results = results;
            this.name = 'ForgingMismatchError';
            this.message = 'Forging mismatch error';
        }
        return ForgingMismatchError;
    }());
    var CompositeForger = /** @class */ (function () {
        function CompositeForger(forgers) {
            this.forgers = forgers;
            if (forgers.length === 0) {
                throw new Error('At least one forger must be specified');
            }
        }
        CompositeForger.prototype.forge = function (_a) {
            var branch = _a.branch, contents = _a.contents;
            return __awaiter(this, void 0, void 0, function () {
                var results, lastResult, currentResult;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all(this.forgers.map(function (forger) {
                                return forger.forge({ branch: branch, contents: contents });
                            }))];
                        case 1:
                            results = _b.sent();
                            if (results.length === 0) {
                                throw new Error('At least one forger must be specified');
                            }
                            lastResult = results.pop();
                            while (results.length) {
                                currentResult = results.pop();
                                if (currentResult !== lastResult) {
                                    throw new ForgingMismatchError([lastResult, currentResult]);
                                }
                                lastResult = currentResult;
                            }
                            return [2 /*return*/, lastResult];
                    }
                });
            });
        };
        return CompositeForger;
    }());

    /**
     * @description Facade class that surfaces all of the libraries capability and allow it's configuration
     *
     * @param _rpc The RPC server to use
     */
    var TezosToolkit = /** @class */ (function () {
        function TezosToolkit(_rpc, _context) {
            if (_context === void 0) { _context = new Context(_rpc); }
            this._rpc = _rpc;
            this._context = _context;
            this._options = {};
            this.format = format;
            this.batch = this._context.batch.batch.bind(this._context.batch);
            if (typeof this._rpc === 'string') {
                this._rpcClient = new rpc.RpcClient(this._rpc);
            }
            else {
                this._rpcClient = this._rpc;
            }
            this._wallet = new Wallet(this._context);
            this.setProvider({ rpc: this._rpcClient });
        }
        /**
         * @description Sets configuration on the Tezos Taquito instance. Allows user to choose which signer, rpc client, rpc url, forger and so forth
         *
         * @param options rpc url or rpcClient to use to interact with the Tezos network
         *
         * @example Tezos.setProvider({rpc: 'https://api.tez.ie/rpc/mainnet', signer: new InMemorySigner.fromSecretKey(“edsk...”)})
         * @example Tezos.setProvider({ config: { confirmationPollingTimeoutSecond: 300 }})
         *
         */
        TezosToolkit.prototype.setProvider = function (_a) {
            var rpc = _a.rpc, stream = _a.stream, signer = _a.signer, protocol = _a.protocol, config = _a.config, forger = _a.forger, wallet = _a.wallet;
            this.setRpcProvider(rpc);
            this.setStreamProvider(stream);
            this.setSignerProvider(signer);
            this.setForgerProvider(forger);
            this.setWalletProvider(wallet);
            this._context.proto = protocol;
            this._context.config = config;
        };
        /**
         * @description Sets signer provider on the Tezos Taquito instance.
         *
         * @param options signer to use to interact with the Tezos network
         *
         * @example Tezos.setSignerProvider(new InMemorySigner.fromSecretKey('edsk...'))
         *
         */
        TezosToolkit.prototype.setSignerProvider = function (signer) {
            if (!this._options.signer && typeof signer === 'undefined') {
                this._context.signer = new NoopSigner();
                this._options.signer = signer;
            }
            else if (typeof signer !== 'undefined') {
                this._context.signer = signer;
                this._options.signer = signer;
            }
        };
        /**
         * @description Sets rpc provider on the Tezos Taquito instance
         *
         * @param options rpc url or rpcClient to use to interact with the Tezos network
         *
         * @example Tezos.setRpcProvider('https://api.tez.ie/rpc/mainnet')
         *
         */
        TezosToolkit.prototype.setRpcProvider = function (rpc$1) {
            if (typeof rpc$1 === 'string') {
                this._rpcClient = new rpc.RpcClient(rpc$1);
            }
            else if (rpc$1 instanceof rpc.RpcClient) {
                this._rpcClient = rpc$1;
            }
            /*     else if (this._options.rpc === undefined) {
                  this._rpcClient = new RpcClient();
                } */
            this._options.rpc = this._rpcClient;
            this._context.rpc = this._rpcClient;
        };
        /**
         * @description Sets forger provider on the Tezos Taquito instance
         *
         * @param options forger to use to interact with the Tezos network
         *
         * @example Tezos.setForgerProvider(localForger)
         *
         */
        TezosToolkit.prototype.setForgerProvider = function (forger) {
            var f = typeof forger === 'undefined' ? this.getFactory(RpcForger)() : forger;
            this._options.forger = f;
            this._context.forger = f;
        };
        /**
         * @description Sets stream provider on the Tezos Taquito instance
         *
         * @param options stream to use to interact with the Tezos network
         *
         * @example Tezos.setStreamProvider(...)
         *
         */
        TezosToolkit.prototype.setStreamProvider = function (stream) {
            if (typeof stream === 'string') {
                this._stream = new PollingSubscribeProvider(new Context(new rpc.RpcClient(stream)));
            }
            else if (typeof stream !== 'undefined') {
                this._stream = stream;
            }
            else if (this._options.stream === undefined) {
                this._stream = this.getFactory(PollingSubscribeProvider)();
            }
            this._options.stream = stream;
        };
        /**
         * @description Sets wallet provider on the Tezos Taquito instance
         *
         * @param options wallet to use to interact with the Tezos network
         *
         * @example Tezos.setWalletProvider(...)
         *
         */
        TezosToolkit.prototype.setWalletProvider = function (wallet) {
            if (!this._options.wallet && typeof wallet === 'undefined') {
                var w = this.getFactory(LegacyWalletProvider)();
                this._options.wallet = w;
                this._context.walletProvider = w;
            }
            else if (typeof wallet !== 'undefined') {
                this._options.wallet = wallet;
                this._context.walletProvider = wallet;
            }
        };
        Object.defineProperty(TezosToolkit.prototype, "tz", {
            /**
             * @description Provide access to tezos account management
             */
            get: function () {
                return this._context.tz;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "contract", {
            /**
             * @description Provide access to smart contract utilities
             */
            get: function () {
                return this._context.contract;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "wallet", {
            get: function () {
                return this._wallet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "operation", {
            get: function () {
                return this._context.operationFactory;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "estimate", {
            /**
             * @description Provide access to operation estimation utilities
             */
            get: function () {
                return this._context.estimate;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "stream", {
            /**
             * @description Provide access to streaming utilities backed by an streamer implementation
             */
            get: function () {
                return this._stream;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "rpc", {
            /**
             * @description Provide access to the currently used rpc client
             */
            get: function () {
                return this._context.rpc;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TezosToolkit.prototype, "signer", {
            /**
             * @description Provide access to the currently used signer
             */
            get: function () {
                return this._context.signer;
            },
            enumerable: false,
            configurable: true
        });
        TezosToolkit.prototype.getFactory = function (ctor) {
            var _this = this;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return new (ctor.bind.apply(ctor, __spread([void 0, _this._context], args)))();
            };
        };
        return TezosToolkit;
    }());

    Object.defineProperty(exports, 'OpKind', {
        enumerable: true,
        get: function () {
            return rpc.OpKind;
        }
    });
    Object.defineProperty(exports, 'MichelsonMap', {
        enumerable: true,
        get: function () {
            return michelsonEncoder.MichelsonMap;
        }
    });
    Object.defineProperty(exports, 'UnitValue', {
        enumerable: true,
        get: function () {
            return michelsonEncoder.UnitValue;
        }
    });
    exports.BigMapAbstraction = BigMapAbstraction;
    exports.CompositeForger = CompositeForger;
    exports.Context = Context;
    exports.ContractAbstraction = ContractAbstraction;
    exports.ContractMethod = ContractMethod;
    exports.DelegationWalletOperation = DelegationWalletOperation;
    exports.InvalidDelegationSource = InvalidDelegationSource;
    exports.InvalidParameterError = InvalidParameterError;
    exports.LegacyWalletProvider = LegacyWalletProvider;
    exports.MANAGER_LAMBDA = MANAGER_LAMBDA;
    exports.MissedBlockDuringConfirmationError = MissedBlockDuringConfirmationError;
    exports.OriginationWalletOperation = OriginationWalletOperation;
    exports.PollingSubscribeProvider = PollingSubscribeProvider;
    exports.RpcForger = RpcForger;
    exports.TezosOperationError = TezosOperationError;
    exports.TezosPreapplyFailureError = TezosPreapplyFailureError;
    exports.TezosToolkit = TezosToolkit;
    exports.TransactionWalletOperation = TransactionWalletOperation;
    exports.Wallet = Wallet;
    exports.WalletOperation = WalletOperation;
    exports.WalletOperationBatch = WalletOperationBatch;
    exports.createOriginationOperation = createOriginationOperation;
    exports.createRegisterDelegateOperation = createRegisterDelegateOperation;
    exports.createSetDelegateOperation = createSetDelegateOperation;
    exports.createTransferOperation = createTransferOperation;
    exports.defaultConfig = defaultConfig;
    exports.protocols = protocols;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taquito.umd.js.map
