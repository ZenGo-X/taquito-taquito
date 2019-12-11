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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var constants_1 = require("../constants");
var OperationEmitter = /** @class */ (function () {
    function OperationEmitter(context) {
        this.context = context;
    }
    Object.defineProperty(OperationEmitter.prototype, "rpc", {
        get: function () {
            return this.context.rpc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationEmitter.prototype, "signer", {
        get: function () {
            return this.context.signer;
        },
        enumerable: true,
        configurable: true
    });
    OperationEmitter.prototype.isSourceOp = function (op) {
        return ['transaction', 'origination', 'delegation'].includes(op.kind);
    };
    OperationEmitter.prototype.isFeeOp = function (op) {
        return ['reveal', 'transaction', 'origination', 'delegation'].includes(op.kind);
    };
    OperationEmitter.prototype.prepareOperation = function (_a) {
        var operation = _a.operation, source = _a.source;
        return __awaiter(this, void 0, void 0, function () {
            var counter, counters, requiresReveal, ops, head, blockHeaderPromise, blockMetaPromise, publicKeyHash, counterPromise, managerPromise, i, counter_1, _b, header, metadata, headCounter, manager, haveManager, reveal, _c, proto005, constructOps, branch, contents, protocol;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        counters = {};
                        requiresReveal = false;
                        ops = [];
                        blockHeaderPromise = this.rpc.getBlockHeader();
                        blockMetaPromise = this.rpc.getBlockMetadata();
                        if (Array.isArray(operation)) {
                            ops = __spreadArrays(operation);
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
                        if (!['transaction', 'origination', 'delegation'].includes(ops[i].kind)) return [3 /*break*/, 4];
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
                        _b = _d.sent(), header = _b[0], metadata = _b[1], headCounter = _b[2], manager = _b[3];
                        if (!header) {
                            throw new Error('Unable to latest block header');
                        }
                        if (!metadata) {
                            throw new Error('Unable to fetch latest metadata');
                        }
                        head = header;
                        if (!requiresReveal) return [3 /*break*/, 8];
                        haveManager = manager && typeof manager === 'object' ? !!manager.key : !!manager;
                        if (!!haveManager) return [3 /*break*/, 8];
                        _c = {
                            kind: 'reveal',
                            fee: constants_1.DEFAULT_FEE.REVEAL
                        };
                        return [4 /*yield*/, this.signer.publicKey()];
                    case 7:
                        reveal = (_c.public_key = _d.sent(),
                            _c.source = publicKeyHash,
                            _c.gas_limit = constants_1.DEFAULT_GAS_LIMIT.REVEAL,
                            _c.storage_limit = constants_1.DEFAULT_STORAGE_LIMIT.REVEAL,
                            _c);
                        ops.unshift(reveal);
                        _d.label = 8;
                    case 8:
                        counter = parseInt(headCounter || '0', 10);
                        if (!counters[publicKeyHash] || counters[publicKeyHash] < counter) {
                            counters[publicKeyHash] = counter;
                        }
                        return [4 /*yield*/, this.context.isAnyProtocolActive(constants_1.protocols['005'])];
                    case 9:
                        proto005 = _d.sent();
                        constructOps = function (cOps) {
                            // tslint:disable strict-type-predicates
                            return cOps.map(function (op) {
                                var constructedOp = __assign({}, op);
                                if (_this.isSourceOp(op)) {
                                    if (typeof op.source === 'undefined') {
                                        constructedOp.source = source || publicKeyHash;
                                    }
                                }
                                if (_this.isFeeOp(op)) {
                                    if (typeof op.fee === 'undefined') {
                                        constructedOp.fee = '0';
                                    }
                                    else {
                                        constructedOp.fee = "" + op.fee;
                                    }
                                    if (typeof op.gas_limit === 'undefined') {
                                        constructedOp.gas_limit = '0';
                                    }
                                    else {
                                        constructedOp.gas_limit = "" + op.gas_limit;
                                    }
                                    if (typeof op.storage_limit === 'undefined') {
                                        constructedOp.storage_limit = '0';
                                    }
                                    else {
                                        constructedOp.storage_limit = "" + op.storage_limit;
                                    }
                                    var opCounter = ++counters[publicKeyHash];
                                    constructedOp.counter = "" + opCounter;
                                }
                                if (op.kind === 'origination') {
                                    if (typeof op.balance !== 'undefined')
                                        constructedOp.balance = "" + constructedOp.balance;
                                }
                                if (op.kind === 'transaction') {
                                    if (proto005 && constructedOp.source.toLowerCase().startsWith('kt1')) {
                                        throw new Error("KT1 addresses are not supported as source in " + constants_1.Protocols.PsBabyM1);
                                    }
                                    if (typeof op.amount !== 'undefined')
                                        constructedOp.amount = "" + constructedOp.amount;
                                }
                                // tslint:enable strict-type-predicates
                                // Protocol 005 remove these from operations content
                                if (proto005) {
                                    delete constructedOp.manager_pubkey;
                                    delete constructedOp.spendable;
                                    delete constructedOp.delegatable;
                                }
                                return constructedOp;
                            });
                        };
                        branch = head.hash;
                        contents = constructOps(ops);
                        protocol = metadata.next_protocol;
                        return [2 /*return*/, {
                                opOb: {
                                    branch: branch,
                                    contents: contents,
                                    protocol: protocol
                                },
                                counter: counter
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
                                    protocol: protocol
                                },
                                counter: counter
                            }];
                }
            });
        });
    };
    OperationEmitter.prototype.simulate = function (op) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.rpc.runOperation(op)];
                    case 1: return [2 /*return*/, (_a.opResponse = _b.sent(),
                            _a.op = op,
                            _a.context = this.context.clone(),
                            _a)];
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
            var opResponse, errors, results, i, j, content, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        forgedBytes.opbytes = sbytes;
                        forgedBytes.opOb.signature = prefixSig;
                        opResponse = [];
                        errors = [];
                        return [4 /*yield*/, this.rpc.preapplyOperations([forgedBytes.opOb])];
                    case 1:
                        results = _b.sent();
                        if (!Array.isArray(results)) {
                            throw new Error("RPC Fail: " + JSON.stringify(results));
                        }
                        for (i = 0; i < results.length; i++) {
                            for (j = 0; j < results[i].contents.length; j++) {
                                opResponse.push(results[i].contents[j]);
                                content = results[i].contents[j];
                                if ('metadata' in content &&
                                    typeof content.metadata.operation_result !== 'undefined' &&
                                    content.metadata.operation_result.status === 'failed') {
                                    errors = errors.concat(content.metadata.operation_result.errors);
                                }
                            }
                        }
                        if (errors.length) {
                            // @ts-ignore
                            throw new Error(JSON.stringify({ error: 'Operation Failed', errors: errors }));
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
