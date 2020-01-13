import { Signer } from './interface';
/**
 * @description Default signer implementation which does nothing and produce invalid signature
 */
export declare class NoopSigner implements Signer {
    publicKey(): Promise<string>;
    publicKeyHash(): Promise<string>;
    secretKey(): Promise<string>;
    sign(bytes: string, _watermark?: Uint8Array): Promise<{
        bytes: string;
        sig: string;
        prefixSig: string;
        sbytes: string;
    }>;
}
