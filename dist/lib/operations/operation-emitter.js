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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationEmitter = void 0;
var rpc_1 = require("@taquito/rpc");
var constants_1 = require("../constants");
var operation_errors_1 = require("./operation-errors");
var types_1 = require("./types");
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
    OperationEmitter.prototype.isRevealOpNeeded = function (op, pkh) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isAccountRevealRequired(pkh)];
                    case 1: return [2 /*return*/, (!(_a.sent()) || !this.isRevealRequiredForOpType(op)) ? false : true];
                }
            });
        });
    };
    OperationEmitter.prototype.isAccountRevealRequired = function (publicKeyHash) {
        return __awaiter(this, void 0, void 0, function () {
            var manager, haveManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rpc.getManagerKey(publicKeyHash)];
                    case 1:
                        manager = _a.sent();
                        haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
                        return [2 /*return*/, !haveManager];
                }
            });
        });
    };
    OperationEmitter.prototype.isRevealRequiredForOpType = function (op) {
        var e_1, _a;
        var opRequireReveal = false;
        try {
            for (var op_1 = __values(op), op_1_1 = op_1.next(); !op_1_1.done; op_1_1 = op_1.next()) {
                var operation = op_1_1.value;
                if (types_1.isOpRequireReveal(operation)) {
                    opRequireReveal = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (op_1_1 && !op_1_1.done && (_a = op_1.return)) _a.call(op_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return opRequireReveal;
    };
    ;
    // Originally from sotez (Copyright (c) 2018 Andrew Kishino)
    OperationEmitter.prototype.prepareOperation = function (_a) {
        var operation = _a.operation, source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var counter, counters, ops, head, blockHeaderPromise, blockMetaPromise, publicKeyHash, counterPromise, i, counter_1, _b, header, metadata, headCounter, getFee, getSource, constructOps, branch, contents, protocol;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        counters = {};
                        ops = [];
                        blockHeaderPromise = this.rpc.getBlockHeader();
                        blockMetaPromise = this.rpc.getBlockMetadata();
                        if (Array.isArray(operation)) {
                            ops = __spreadArray([], __read(operation));
                        }
                        else {
                            ops = [operation];
                        }
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        publicKeyHash = _c.sent();
                        counterPromise = Promise.resolve(undefined);
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < ops.length)) return [3 /*break*/, 5];
                        if (!(types_1.isOpRequireReveal(ops[i]) || ops[i].kind === 'reveal')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.rpc.getContract(publicKeyHash)];
                    case 3:
                        counter_1 = (_c.sent()).counter;
                        counterPromise = Promise.resolve(counter_1);
                        return [3 /*break*/, 5];
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, Promise.all([
                            blockHeaderPromise,
                            blockMetaPromise,
                            counterPromise
                        ])];
                    case 6:
                        _b = __read.apply(void 0, [_c.sent(), 3]), header = _b[0], metadata = _b[1], headCounter = _b[2];
                        if (!header) {
                            throw new Error('Unable to fetch latest block header');
                        }
                        if (!metadata) {
                            throw new Error('Unable to fetch latest metadata');
                        }
                        head = header;
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
                                    case rpc_1.OpKind.ACTIVATION:
                                        return __assign({}, op);
                                    case rpc_1.OpKind.REVEAL:
                                        return __assign(__assign(__assign({}, op), getSource(op)), getFee(op));
                                    case rpc_1.OpKind.ORIGINATION:
                                        return __assign(__assign(__assign(__assign({}, op), { balance: typeof op.balance !== 'undefined' ? "" + op.balance : '0' }), getSource(op)), getFee(op));
                                    case rpc_1.OpKind.TRANSACTION:
                                        var cops = __assign(__assign(__assign(__assign({}, op), { amount: typeof op.amount !== 'undefined' ? "" + op.amount : '0' }), getSource(op)), getFee(op));
                                        if (cops.source.toLowerCase().startsWith('kt1')) {
                                            throw new Error("KT1 addresses are not supported as source since " + constants_1.Protocols.PsBabyM1);
                                        }
                                        return cops;
                                    case rpc_1.OpKind.DELEGATION:
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
                            throw new operation_errors_1.TezosPreapplyFailureError(results);
                        }
                        for (i = 0; i < results.length; i++) {
                            for (j = 0; j < results[i].contents.length; j++) {
                                opResponse.push(results[i].contents[j]);
                            }
                        }
                        errors = operation_errors_1.flattenErrors(results);
                        if (errors.length) {
                            // @ts-ignore
                            throw new operation_errors_1.TezosOperationError(errors);
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
exports.OperationEmitter = OperationEmitter;
//# sourceMappingURL=operation-emitter.js.map