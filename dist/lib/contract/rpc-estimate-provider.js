"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
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
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
exports.RPCEstimateProvider = void 0;
var rpc_1 = require("@taquito/rpc");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("../constants");
var operation_emitter_1 = require("../operations/operation-emitter");
var operation_errors_1 = require("../operations/operation-errors");
var types_1 = require("../operations/types");
var estimate_1 = require("./estimate");
var prepare_1 = require("./prepare");
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
        _this.OP_SIZE_REVEAL = 128;
        return _this;
    }
    // Maximum values defined by the protocol
    RPCEstimateProvider.prototype.getAccountLimits = function (pkh, numberOfOps) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, _a, hard_gas_limit_per_operation, hard_gas_limit_per_block, hard_storage_limit_per_operation, cost_per_byte;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rpc.getBalance(pkh)];
                    case 1:
                        balance = _b.sent();
                        return [4 /*yield*/, this.rpc.getConstants()];
                    case 2:
                        _a = _b.sent(), hard_gas_limit_per_operation = _a.hard_gas_limit_per_operation, hard_gas_limit_per_block = _a.hard_gas_limit_per_block, hard_storage_limit_per_operation = _a.hard_storage_limit_per_operation, cost_per_byte = _a.cost_per_byte;
                        return [2 /*return*/, {
                                fee: 0,
                                gasLimit: numberOfOps
                                    ? Math.floor(this.ajustGasForBatchOperation(hard_gas_limit_per_block, hard_gas_limit_per_operation, numberOfOps).toNumber())
                                    : hard_gas_limit_per_operation.toNumber(),
                                storageLimit: Math.floor(bignumber_js_1.default.min(balance.dividedBy(cost_per_byte), hard_storage_limit_per_operation).toNumber()),
                            }];
                }
            });
        });
    };
    // Fix for Granada where the total gasLimit of a batch can not exceed the hard_gas_limit_per_block.
    // If the total gasLimit of the batch is higher than the hard_gas_limit_per_block,
    // the gasLimit is calculated by dividing the hard_gas_limit_per_block by the number of operation in the batch (numberOfOps).
    // numberOfOps is incremented by 1 for safety in case a reveal operation is needed
    RPCEstimateProvider.prototype.ajustGasForBatchOperation = function (gasLimitBlock, gaslimitOp, numberOfOps) {
        return bignumber_js_1.default.min(gaslimitOp, gasLimitBlock.div(numberOfOps + 1));
    };
    RPCEstimateProvider.prototype.getEstimationPropertiesFromOperationContent = function (content, size, costPerByte) {
        var _this = this;
        var operationResults = operation_errors_1.flattenOperationResult({ contents: [content] });
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
        if (types_1.isOpWithFee(content)) {
            return {
                milligasLimit: totalMilligas || 0,
                storageLimit: Number(totalStorage || 0),
                opSize: size,
                minimalFeePerStorageByteMutez: costPerByte.toNumber(),
            };
        }
        else {
            return {
                milligasLimit: 0,
                storageLimit: 0,
                opSize: size,
                minimalFeePerStorageByteMutez: costPerByte.toNumber(),
                baseFeeMutez: 0,
            };
        }
    };
    RPCEstimateProvider.prototype.prepareEstimate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var prepared, _a, opbytes, _b, branch, contents, operation, opResponse, cost_per_byte, errors, numberOfOps;
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.prepareOperation(params)];
                    case 1:
                        prepared = _d.sent();
                        return [4 /*yield*/, this.forge(prepared)];
                    case 2:
                        _a = _d.sent(), opbytes = _a.opbytes, _b = _a.opOb, branch = _b.branch, contents = _b.contents;
                        _c = {
                            operation: { branch: branch, contents: contents, signature: SIGNATURE_STUB }
                        };
                        return [4 /*yield*/, this.rpc.getChainId()];
                    case 3:
                        operation = (_c.chain_id = _d.sent(),
                            _c);
                        return [4 /*yield*/, this.simulate(operation)];
                    case 4:
                        opResponse = (_d.sent()).opResponse;
                        return [4 /*yield*/, this.rpc.getConstants()];
                    case 5:
                        cost_per_byte = (_d.sent()).cost_per_byte;
                        errors = __spreadArray(__spreadArray([], __read(operation_errors_1.flattenErrors(opResponse, 'backtracked'))), __read(operation_errors_1.flattenErrors(opResponse)));
                        // Fail early in case of errors
                        if (errors.length) {
                            throw new operation_errors_1.TezosOperationError(errors);
                        }
                        numberOfOps = 1;
                        if (Array.isArray(params.operation) && params.operation.length > 1) {
                            numberOfOps =
                                opResponse.contents[0].kind === 'reveal'
                                    ? params.operation.length - 1
                                    : params.operation.length;
                        }
                        return [2 /*return*/, opResponse.contents.map(function (x) {
                                return _this.getEstimationPropertiesFromOperationContent(x, 
                                // TODO: Calculate a specific opSize for each operation.
                                x.kind === 'reveal' ? _this.OP_SIZE_REVEAL / 2 : opbytes.length / 2 / numberOfOps, cost_per_byte);
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
            var pkh, DEFAULT_PARAMS, op, _b, isRevealNeeded, ops, _c, estimateProperties;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _d.sent();
                        return [4 /*yield*/, this.getAccountLimits(pkh)];
                    case 2:
                        DEFAULT_PARAMS = _d.sent();
                        _b = prepare_1.createOriginationOperation;
                        return [4 /*yield*/, this.context.parser.prepareCodeOrigination(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                    case 3: return [4 /*yield*/, _b.apply(void 0, [_d.sent()])];
                    case 4:
                        op = _d.sent();
                        return [4 /*yield*/, this.isRevealOpNeeded([op], pkh)];
                    case 5:
                        isRevealNeeded = _d.sent();
                        if (!isRevealNeeded) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.addRevealOp([op], pkh)];
                    case 6:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _c = op;
                        _d.label = 8;
                    case 8:
                        ops = _c;
                        return [4 /*yield*/, this.prepareEstimate({ operation: ops, source: pkh })];
                    case 9:
                        estimateProperties = _d.sent();
                        if (isRevealNeeded) {
                            estimateProperties.shift();
                        }
                        return [2 /*return*/, estimate_1.Estimate.createEstimateInstanceFromProperties(estimateProperties)];
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
            var pkh, DEFAULT_PARAMS, op, isRevealNeeded, ops, _b, estimateProperties;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _c.sent();
                        return [4 /*yield*/, this.getAccountLimits(pkh)];
                    case 2:
                        DEFAULT_PARAMS = _c.sent();
                        return [4 /*yield*/, prepare_1.createTransferOperation(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                    case 3:
                        op = _c.sent();
                        return [4 /*yield*/, this.isRevealOpNeeded([op], pkh)];
                    case 4:
                        isRevealNeeded = _c.sent();
                        if (!isRevealNeeded) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.addRevealOp([op], pkh)];
                    case 5:
                        _b = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = op;
                        _c.label = 7;
                    case 7:
                        ops = _b;
                        return [4 /*yield*/, this.prepareEstimate({ operation: ops, source: pkh })];
                    case 8:
                        estimateProperties = _c.sent();
                        if (isRevealNeeded) {
                            estimateProperties.shift();
                        }
                        return [2 /*return*/, estimate_1.Estimate.createEstimateInstanceFromProperties(estimateProperties)];
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
            var pkh, sourceOrDefault, DEFAULT_PARAMS, op, isRevealNeeded, ops, _b, estimateProperties;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _c.sent();
                        sourceOrDefault = rest.source || pkh;
                        return [4 /*yield*/, this.getAccountLimits(sourceOrDefault)];
                    case 2:
                        DEFAULT_PARAMS = _c.sent();
                        return [4 /*yield*/, prepare_1.createSetDelegateOperation(__assign(__assign({}, rest), mergeLimits({ fee: fee, storageLimit: storageLimit, gasLimit: gasLimit }, DEFAULT_PARAMS)))];
                    case 3:
                        op = _c.sent();
                        return [4 /*yield*/, this.isRevealOpNeeded([op], pkh)];
                    case 4:
                        isRevealNeeded = _c.sent();
                        if (!isRevealNeeded) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.addRevealOp([op], pkh)];
                    case 5:
                        _b = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = op;
                        _c.label = 7;
                    case 7:
                        ops = _b;
                        return [4 /*yield*/, this.prepareEstimate({ operation: ops, source: pkh })];
                    case 8:
                        estimateProperties = _c.sent();
                        if (isRevealNeeded) {
                            estimateProperties.shift();
                        }
                        return [2 /*return*/, estimate_1.Estimate.createEstimateInstanceFromProperties(estimateProperties)];
                }
            });
        });
    };
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a each operation in the batch
     *
     * @returns An array of Estimate objects. If a reveal operation is needed, the first element of the array is the Estimate for the reveal operation.
     */
    RPCEstimateProvider.prototype.batch = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pkh, operations, DEFAULT_PARAMS, params_1, params_1_1, param, _a, _b, _c, _d, _e, _f, _g, _h, e_1_1, isRevealNeeded, _j, estimateProperties;
            var e_1, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _l.sent();
                        operations = [];
                        return [4 /*yield*/, this.getAccountLimits(pkh, params.length)];
                    case 2:
                        DEFAULT_PARAMS = _l.sent();
                        _l.label = 3;
                    case 3:
                        _l.trys.push([3, 16, 17, 18]);
                        params_1 = __values(params), params_1_1 = params_1.next();
                        _l.label = 4;
                    case 4:
                        if (!!params_1_1.done) return [3 /*break*/, 15];
                        param = params_1_1.value;
                        _a = param.kind;
                        switch (_a) {
                            case rpc_1.OpKind.TRANSACTION: return [3 /*break*/, 5];
                            case rpc_1.OpKind.ORIGINATION: return [3 /*break*/, 7];
                            case rpc_1.OpKind.DELEGATION: return [3 /*break*/, 10];
                            case rpc_1.OpKind.ACTIVATION: return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 13];
                    case 5:
                        _c = (_b = operations).push;
                        return [4 /*yield*/, prepare_1.createTransferOperation(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                    case 6:
                        _c.apply(_b, [_l.sent()]);
                        return [3 /*break*/, 14];
                    case 7:
                        _e = (_d = operations).push;
                        _f = prepare_1.createOriginationOperation;
                        return [4 /*yield*/, this.context.parser.prepareCodeOrigination(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                    case 8: return [4 /*yield*/, _f.apply(void 0, [_l.sent()])];
                    case 9:
                        _e.apply(_d, [_l.sent()]);
                        return [3 /*break*/, 14];
                    case 10:
                        _h = (_g = operations).push;
                        return [4 /*yield*/, prepare_1.createSetDelegateOperation(__assign(__assign({}, param), mergeLimits(param, DEFAULT_PARAMS)))];
                    case 11:
                        _h.apply(_g, [_l.sent()]);
                        return [3 /*break*/, 14];
                    case 12:
                        operations.push(__assign(__assign({}, param), DEFAULT_PARAMS));
                        return [3 /*break*/, 14];
                    case 13: throw new Error("Unsupported operation kind: " + param.kind);
                    case 14:
                        params_1_1 = params_1.next();
                        return [3 /*break*/, 4];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        e_1_1 = _l.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 18];
                    case 17:
                        try {
                            if (params_1_1 && !params_1_1.done && (_k = params_1.return)) _k.call(params_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 18: return [4 /*yield*/, this.isRevealOpNeeded(operations, pkh)];
                    case 19:
                        isRevealNeeded = _l.sent();
                        if (!isRevealNeeded) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.addRevealOp(operations, pkh)];
                    case 20:
                        _j = _l.sent();
                        return [3 /*break*/, 22];
                    case 21:
                        _j = operations;
                        _l.label = 22;
                    case 22:
                        operations = _j;
                        return [4 /*yield*/, this.prepareEstimate({ operation: operations, source: pkh })];
                    case 23:
                        estimateProperties = _l.sent();
                        return [2 /*return*/, estimate_1.Estimate.createArrayEstimateInstancesFromProperties(estimateProperties)];
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
            var pkh, DEFAULT_PARAMS, op, isRevealNeeded, ops, _a, estimateProperties;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _b.sent();
                        return [4 /*yield*/, this.getAccountLimits(pkh)];
                    case 2:
                        DEFAULT_PARAMS = _b.sent();
                        return [4 /*yield*/, prepare_1.createRegisterDelegateOperation(__assign(__assign({}, params), DEFAULT_PARAMS), pkh)];
                    case 3:
                        op = _b.sent();
                        return [4 /*yield*/, this.isRevealOpNeeded([op], pkh)];
                    case 4:
                        isRevealNeeded = _b.sent();
                        if (!isRevealNeeded) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.addRevealOp([op], pkh)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _a = op;
                        _b.label = 7;
                    case 7:
                        ops = _a;
                        return [4 /*yield*/, this.prepareEstimate({ operation: ops, source: pkh })];
                    case 8:
                        estimateProperties = _b.sent();
                        if (isRevealNeeded) {
                            estimateProperties.shift();
                        }
                        return [2 /*return*/, estimate_1.Estimate.createEstimateInstanceFromProperties(estimateProperties)];
                }
            });
        });
    };
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees to reveal the current account
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation or undefined if the account is already revealed
     *
     * @param Estimate
     */
    RPCEstimateProvider.prototype.reveal = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pkh, DEFAULT_PARAMS, op, _a, _b, estimateProperties;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _c.sent();
                        return [4 /*yield*/, this.isAccountRevealRequired(pkh)];
                    case 2:
                        if (!_c.sent()) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccountLimits(pkh)];
                    case 3:
                        DEFAULT_PARAMS = _c.sent();
                        _a = prepare_1.createRevealOperation;
                        _b = [__assign(__assign({}, params), DEFAULT_PARAMS), pkh];
                        return [4 /*yield*/, this.signer.publicKey()];
                    case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 5:
                        op = _c.sent();
                        return [4 /*yield*/, this.prepareEstimate({ operation: op, source: pkh })];
                    case 6:
                        estimateProperties = _c.sent();
                        return [2 /*return*/, estimate_1.Estimate.createEstimateInstanceFromProperties(estimateProperties)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    RPCEstimateProvider.prototype.addRevealOp = function (op, pkh) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = op).unshift;
                        _c = prepare_1.createRevealOperation;
                        _d = [__assign({
                                fee: constants_1.DEFAULT_FEE.REVEAL,
                                gasLimit: constants_1.DEFAULT_GAS_LIMIT.REVEAL,
                                storageLimit: constants_1.DEFAULT_STORAGE_LIMIT.REVEAL,
                            }), pkh];
                        return [4 /*yield*/, this.signer.publicKey()];
                    case 1: return [4 /*yield*/, _c.apply(void 0, _d.concat([_e.sent()]))];
                    case 2:
                        _b.apply(_a, [_e.sent()]);
                        return [2 /*return*/, op];
                }
            });
        });
    };
    return RPCEstimateProvider;
}(operation_emitter_1.OperationEmitter));
exports.RPCEstimateProvider = RPCEstimateProvider;
//# sourceMappingURL=rpc-estimate-provider.js.map