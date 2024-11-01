import { getRandomEntropy, sha256Double } from './utils';

export { split, combine } from './seed-xor';

const utils = {
  sha256Double,
  getRandomEntropy,
};

export { utils };
