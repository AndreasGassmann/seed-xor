import { getRandomEntropy, sha256 } from './utils';

export { split, combine } from './seed-xor';

const utils = {
  sha256,
  getRandomEntropy,
};

export { utils };
