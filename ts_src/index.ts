import {
  bitwiseXorHexString,
  getDeterministicEntropyFromMnemonic,
  getRandomEntropy,
  hexToUint8Array,
  mnemonicToEntropyLength,
  sha256Double,
  toHexString,
} from './utils.js';

export { split, combine } from './seed-xor.js';

const utils = {
  sha256Double,
  getRandomEntropy,
  toHexString,
  hexToUint8Array,
  bitwiseXorHexString,
  mnemonicToEntropyLength,
  getDeterministicEntropyFromMnemonic,
};

export { utils };
