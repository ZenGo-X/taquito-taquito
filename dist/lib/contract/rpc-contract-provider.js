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
exports.RpcContractProvider = void 0;
var http_utils_1 = require("@taquito/http-utils");
var michelson_encoder_1 = require("@taquito/michelson-encoder");
var rpc_1 = require("@taquito/rpc");
var utils_1 = require("@taquito/utils");
var rpc_batch_provider_1 = require("../batch/rpc-batch-provider");
var delegate_operation_1 = require("../operations/delegate-operation");
var operation_emitter_1 = require("../operations/operation-emitter");
var origination_operation_1 = require("../operations/origination-operation");
var reveal_operation_1 = require("../operations/reveal-operation");
var transaction_operation_1 = require("../operations/transaction-operation");
var types_1 = require("../operations/types");
var contract_1 = require("./contract");
var errors_1 = require("./errors");
var prepare_1 = require("./prepare");
var semantic_1 = require("./semantic");
var constants_1 = require("../constants");
var RpcContractProvider = /** @class */ (function (_super) {
    __extends(RpcContractProvider, _super);
    function RpcContractProvider(context, estimator) {
        var _this = _super.call(this, context) || this;
        _this.estimator = estimator;
        _this.contractProviderTypeSymbol = Symbol.for('taquito--provider-type-symbol');
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
                        if (michelson_encoder_1.Schema.isSchema(schema)) {
                            contractSchema = schema;
                        }
                        else {
                            contractSchema = michelson_encoder_1.Schema.fromRPCResponse({ script: schema });
                        }
                        return [4 /*yield*/, this.rpc.getStorage(contract)];
                    case 3:
                        storage = _a.sent();
                        return [2 /*return*/, contractSchema.Execute(storage, semantic_1.smartContractAbstractionSemantic(this))]; // Cast into T because only the caller can know the true type of the storage
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
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
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
                        if (michelson_encoder_1.Schema.isSchema(schema)) {
                            contractSchema = schema;
                        }
                        else {
                            contractSchema = michelson_encoder_1.Schema.fromRPCResponse({ script: schema });
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
     * @param block optional block level to fetch the values from
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
     */
    RpcContractProvider.prototype.getBigMapKeyByID = function (id, keyToEncode, schema, block) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, key, type, packed, encodedExpr, bigMapValue, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = schema.EncodeBigMapKey(keyToEncode), key = _a.key, type = _a.type;
                        return [4 /*yield*/, this.context.packer.packData({ data: key, type: type })];
                    case 1:
                        packed = (_c.sent()).packed;
                        encodedExpr = utils_1.encodeExpr(packed);
                        if (!block) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.context.rpc.getBigMapExpr(id.toString(), encodedExpr, { block: String(block) })];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.context.rpc.getBigMapExpr(id.toString(), encodedExpr)];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        bigMapValue = _b;
                        return [2 /*return*/, schema.ExecuteOnBigMapValue(bigMapValue, semantic_1.smartContractAbstractionSemantic(this))];
                }
            });
        });
    };
    /**
     *
     * @description Fetch multiple values in a big map
     * All values will be fetched on the same block level. If a block is specified in the request, the values will be fetched at it.
     * Otherwise, a first request will be done to the node to fetch the level of the head and all values will be fetched at this level.
     * If one of the keys does not exist in the big map, its value will be set to undefined.
     *
     * @param id Big Map ID
     * @param keys Array of keys to query (will be encoded properly according to the schema)
     * @param schema Big Map schema (can be determined using your contract type)
     * @param block optional block level to fetch the values from
     * @param batchSize optional batch size representing the number of requests to execute in parallel
     * @returns A MichelsonMap containing the keys queried in the big map and their value in a well-formatted JSON object format
     *
     */
    RpcContractProvider.prototype.getBigMapKeysByID = function (id, keys, schema, block, batchSize) {
        if (batchSize === void 0) { batchSize = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var level, bigMapValues, position, results, keysBatch, batch, _a, i;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getBlockForRequest(keys, block)];
                    case 1:
                        level = _b.sent();
                        bigMapValues = new michelson_encoder_1.MichelsonMap();
                        position = 0;
                        results = [];
                        _b.label = 2;
                    case 2:
                        if (!(position < keys.length)) return [3 /*break*/, 4];
                        keysBatch = keys.slice(position, position + batchSize);
                        batch = keysBatch.map(function (keyToEncode) { return _this.getBigMapValueOrUndefined(keyToEncode, id, schema, level); });
                        _a = [__spreadArray([], __read(results))];
                        return [4 /*yield*/, Promise.all(batch)];
                    case 3:
                        results = __spreadArray.apply(void 0, _a.concat([__read.apply(void 0, [_b.sent()])]));
                        position += batchSize;
                        return [3 /*break*/, 2];
                    case 4:
                        for (i = 0; i < results.length; i++) {
                            bigMapValues.set(keys[i], results[i]);
                        }
                        return [2 /*return*/, bigMapValues];
                }
            });
        });
    };
    RpcContractProvider.prototype.prepareAndForge = function (operation, source) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, prepared;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addRevealOperationIfNeeded(operation, source)];
                    case 1:
                        ops = _a.sent();
                        return [4 /*yield*/, this.prepareOperation({ operation: ops, source: source })];
                    case 2:
                        prepared = _a.sent();
                        return [2 /*return*/, this.forge(prepared)];
                }
            });
        });
    };
    RpcContractProvider.prototype.getBlockForRequest = function (keys, block) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(keys.length === 1 || typeof block !== 'undefined')) return [3 /*break*/, 1];
                        _b = block;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.rpc.getBlock()];
                    case 2:
                        _b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.header.level;
                        _c.label = 3;
                    case 3: return [2 /*return*/, _b];
                }
            });
        });
    };
    RpcContractProvider.prototype.getBigMapValueOrUndefined = function (keyToEncode, id, schema, level) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getBigMapKeyByID(id, keyToEncode, schema, level)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_1 = _a.sent();
                        if (ex_1 instanceof http_utils_1.HttpResponseError && ex_1.status === http_utils_1.STATUS_CODE.NOT_FOUND) {
                            return [2 /*return*/];
                        }
                        else {
                            throw ex_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @description Return a well formatted json object of a sapling state
     *
     * @param id Sapling state ID
     * @param block optional block level to fetch the value from
     *
     */
    RpcContractProvider.prototype.getSaplingDiffByID = function (id, block) {
        return __awaiter(this, void 0, void 0, function () {
            var saplingState, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!block) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.context.rpc.getSaplingDiffById(id.toString(), { block: String(block) })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.context.rpc.getSaplingDiffById(id.toString())];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        saplingState = _a;
                        return [2 /*return*/, saplingState];
                }
            });
        });
    };
    RpcContractProvider.prototype.addRevealOperationIfNeeded = function (operation, publicKeyHash) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, publicKey, estimateReveal_1, reveal, estimatedReveal, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!types_1.isOpRequireReveal(operation)) return [3 /*break*/, 5];
                        ops = [operation];
                        return [4 /*yield*/, this.signer.publicKey()];
                    case 1:
                        publicKey = _c.sent();
                        return [4 /*yield*/, this.estimator.reveal()];
                    case 2:
                        estimateReveal_1 = _c.sent();
                        if (!estimateReveal_1) return [3 /*break*/, 5];
                        reveal = { kind: rpc_1.OpKind.REVEAL };
                        return [4 /*yield*/, this.estimate(reveal, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, estimateReveal_1];
                            }); }); })];
                    case 3:
                        estimatedReveal = _c.sent();
                        _b = (_a = ops).unshift;
                        return [4 /*yield*/, prepare_1.createRevealOperation(__assign({}, estimatedReveal), publicKeyHash, publicKey)];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, ops];
                    case 5: return [2 /*return*/, operation];
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
            var estimate, publicKeyHash, operation, _a, ops, preparedOrigination, forgedOrigination, _b, hash, context, forgedBytes, opResponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.estimate(params, this.estimator.originate.bind(this.estimator))];
                    case 1:
                        estimate = _c.sent();
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 2:
                        publicKeyHash = _c.sent();
                        _a = prepare_1.createOriginationOperation;
                        return [4 /*yield*/, this.context.parser.prepareCodeOrigination(__assign(__assign({}, params), estimate))];
                    case 3: return [4 /*yield*/, _a.apply(void 0, [_c.sent()])];
                    case 4:
                        operation = _c.sent();
                        return [4 /*yield*/, this.addRevealOperationIfNeeded(operation, publicKeyHash)];
                    case 5:
                        ops = _c.sent();
                        return [4 /*yield*/, this.prepareOperation({ operation: ops, source: publicKeyHash })];
                    case 6:
                        preparedOrigination = _c.sent();
                        return [4 /*yield*/, this.forge(preparedOrigination)];
                    case 7:
                        forgedOrigination = _c.sent();
                        return [4 /*yield*/, this.signAndInject(forgedOrigination)];
                    case 8:
                        _b = _c.sent(), hash = _b.hash, context = _b.context, forgedBytes = _b.forgedBytes, opResponse = _b.opResponse;
                        return [2 /*return*/, new origination_operation_1.OriginationOperation(hash, operation, forgedBytes, opResponse, context, this)];
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
            var estimate, publicKeyHash, operation, sourceOrDefault, ops, prepared, opBytes, _a, hash, context, forgedBytes, opResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Since babylon delegation source cannot smart contract
                        if (/kt1/i.test(params.source)) {
                            throw new errors_1.InvalidDelegationSource(params.source);
                        }
                        return [4 /*yield*/, this.estimate(params, this.estimator.setDelegate.bind(this.estimator))];
                    case 1:
                        estimate = _b.sent();
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 2:
                        publicKeyHash = _b.sent();
                        return [4 /*yield*/, prepare_1.createSetDelegateOperation(__assign(__assign({}, params), estimate))];
                    case 3:
                        operation = _b.sent();
                        sourceOrDefault = params.source || publicKeyHash;
                        return [4 /*yield*/, this.addRevealOperationIfNeeded(operation, publicKeyHash)];
                    case 4:
                        ops = _b.sent();
                        return [4 /*yield*/, this.prepareOperation({
                                operation: ops,
                                source: sourceOrDefault,
                            })];
                    case 5:
                        prepared = _b.sent();
                        return [4 /*yield*/, this.forge(prepared)];
                    case 6:
                        opBytes = _b.sent();
                        return [4 /*yield*/, this.signAndInject(opBytes)];
                    case 7:
                        _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                        return [2 /*return*/, new delegate_operation_1.DelegateOperation(hash, operation, sourceOrDefault, forgedBytes, opResponse, context)];
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
            var estimate, operation, source, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.context.isAnyProtocolActive(constants_1.protocols['005'])];
                    case 1:
                        // Since babylon delegation source cannot smart contract
                        if ((_b.sent()) && /kt1/i.test(params.source)) {
                            throw new errors_1.InvalidDelegationSource(params.source);
                        }
                        return [4 /*yield*/, this.estimate(params, this.estimator.setDelegate.bind(this.estimator))];
                    case 2:
                        estimate = _b.sent();
                        return [4 /*yield*/, prepare_1.createSetDelegateOperation(__assign(__assign({}, params), estimate))];
                    case 3:
                        operation = _b.sent();
                        _a = params.source;
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        source = _a;
                        return [2 /*return*/, this.prepareAndForge(operation, source)];
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
                        return [4 /*yield*/, prepare_1.createSetDelegateOperation(operationContentsToDelegateParams(delegationParams))];
                    case 2:
                        operation = _b.sent();
                        return [2 /*return*/, new delegate_operation_1.DelegateOperation(hash, operation, params.opOb.contents[0].source, forgedBytes, opResponse, context)];
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
            var estimate, source, operation, ops, prepared, opBytes, _a, hash, context, forgedBytes, opResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.estimate(params, this.estimator.registerDelegate.bind(this.estimator))];
                    case 1:
                        estimate = _b.sent();
                        return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 2:
                        source = _b.sent();
                        return [4 /*yield*/, prepare_1.createRegisterDelegateOperation(__assign(__assign({}, params), estimate), source)];
                    case 3:
                        operation = _b.sent();
                        return [4 /*yield*/, this.addRevealOperationIfNeeded(operation, source)];
                    case 4:
                        ops = _b.sent();
                        return [4 /*yield*/, this.prepareOperation({ operation: ops })];
                    case 5:
                        prepared = _b.sent();
                        return [4 /*yield*/, this.forge(prepared)];
                    case 6:
                        opBytes = _b.sent();
                        return [4 /*yield*/, this.signAndInject(opBytes)];
                    case 7:
                        _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                        return [2 /*return*/, new delegate_operation_1.DelegateOperation(hash, operation, source, forgedBytes, opResponse, context)];
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
            var publickKeyHash, estimate, operation, source, ops, prepared, opBytes, _a, hash, context, forgedBytes, opResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        publickKeyHash = _b.sent();
                        return [4 /*yield*/, this.estimate(params, this.estimator.transfer.bind(this.estimator))];
                    case 2:
                        estimate = _b.sent();
                        return [4 /*yield*/, prepare_1.createTransferOperation(__assign(__assign({}, params), estimate))];
                    case 3:
                        operation = _b.sent();
                        source = params.source || publickKeyHash;
                        return [4 /*yield*/, this.addRevealOperationIfNeeded(operation, publickKeyHash)];
                    case 4:
                        ops = _b.sent();
                        return [4 /*yield*/, this.prepareOperation({ operation: ops, source: params.source })];
                    case 5:
                        prepared = _b.sent();
                        return [4 /*yield*/, this.forge(prepared)];
                    case 6:
                        opBytes = _b.sent();
                        return [4 /*yield*/, this.signAndInject(opBytes)];
                    case 7:
                        _a = _b.sent(), hash = _a.hash, context = _a.context, forgedBytes = _a.forgedBytes, opResponse = _a.opResponse;
                        return [2 /*return*/, new transaction_operation_1.TransactionOperation(hash, operation, source, forgedBytes, opResponse, context)];
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
                        return [4 /*yield*/, prepare_1.createTransferOperation(__assign(__assign({}, params), estimate))];
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
                        return [2 /*return*/, this.prepareAndForge(operation, source)];
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
                        return [4 /*yield*/, prepare_1.createTransferOperation(operationContentsToTransferParams(transactionParams))];
                    case 2:
                        operation = _b.sent();
                        return [2 /*return*/, new transaction_operation_1.TransactionOperation(hash, operation, params.opOb.contents[0].source, forgedBytes, opResponse, context)];
                }
            });
        });
    };
    /**
     *
     * @description Reveal the current address. Will throw an error if the address is already revealed.
     *
     * @returns An operation handle with the result from the rpc node
     *
     * @param RevealParams operation parameter
     */
    RpcContractProvider.prototype.reveal = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var publicKeyHash, estimateReveal, estimated, operation, _a, _b, prepared, opBytes, _c, hash, context, forgedBytes, opResponse;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.signer.publicKeyHash()];
                    case 1:
                        publicKeyHash = _d.sent();
                        return [4 /*yield*/, this.estimator.reveal(params)];
                    case 2:
                        estimateReveal = _d.sent();
                        if (!estimateReveal) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.estimate(params, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, estimateReveal];
                            }); }); })];
                    case 3:
                        estimated = _d.sent();
                        _a = prepare_1.createRevealOperation;
                        _b = [__assign({}, estimated), publicKeyHash];
                        return [4 /*yield*/, this.signer.publicKey()];
                    case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.sent()]))];
                    case 5:
                        operation = _d.sent();
                        return [4 /*yield*/, this.prepareOperation({ operation: operation, source: publicKeyHash })];
                    case 6:
                        prepared = _d.sent();
                        return [4 /*yield*/, this.forge(prepared)];
                    case 7:
                        opBytes = _d.sent();
                        return [4 /*yield*/, this.signAndInject(opBytes)];
                    case 8:
                        _c = _d.sent(), hash = _c.hash, context = _c.context, forgedBytes = _c.forgedBytes, opResponse = _c.opResponse;
                        return [2 /*return*/, new reveal_operation_1.RevealOperation(hash, operation, publicKeyHash, forgedBytes, opResponse, context)];
                    case 9: throw new Error('The current address is already revealed.');
                }
            });
        });
    };
    RpcContractProvider.prototype.at = function (address, contractAbstractionComposer) {
        if (contractAbstractionComposer === void 0) { contractAbstractionComposer = function (x) { return x; }; }
        return __awaiter(this, void 0, void 0, function () {
            var script, entrypoints, blockHeader, chainId, abs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rpc.getScript(address)];
                    case 1:
                        script = _a.sent();
                        return [4 /*yield*/, this.rpc.getEntrypoints(address)];
                    case 2:
                        entrypoints = _a.sent();
                        return [4 /*yield*/, this.rpc.getBlockHeader()];
                    case 3:
                        blockHeader = _a.sent();
                        chainId = blockHeader.chain_id;
                        abs = new contract_1.ContractAbstraction(address, script, this, this, entrypoints, chainId);
                        return [2 /*return*/, contractAbstractionComposer(abs, this.context)];
                }
            });
        });
    };
    /**
     *
     * @description Batch a group of operation together. Operations will be applied in the order in which they are added to the batch
     *
     * @returns A batch object from which we can add more operation or send a command to execute the batch
     *
     * @param params List of operation to batch together
     */
    RpcContractProvider.prototype.batch = function (params) {
        var batch = new rpc_batch_provider_1.OperationBatch(this.context, this.estimator);
        if (Array.isArray(params)) {
            batch.with(params);
        }
        return batch;
    };
    return RpcContractProvider;
}(operation_emitter_1.OperationEmitter));
exports.RpcContractProvider = RpcContractProvider;
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
//# sourceMappingURL=rpc-contract-provider.js.map