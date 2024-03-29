"use strict";
/**
 * @packageDocumentation
 * @module @taquito/taquito
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.TezosToolkit = exports.PollingSubscribeProvider = exports.OperationBatch = exports.RpcForger = exports.CompositeForger = exports.UnitValue = exports.MichelsonMap = void 0;
var rpc_1 = require("@taquito/rpc");
var context_1 = require("./context");
var rpc_forger_1 = require("./forger/rpc-forger");
var format_1 = require("./format");
var rpc_packer_1 = require("./packer/rpc-packer");
var noop_1 = require("./signer/noop");
var polling_provider_1 = require("./subscribe/polling-provider");
var version_1 = require("./version");
var wallet_1 = require("./wallet");
var michelson_encoder_1 = require("@taquito/michelson-encoder");
Object.defineProperty(exports, "MichelsonMap", { enumerable: true, get: function () { return michelson_encoder_1.MichelsonMap; } });
Object.defineProperty(exports, "UnitValue", { enumerable: true, get: function () { return michelson_encoder_1.UnitValue; } });
__exportStar(require("./constants"), exports);
__exportStar(require("./context"), exports);
__exportStar(require("./contract"), exports);
__exportStar(require("./contract/big-map"), exports);
var composite_forger_1 = require("./forger/composite-forger");
Object.defineProperty(exports, "CompositeForger", { enumerable: true, get: function () { return composite_forger_1.CompositeForger; } });
__exportStar(require("./forger/interface"), exports);
var rpc_forger_2 = require("./forger/rpc-forger");
Object.defineProperty(exports, "RpcForger", { enumerable: true, get: function () { return rpc_forger_2.RpcForger; } });
__exportStar(require("./operations"), exports);
var rpc_batch_provider_1 = require("./batch/rpc-batch-provider");
Object.defineProperty(exports, "OperationBatch", { enumerable: true, get: function () { return rpc_batch_provider_1.OperationBatch; } });
__exportStar(require("./signer/interface"), exports);
__exportStar(require("./subscribe/interface"), exports);
var polling_provider_2 = require("./subscribe/polling-provider");
Object.defineProperty(exports, "PollingSubscribeProvider", { enumerable: true, get: function () { return polling_provider_2.PollingSubscribeProvider; } });
__exportStar(require("./tz/interface"), exports);
__exportStar(require("./wallet"), exports);
__exportStar(require("./parser/interface"), exports);
__exportStar(require("./parser/michel-codec-parser"), exports);
__exportStar(require("./parser/noop-parser"), exports);
__exportStar(require("./packer/interface"), exports);
__exportStar(require("./packer/michel-codec-packer"), exports);
__exportStar(require("./packer/rpc-packer"), exports);
/**
 * @description Facade class that surfaces all of the libraries capability and allow it's configuration
 *
 * @param _rpc The RPC server to use
 */
var TezosToolkit = /** @class */ (function () {
    function TezosToolkit(_rpc) {
        this._rpc = _rpc;
        this._options = {};
        this.format = format_1.format;
        if (typeof this._rpc === 'string') {
            this._rpcClient = new rpc_1.RpcClient(this._rpc);
        }
        else {
            this._rpcClient = this._rpc;
        }
        this._context = new context_1.Context(_rpc);
        this._wallet = new wallet_1.Wallet(this._context);
        this.setProvider({ rpc: this._rpcClient });
        // tslint:disable-next-line: deprecation
        this.batch = this._context.batch.batch.bind(this._context.batch);
    }
    /**
     * @description Sets configuration on the Tezos Taquito instance. Allows user to choose which signer, rpc client, rpc url, forger and so forth
     *
     * @param options rpc url or rpcClient to use to interact with the Tezos network
     *
     * @example Tezos.setProvider({rpc: 'https://mainnet.api.tez.ie/', signer: new InMemorySigner.fromSecretKey(“edsk...”)})
     * @example Tezos.setProvider({ config: { confirmationPollingTimeoutSecond: 300 }})
     *
     */
    TezosToolkit.prototype.setProvider = function (_a) {
        var rpc = _a.rpc, stream = _a.stream, signer = _a.signer, protocol = _a.protocol, config = _a.config, forger = _a.forger, wallet = _a.wallet, packer = _a.packer;
        this.setRpcProvider(rpc);
        this.setStreamProvider(stream);
        this.setSignerProvider(signer);
        this.setForgerProvider(forger);
        this.setWalletProvider(wallet);
        this.setPackerProvider(packer);
        this._context.proto = protocol;
        if (config) {
            this._context.setPartialConfig(config);
        }
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
            this._context.signer = new noop_1.NoopSigner();
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
     * @example Tezos.setRpcProvider('https://mainnet.api.tez.ie/')
     *
     */
    TezosToolkit.prototype.setRpcProvider = function (rpc) {
        if (typeof rpc === 'string') {
            this._rpcClient = new rpc_1.RpcClient(rpc);
        }
        else if (rpc instanceof rpc_1.RpcClient) {
            this._rpcClient = rpc;
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
        var f = typeof forger === 'undefined' ? this.getFactory(rpc_forger_1.RpcForger)() : forger;
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
            this._stream = new polling_provider_1.PollingSubscribeProvider(new context_1.Context(new rpc_1.RpcClient(stream)));
        }
        else if (typeof stream !== 'undefined') {
            this._stream = stream;
        }
        else if (this._options.stream === undefined) {
            this._stream = this.getFactory(polling_provider_1.PollingSubscribeProvider)();
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
            var w = this.getFactory(wallet_1.LegacyWalletProvider)();
            this._options.wallet = w;
            this._context.walletProvider = w;
        }
        else if (typeof wallet !== 'undefined') {
            this._options.wallet = wallet;
            this._context.walletProvider = wallet;
        }
    };
    /**
     * @description Sets Packer provider on the Tezos Taquito instance
     *
     * @param options packer to use to interact with the Tezos network
     *
     * @example Tezos.setPackerProvider(new MichelCodecPacker())
     *
     */
    TezosToolkit.prototype.setPackerProvider = function (packer) {
        var p = typeof packer === 'undefined' ? this.getFactory(rpc_packer_1.RpcPacker)() : packer;
        this._options.packer = p;
        this._context.packer = p;
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
    /**
     * @description Allow to add a module to the TezosToolkit instance. This method adds the appropriate Providers(s) required by the module to the internal context.
     *
     * @param module extension to add to the TezosToolkit instance
     *
     * @example Tezos.addExtension(new Tzip16Module());
     */
    TezosToolkit.prototype.addExtension = function (module) {
        module.configureContext(this._context);
    };
    TezosToolkit.prototype.getFactory = function (ctor) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new (ctor.bind.apply(ctor, __spreadArray([void 0, _this._context], __read(args))))();
        };
    };
    /**
     * @description Gets an object containing the version of Taquito library and git sha of the commit this library is compiled from
     */
    TezosToolkit.prototype.getVersionInfo = function () {
        return version_1.VERSION;
    };
    return TezosToolkit;
}());
exports.TezosToolkit = TezosToolkit;
//# sourceMappingURL=taquito.js.map