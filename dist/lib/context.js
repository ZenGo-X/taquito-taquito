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
exports.Context = exports.defaultConfig = void 0;
var rpc_1 = require("@taquito/rpc");
var rpc_forger_1 = require("./forger/rpc-forger");
var rpc_injector_1 = require("./injector/rpc-injector");
var noop_1 = require("./signer/noop");
var opreation_factory_1 = require("./wallet/opreation-factory");
var rpc_tz_provider_1 = require("./tz/rpc-tz-provider");
var rpc_estimate_provider_1 = require("./contract/rpc-estimate-provider");
var rpc_contract_provider_1 = require("./contract/rpc-contract-provider");
var rpc_batch_provider_1 = require("./batch/rpc-batch-provider");
var wallet_1 = require("./wallet");
exports.defaultConfig = {
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
        if (_signer === void 0) { _signer = new noop_1.NoopSigner(); }
        this._rpc = _rpc;
        this._signer = _signer;
        this._proto = _proto;
        this._config = _config;
        this.tz = new rpc_tz_provider_1.RpcTzProvider(this);
        this.estimate = new rpc_estimate_provider_1.RPCEstimateProvider(this);
        this.contract = new rpc_contract_provider_1.RpcContractProvider(this, this.estimate);
        this.batch = new rpc_batch_provider_1.RPCBatchProvider(this, this.estimate);
        this.wallet = new wallet_1.Wallet(this);
        if (typeof this._rpc === 'string') {
            this._rpcClient = new rpc_1.RpcClient(this._rpc);
        }
        else {
            this._rpcClient = this._rpc;
        }
        this.config = _config;
        this._forger = forger ? forger : new rpc_forger_1.RpcForger(this);
        this._injector = injector ? injector : new rpc_injector_1.RpcInjector(this);
        this.operationFactory = new opreation_factory_1.OperationFactory(this);
        this._walletProvider = wallet ? wallet : new wallet_1.LegacyWalletProvider(this);
    }
    Object.defineProperty(Context.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (value) {
            this._config = __assign(__assign({}, exports.defaultConfig), value);
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
exports.Context = Context;
//# sourceMappingURL=context.js.map