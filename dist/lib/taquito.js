"use strict";
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var indexer_1 = require("@taquito/indexer");
var rpc_1 = require("@taquito/rpc");
var signer_1 = require("@taquito/signer");
var context_1 = require("./context");
var rpc_contract_provider_1 = require("./contract/rpc-contract-provider");
var rpc_estimate_provider_1 = require("./contract/rpc-estimate-provider");
var format_1 = require("./format");
var indexer_provider_1 = require("./query/indexer-provider");
var noop_1 = require("./signer/noop");
var polling_provider_1 = require("./subscribe/polling-provider");
var rpc_tz_provider_1 = require("./tz/rpc-tz-provider");
__export(require("./contract"));
__export(require("./contract/big-map"));
__export(require("./constants"));
/**
 * @description Facade class that surfaces all of the libraries capability and allow it's configuration
 */
var TezosToolkit = /** @class */ (function () {
    function TezosToolkit() {
        this._rpcClient = new rpc_1.RpcClient();
        this._indexerClient = new indexer_1.IndexerClient();
        this._options = {};
        this._context = new context_1.Context();
        this._tz = new rpc_tz_provider_1.RpcTzProvider(this._context);
        this._estimate = new rpc_estimate_provider_1.RPCEstimateProvider(this._context);
        this._contract = new rpc_contract_provider_1.RpcContractProvider(this._context, this._estimate);
        this.format = format_1.format;
        this.setProvider({ rpc: this._rpcClient });
    }
    /**
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network and indexer url to use to interact with the Tezos network
     */
    TezosToolkit.prototype.setProvider = function (_a) {
        var rpc = _a.rpc, indexer = _a.indexer, stream = _a.stream, signer = _a.signer, protocol = _a.protocol, config = _a.config;
        this.setRpcProvider(rpc);
        this.setIndexerProvider(indexer);
        this.setStreamProvider(stream);
        this.setSignerProvider(signer);
        this._context.proto = protocol;
        this._context.config = config;
    };
    TezosToolkit.prototype.setSignerProvider = function (signer) {
        if (!this._options.signer && typeof signer === 'undefined') {
            this._context.signer = new noop_1.NoopSigner();
            this._options.signer = signer;
        }
        else if (typeof signer !== 'undefined') {
            this._context.signer = signer;
            this._options.signer = signer;
        }
    };
    TezosToolkit.prototype.setRpcProvider = function (rpc) {
        if (typeof rpc === 'string') {
            this._rpcClient = new rpc_1.RpcClient(rpc);
        }
        else if (rpc instanceof rpc_1.RpcClient) {
            this._rpcClient = rpc;
        }
        else if (this._options.rpc === undefined) {
            this._rpcClient = new rpc_1.RpcClient();
        }
        this._options.rpc = rpc;
        this._context.rpc = this._rpcClient;
    };
    TezosToolkit.prototype.setIndexerProvider = function (indexer) {
        if (typeof indexer === 'string') {
            this._indexerClient = new indexer_1.IndexerClient(indexer);
        }
        else if (indexer instanceof indexer_1.IndexerClient) {
            this._indexerClient = indexer;
        }
        else if (this._options.indexer === undefined) {
            this._indexerClient = new indexer_1.IndexerClient();
        }
        this._query = new indexer_provider_1.IndexerProvider(this._indexerClient);
        this._options.indexer = indexer;
    };
    TezosToolkit.prototype.setStreamProvider = function (stream) {
        if (typeof stream === 'string') {
            this._stream = new polling_provider_1.PollingSubscribeProvider(new context_1.Context(new rpc_1.RpcClient(stream)));
        }
        else if (typeof stream !== 'undefined') {
            this._stream = stream;
        }
        else if (this._options.stream === undefined) {
            this._stream = new polling_provider_1.PollingSubscribeProvider(this._context);
        }
        this._options.stream = stream;
    };
    Object.defineProperty(TezosToolkit.prototype, "tz", {
        /**
         * @description Provide access to tezos account management
         */
        get: function () {
            return this._tz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "contract", {
        /**
         * @description Provide access to smart contract utilities
         */
        get: function () {
            return this._contract;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "estimate", {
        /**
         * @description Provide access to operation estimation utilities
         */
        get: function () {
            return this._estimate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "query", {
        /**
         * @description Provide access to querying utilities backed by an indexer implementation
         */
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "stream", {
        /**
         * @description Provide access to streaming utilities backed by an streamer implementation
         */
        get: function () {
            return this._stream;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "rpc", {
        /**
         * @description Provide access to the currently used rpc client
         */
        get: function () {
            return this._context.rpc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TezosToolkit.prototype, "signer", {
        /**
         * @description Provide access to the currently used signer
         */
        get: function () {
            return this._context.signer;
        },
        enumerable: true,
        configurable: true
    });
    TezosToolkit.prototype.importKey = function (privateKeyOrEmail, passphrase, mnemonic, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, pkh, op, ex_1, isInvalidActivationError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(privateKeyOrEmail && passphrase && mnemonic && secret)) return [3 /*break*/, 8];
                        signer = signer_1.InMemorySigner.fromFundraiser(privateKeyOrEmail, passphrase, mnemonic);
                        return [4 /*yield*/, signer.publicKeyHash()];
                    case 1:
                        pkh = _a.sent();
                        op = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.tz.activate(pkh, secret)];
                    case 3:
                        op = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        isInvalidActivationError = ex_1 && ex_1.body && /Invalid activation/.test(ex_1.body);
                        if (!isInvalidActivationError) {
                            throw ex_1;
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        if (!op) return [3 /*break*/, 7];
                        return [4 /*yield*/, op.confirmation()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.setSignerProvider(signer);
                        return [3 /*break*/, 9];
                    case 8:
                        // Fallback to regular import
                        this.setSignerProvider(new signer_1.InMemorySigner(privateKeyOrEmail, passphrase));
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return TezosToolkit;
}());
exports.TezosToolkit = TezosToolkit;
/**
 * @description Default Tezos toolkit instance
 */
exports.Tezos = new TezosToolkit();
