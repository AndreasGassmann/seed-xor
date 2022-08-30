/// <reference types="node" />
export declare const toHexString: (bytes: Uint8Array) => string;
export declare const bitwiseXorHexString: (hexStrings: string[]) => string;
export declare const sha256: (value: string | Buffer | Uint32Array) => string;
export declare const getRandomEntropy: () => Promise<string>;
export declare const getDeterministicEntropyFromMnemonic: (mnemonic: string, part: number, nofParts: number) => Promise<string>;
