export { split, combine } from './seed-xor.js';
declare const utils: {
    sha256Double: (data: Uint8Array) => Uint8Array;
    getRandomEntropy: (length?: number) => Promise<string>;
    toHexString: (bytes: Uint8Array) => string;
    hexToUint8Array: (hexString: string) => Uint8Array;
    bitwiseXorHexString: (hexStrings: string[]) => string;
    mnemonicToEntropyLength: (mnemonic: string) => number;
    getDeterministicEntropyFromMnemonic: (salt: string, mnemonic: string, part: number, nofParts: number, entropyLength: number) => Promise<string>;
};
export { utils };
