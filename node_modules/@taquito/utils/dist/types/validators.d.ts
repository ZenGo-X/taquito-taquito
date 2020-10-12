import { Prefix } from './constants';
export declare enum ValidationResult {
    NO_PREFIX_MATCHED = 0,
    INVALID_CHECKSUM = 1,
    INVALID_LENGTH = 2,
    VALID = 3
}
export declare function isValidPrefix(value: any): value is Prefix;
export declare function validateAddress(value: any): ValidationResult;
export declare function validateChain(value: any): ValidationResult;
export declare function validateContractAddress(value: any): ValidationResult;
export declare function validateKeyHash(value: any): ValidationResult;
export declare function validateSignature(value: any): ValidationResult;
export declare function validatePublicKey(value: any): ValidationResult;
