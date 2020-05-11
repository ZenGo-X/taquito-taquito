import { OperationEmitter } from '../operations/operation-emitter';
import { DelegateParams, OriginateParams, ParamsWithKind, RegisterDelegateParams, TransferParams } from '../operations/types';
import { Estimate } from './estimate';
import { EstimationProvider } from './interface';
export declare class RPCEstimateProvider extends OperationEmitter implements EstimationProvider {
    private readonly ALLOCATION_STORAGE;
    private readonly ORIGINATION_STORAGE;
    private getAccountLimits;
    private createEstimateFromOperationContent;
    private createEstimate;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an origination operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param OriginationOperation Originate operation parameter
     */
    originate({ fee, storageLimit, gasLimit, source, publicKey, ...rest }: OriginateParams): Promise<Estimate>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for an transfer operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param TransferOperation Originate operation parameter
     */
    transfer({ storageLimit, gasLimit, source, publicKey, ...rest }: TransferParams): Promise<Estimate>;
    isDelegated(address: string): Promise<boolean>;
    isNewImplicitAccount(address: string): Promise<boolean>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    setDelegate(params: DelegateParams): Promise<Estimate>;
    batch(params: ParamsWithKind[], publicKey?: string): Promise<Estimate[]>;
    /**
     *
     * @description Estimate gasLimit, storageLimit and fees for a delegate operation
     *
     * @returns An estimation of gasLimit, storageLimit and fees for the operation
     *
     * @param Estimate
     */
    registerDelegate(params: RegisterDelegateParams): Promise<Estimate>;
}
