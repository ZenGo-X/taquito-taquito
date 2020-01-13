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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var operation_emitter_1 = require("../operations/operation-emitter");
var estimate_1 = require("./estimate");
var prepare_1 = require("./prepare");
// RPC require a signature but do not verify it
var SIGNATURE_STUB = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg';
var RPCEstimateProvider = /** @class */ (function (_super) {
    __extends(RPCEstimateProvider, _super);
    function RPCEstimateProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Maximum values defined by the protocol
        _this.DEFAULT_PARAMS = {
            fee: 30000,
            storageLimit: 60000,
            gasLimit: 800000,
        };
        return _this;
    }
    RPCEstimateProvider.prototype.getOperationResult = function (opResponse, kind) {
        var results = opResponse.contents;
        var originationOp = Array.isArray(results) && results.find(function (op) { return op.kind === kind; });
        var opResult = originationOp && originationOp.metadata && originationOp.metadata.operation_result;
        var internalResult = originationOp && originationOp.metadata && originationOp.metadata.internal_operation_results;
        return __spreadArrays([opResult], (internalResult || []).map(function (_a) {
            var result = _a.result;
            return result;
        })).filter(function (x) { return !!x; });
    };
    RPCEstimateProvider.prototype.createEstimate = function (params, kind, defaultStorage, minimumGas) {
        if (minimumGas === void 0) { minimumGas = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, opbytes, _b, branch, contents, operation, _c, opResponse, operationResults, totalGas, totalStorage;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.prepareAndForge(params)];
                    case 1:
                        _a = _d.sent(), opbytes = _a.opbytes, _b = _a.opOb, branch = _b.branch, contents = _b.contents;
                        operation = { branch: branch, contents: contents, signature: SIGNATURE_STUB };
                        return [4 /*yield*/, this.context.isAnyProtocolActive(constants_1.protocols['005'])];
                    case 2:
                        if (!_d.sent()) return [3 /*break*/, 4];
                        _c = { operation: operation };
                        return [4 /*yield*/, this.rpc.getChainId()];
                    case 3:
                        operation = (_c.chain_id = _d.sent(), _c);
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.simulate(operation)];
                    case 5:
                        opResponse = (_d.sent()).opResponse;
                        operationResults = this.getOperationResult(opResponse, kind);
                        totalGas = 0;
                        totalStorage = 0;
                        operationResults.forEach(function (result) {
                            totalGas += Number(result.consumed_gas) || 0;
                            totalStorage +=
                                'paid_storage_size_diff' in result ? Number(result.paid_storage_size_diff) || 0 : 0;
                        });
                        return [2 /*return*/, new estimate_1.Estimate(Math.max(totalGas || 0, minimumGas), Number(totalStorage || 0) + defaultStorage, opbytes.length / 2)];
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
            var pkh, op;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _b.sent();
                        return [4 /*yield*/, prepare_1.createOriginationOperation(__assign(__assign({}, rest), this.DEFAULT_PARAMS), pkh)];
                    case 2:
                        op = _b.sent();
                        return [2 /*return*/, this.createEstimate({ operation: op, source: pkh }, 'origination', constants_1.DEFAULT_STORAGE_LIMIT.ORIGINATION)];
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
            var pkh, op;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        pkh = _b.sent();
                        return [4 /*yield*/, prepare_1.createTransferOperation(__assign(__assign({}, rest), this.DEFAULT_PARAMS))];
                    case 2:
                        op = _b.sent();
                        return [2 /*return*/, this.createEstimate({ operation: op, source: pkh }, 'transaction', typeof storageLimit === 'number' ? storageLimit : constants_1.DEFAULT_STORAGE_LIMIT.TRANSFER)];
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
    RPCEstimateProvider.prototype.setDelegate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var op, sourceOrDefault, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prepare_1.createSetDelegateOperation(__assign(__assign({}, params), this.DEFAULT_PARAMS))];
                    case 1:
                        op = _b.sent();
                        _a = params.source;
                        if (_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        sourceOrDefault = _a;
                        return [2 /*return*/, this.createEstimate({ operation: op, source: sourceOrDefault }, 'delegation', constants_1.DEFAULT_STORAGE_LIMIT.DELEGATION, 
                            // Delegation have a minimum gas cost
                            constants_1.DEFAULT_GAS_LIMIT.DELEGATION)];
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
            var op, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = prepare_1.createRegisterDelegateOperation;
                        _b = [__assign(__assign({}, params), this.DEFAULT_PARAMS)];
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_e.sent()]))];
                    case 2:
                        op = _e.sent();
                        _c = this.createEstimate;
                        _d = { operation: op };
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 3: return [2 /*return*/, _c.apply(this, [(_d.source = _e.sent(), _d), 'delegation',
                            constants_1.DEFAULT_STORAGE_LIMIT.DELEGATION,
                            // Delegation have a minimum gas cost
                            constants_1.DEFAULT_GAS_LIMIT.DELEGATION])];
                }
            });
        });
    };
    return RPCEstimateProvider;
}(operation_emitter_1.OperationEmitter));
exports.RPCEstimateProvider = RPCEstimateProvider;
//# sourceMappingURL=rpc-estimate-provider.js.map