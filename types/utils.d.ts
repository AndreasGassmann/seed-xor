export declare const toHexString: (bytes: Uint8Array) => string;
export declare const hexToUint8Array: (hexString: string) => Uint8Array;
export declare const mnemonicToEntropyLength: (mnemonic: string) => number;
export declare const bitwiseXorHexString: (hexStrings: string[]) => string;
export declare const sha256Double: (data: Uint8Array) => Uint8Array;
export declare const getRandomEntropy: (length?: number) => Promise<string>;
export declare const getDeterministicEntropyFromMnemonic: (salt: string, mnemonic: string, part: number, nofParts: number, entropyLength: number) => Promise<string>;
