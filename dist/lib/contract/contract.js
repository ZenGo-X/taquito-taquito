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
exports.ContractAbstraction = exports.ContractView = exports.ContractMethod = void 0;
var michelson_encoder_1 = require("@taquito/michelson-encoder");
var constants_1 = require("../constants");
var wallet_1 = require("../wallet");
var errors_1 = require("./errors");
var lambda_view_1 = require("./lambda-view");
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
        if (this.provider instanceof wallet_1.Wallet) {
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
                    ? (_b = this.parameterSchema).Encode.apply(_b, __spreadArray([this.name], __read(this.args))) : (_c = this.parameterSchema).Encode.apply(_c, __spreadArray([], __read(this.args))),
            },
        };
        return fullTransferParams;
    };
    return ContractMethod;
}());
exports.ContractMethod = ContractMethod;
/**
 * @description Utility class to retrieve data from a smart contract's storage without incurring fees via a contract's view method
 */
var ContractView = /** @class */ (function () {
    function ContractView(currentContract, provider, name, chainId, callbackParametersSchema, parameterSchema, args) {
        this.currentContract = currentContract;
        this.provider = provider;
        this.name = name;
        this.chainId = chainId;
        this.callbackParametersSchema = callbackParametersSchema;
        this.parameterSchema = parameterSchema;
        this.args = args;
    }
    /**
     *
     * @description Find which lambda contract to use based on the current network,
     * encode parameters to Michelson,
     * create an instance of Lambdaview to retrive data, and
     * Decode Michelson response
     *
     * @param Options Address of a lambda contract (sandbox users)
     */
    ContractView.prototype.read = function (customLambdaAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var lambdaAddress, lambdaContract, arg, lambdaView, failedWith, response;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // TODO Verify if the 'customLambdaAdress' is a valid originated contract and if not, return an appropriate error message. 
                        if (customLambdaAddress) {
                            lambdaAddress = customLambdaAddress;
                        }
                        else if (this.chainId === constants_1.ChainIds.EDONET) {
                            lambdaAddress = constants_1.DefaultLambdaAddresses.EDONET;
                        }
                        else if (this.chainId === constants_1.ChainIds.FLORENCENET) {
                            lambdaAddress = constants_1.DefaultLambdaAddresses.FLORENCENET;
                        }
                        else if (this.chainId === constants_1.ChainIds.GRANADANET) {
                            lambdaAddress = constants_1.DefaultLambdaAddresses.GRANADANET;
                        }
                        else if (this.chainId === constants_1.ChainIds.MAINNET) {
                            lambdaAddress = constants_1.DefaultLambdaAddresses.MAINNET;
                        }
                        else {
                            throw new errors_1.UndefinedLambdaContractError();
                        }
                        return [4 /*yield*/, this.provider.at(lambdaAddress)];
                    case 1:
                        lambdaContract = _b.sent();
                        arg = (_a = this.parameterSchema).Encode.apply(_a, __spreadArray([], __read(this.args)));
                        lambdaView = new lambda_view_1.default(lambdaContract, this.currentContract, this.name, arg);
                        return [4 /*yield*/, lambdaView.execute()];
                    case 2:
                        failedWith = _b.sent();
                        response = this.callbackParametersSchema.Execute(failedWith);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return ContractView;
}());
exports.ContractView = ContractView;
var validateArgs = function (args, schema, name) {
    var sigs = schema.ExtractSignatures();
    if (!sigs.find(function (x) { return x.length === args.length; })) {
        throw new errors_1.InvalidParameterError(name, sigs, args);
    }
};
var isView = function (schema) {
    var isView = false;
    var sigs = schema.ExtractSignatures();
    if ((sigs[0][sigs[0].length - 1] === 'contract')) {
        isView = true;
    }
    return isView;
};
var isContractProvider = function (variableToCheck) {
    return variableToCheck.contractProviderTypeSymbol !== undefined;
};
/**
 * @description Smart contract abstraction
 */
var ContractAbstraction = /** @class */ (function () {
    function ContractAbstraction(address, script, provider, storageProvider, entrypoints, chainId) {
        this.address = address;
        this.script = script;
        this.storageProvider = storageProvider;
        this.entrypoints = entrypoints;
        this.chainId = chainId;
        /**
         * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
         * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
         *
         */
        this.methods = {};
        this.views = {};
        this.schema = michelson_encoder_1.Schema.fromRPCResponse({ script: this.script });
        this.parameterSchema = michelson_encoder_1.ParameterSchema.fromRPCResponse({ script: this.script });
        this._initializeMethods(this, address, provider, this.entrypoints.entrypoints, this.chainId);
    }
    ContractAbstraction.prototype._initializeMethods = function (currentContract, address, provider, entrypoints, chainId) {
        var _this = this;
        var parameterSchema = this.parameterSchema;
        var keys = Object.keys(entrypoints);
        if (parameterSchema.isMultipleEntryPoint) {
            keys.forEach(function (smartContractMethodName) {
                var smartContractMethodSchema = new michelson_encoder_1.ParameterSchema(entrypoints[smartContractMethodName]);
                var method = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    validateArgs(args, smartContractMethodSchema, smartContractMethodName);
                    return new ContractMethod(provider, address, smartContractMethodSchema, smartContractMethodName, args);
                };
                _this.methods[smartContractMethodName] = method;
                if (isContractProvider(provider)) {
                    if (isView(smartContractMethodSchema)) {
                        var view = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            var entrypointParamWithoutCallback = entrypoints[smartContractMethodName].args[0];
                            var smartContractMethodSchemaWithoutCallback = new michelson_encoder_1.ParameterSchema(entrypointParamWithoutCallback);
                            var parametersCallback = entrypoints[smartContractMethodName].args[1].args[0];
                            var smartContractMethodCallbackSchema = new michelson_encoder_1.ParameterSchema(parametersCallback);
                            validateArgs(args, smartContractMethodSchemaWithoutCallback, smartContractMethodName);
                            return new ContractView(currentContract, provider, smartContractMethodName, chainId, smartContractMethodCallbackSchema, smartContractMethodSchemaWithoutCallback, args);
                        };
                        _this.views[smartContractMethodName] = view;
                    }
                }
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
                    validateArgs(__spreadArray([smartContractMethodName], __read(args)), parameterSchema, smartContractMethodName);
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
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
     */
    ContractAbstraction.prototype.bigMap = function (key) {
        // tslint:disable-next-line: deprecation
        return this.storageProvider.getBigMapKey(this.address, key, this.schema);
    };
    return ContractAbstraction;
}());
exports.ContractAbstraction = ContractAbstraction;
//# sourceMappingURL=contract.js.map