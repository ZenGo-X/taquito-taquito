"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var michelson_encoder_1 = require("@taquito/michelson-encoder");
var errors_1 = require("./errors");
var DEFAULT_SMART_CONTRACT_METHOD_NAME = 'main';
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
        enumerable: true,
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
        return this.provider.transfer(this.toTransferParams(params));
    };
    ContractMethod.prototype.toTransferParams = function (_a) {
        var _b, _c;
        var _d = _a === void 0 ? {} : _a, fee = _d.fee, gasLimit = _d.gasLimit, storageLimit = _d.storageLimit, _e = _d.amount, amount = _e === void 0 ? 0 : _e;
        return {
            to: this.address,
            amount: amount,
            fee: fee,
            gasLimit: gasLimit,
            storageLimit: storageLimit,
            parameter: {
                entrypoint: this.isMultipleEntrypoint ? this.name : 'default',
                value: this.isAnonymous
                    ? (_b = this.parameterSchema).Encode.apply(_b, __spreadArrays([this.name], this.args)) : (_c = this.parameterSchema).Encode.apply(_c, this.args),
            },
            rawParam: true,
        };
    };
    return ContractMethod;
}());
exports.ContractMethod = ContractMethod;
var validateArgs = function (args, schema, name) {
    var sigs = schema.ExtractSignatures();
    if (!sigs.find(function (x) { return x.length === args.length; })) {
        throw new errors_1.InvalidParameterError(name, sigs, args);
    }
};
/**
 * @description Smart contract abstraction
 */
var Contract = /** @class */ (function () {
    function Contract(address, script, provider, entrypoints) {
        this.address = address;
        this.script = script;
        this.provider = provider;
        this.entrypoints = entrypoints;
        /**
         * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
         * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
         *
         */
        this.methods = {};
        this.schema = michelson_encoder_1.Schema.fromRPCResponse({ script: this.script });
        this.parameterSchema = michelson_encoder_1.ParameterSchema.fromRPCResponse({ script: this.script });
        this._initializeMethods(address, provider, this.entrypoints.entrypoints);
    }
    Contract.prototype._initializeMethods = function (address, provider, entrypoints) {
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
                    var smartContractMethodSchema = new michelson_encoder_1.ParameterSchema(entrypoints[smartContractMethodName]);
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
                    validateArgs(__spreadArrays([smartContractMethodName], args), parameterSchema, smartContractMethodName);
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
    Contract.prototype.storage = function () {
        return this.provider.getStorage(this.address, this.schema);
    };
    /**
     *
     * @description Return a friendly representation of the smart contract big map value
     *
     * @param key BigMap key to fetch
     */
    Contract.prototype.bigMap = function (key) {
        // tslint:disable-next-line: deprecation
        return this.provider.getBigMapKey(this.address, key, this.schema);
    };
    return Contract;
}());
exports.Contract = Contract;
//# sourceMappingURL=contract.js.map