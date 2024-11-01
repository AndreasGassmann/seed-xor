export { split, combine } from './seed-xor';
declare const utils: {
    sha256Double: (data: string | Uint8Array) => Uint8Array;
    getRandomEntropy: (length?: number) => Promise<string>;
};
export { utils };
