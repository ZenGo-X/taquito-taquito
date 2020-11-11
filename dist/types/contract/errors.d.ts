export declare class InvalidParameterError implements Error {
    smartContractMethodName: string;
    sigs: any[];
    args: any[];
    name: string;
    message: string;
    constructor(smartContractMethodName: string, sigs: any[], args: any[]);
}
export declare class InvalidDelegationSource implements Error {
    source: string;
    name: string;
    message: string;
    constructor(source: string);
}
