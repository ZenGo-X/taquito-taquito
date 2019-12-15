export declare class Estimate {
    private readonly _gasLimit;
    private readonly _storageLimit;
    private readonly opSize;
    /**
     * @description Base fee in mutez (1 mutez = 1e10−6 tez)
     */
    private readonly baseFeeMutez;
    constructor(_gasLimit: number | string, _storageLimit: number | string, opSize: number | string, 
    /**
     * @description Base fee in mutez (1 mutez = 1e10−6 tez)
     */
    baseFeeMutez?: number | string);
    /**
     * @description Burn fee in mutez
     */
    readonly burnFeeMutez: number;
    /**
     * @description Get the estimated storage limit
     */
    readonly storageLimit: number;
    /**
     * @description Suggested gasLimit for operation
     */
    readonly gasLimit: number;
    private readonly operationFeeMutez;
    private roundUp;
    /**
     * @description Minimum fees for operation according to baker defaults
     */
    readonly minimalFeeMutez: number;
    /**
     * @description Suggested fee for operation (minimal fees plus a small buffer)
     */
    readonly suggestedFeeMutez: number;
    /**
     * @description Fees according to your specified base fee will ensure that at least minimum fees are used
     */
    readonly usingBaseFeeMutez: number;
    readonly totalCost: number;
}
