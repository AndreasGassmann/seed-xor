/// <reference types="node" />
export { split, combine } from './seed-xor';
declare const utils: {
    sha256: (value: string | Uint32Array | Buffer) => string;
    getRandomEntropy: () => Promise<string>;
};
export { utils };
