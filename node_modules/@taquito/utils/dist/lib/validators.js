"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var bs58check = require('bs58check');
var ValidationResult;
(function (ValidationResult) {
    ValidationResult[ValidationResult["NO_PREFIX_MATCHED"] = 0] = "NO_PREFIX_MATCHED";
    ValidationResult[ValidationResult["INVALID_CHECKSUM"] = 1] = "INVALID_CHECKSUM";
    ValidationResult[ValidationResult["INVALID_LENGTH"] = 2] = "INVALID_LENGTH";
    ValidationResult[ValidationResult["VALID"] = 3] = "VALID";
})(ValidationResult = exports.ValidationResult || (exports.ValidationResult = {}));
function isValidPrefix(value) {
    if (typeof value !== 'string') {
        return false;
    }
    return value in constants_1.prefix;
}
exports.isValidPrefix = isValidPrefix;
function validatePrefixedValue(value, prefixes) {
    var match = new RegExp("^(" + prefixes.join('|') + ")").exec(value);
    if (!match || match.length === 0) {
        return ValidationResult.NO_PREFIX_MATCHED;
    }
    var prefixKey = match[0];
    if (!isValidPrefix(prefixKey)) {
        return ValidationResult.NO_PREFIX_MATCHED;
    }
    // decodeUnsafe return undefined if decoding fail
    var decoded = bs58check.decodeUnsafe(value);
    if (!decoded) {
        return ValidationResult.INVALID_CHECKSUM;
    }
    decoded = decoded.slice(constants_1.prefix[prefixKey].length);
    if (decoded.length !== constants_1.prefixLength[prefixKey]) {
        return ValidationResult.INVALID_LENGTH;
    }
    return ValidationResult.VALID;
}
var implicitPrefix = [constants_1.Prefix.TZ1, constants_1.Prefix.TZ2, constants_1.Prefix.TZ3];
var contractPrefix = [constants_1.Prefix.KT1];
var signaturePrefix = [constants_1.Prefix.EDSIG, constants_1.Prefix.P2SIG, constants_1.Prefix.SPSIG, constants_1.Prefix.SIG];
var pkPrefix = [constants_1.Prefix.EDPK, constants_1.Prefix.SPPK, constants_1.Prefix.P2PK];
function validateAddress(value) {
    return validatePrefixedValue(value, __spread(implicitPrefix, contractPrefix));
}
exports.validateAddress = validateAddress;
function validateChain(value) {
    return validatePrefixedValue(value, [constants_1.Prefix.NET]);
}
exports.validateChain = validateChain;
function validateContractAddress(value) {
    return validatePrefixedValue(value, contractPrefix);
}
exports.validateContractAddress = validateContractAddress;
function validateKeyHash(value) {
    return validatePrefixedValue(value, implicitPrefix);
}
exports.validateKeyHash = validateKeyHash;
function validateSignature(value) {
    return validatePrefixedValue(value, signaturePrefix);
}
exports.validateSignature = validateSignature;
function validatePublicKey(value) {
    return validatePrefixedValue(value, pkPrefix);
}
exports.validatePublicKey = validatePublicKey;
//# sourceMappingURL=validators.js.map