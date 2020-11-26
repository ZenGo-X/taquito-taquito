"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDelegationSource = exports.InvalidParameterError = void 0;
var InvalidParameterError = /** @class */ (function () {
    function InvalidParameterError(smartContractMethodName, sigs, args) {
        this.smartContractMethodName = smartContractMethodName;
        this.sigs = sigs;
        this.args = args;
        this.name = 'Invalid parameters error';
        this.message = smartContractMethodName + " Received " + args.length + " arguments while expecting one of the following signatures (" + JSON.stringify(sigs) + ")";
    }
    return InvalidParameterError;
}());
exports.InvalidParameterError = InvalidParameterError;
var InvalidDelegationSource = /** @class */ (function () {
    function InvalidDelegationSource(source) {
        this.source = source;
        this.name = 'Invalid delegation source error';
        this.message = "Since Babylon delegation source can no longer be a contract address " + source + ". Please use the smart contract abstraction to set your delegate.";
    }
    return InvalidDelegationSource;
}());
exports.InvalidDelegationSource = InvalidDelegationSource;
//# sourceMappingURL=errors.js.map