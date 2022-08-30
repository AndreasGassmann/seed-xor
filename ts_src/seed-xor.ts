import * as bip39 from 'bip39';
import {
  getDeterministicEntropyFromMnemonic,
  getRandomEntropy,
  bitwiseXorHexString,
} from './utils';

// https://github.com/Coldcard/firmware/blob/master/shared/xor_seed.py

export const split = async (
  mnemonic: string,
  numberOfShares: 2 | 3 | 4 = 2,
  useRandom = false,
): Promise<string[]> => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('[SeedXOR]: Invalid mnemonic');
  }

  if (numberOfShares < 2 || numberOfShares > 4) {
    throw new Error('[SeedXOR]: Invalid number of shares');
  }

  const shares: string[] = [];

  for (let i = 0; i < numberOfShares - 1; i++) {
    shares[i] = useRandom
      ? await getRandomEntropy()
      : await getDeterministicEntropyFromMnemonic(
          mnemonic,
          i + 1,
          numberOfShares,
        );
  }

  shares.push(
    bitwiseXorHexString([bip39.mnemonicToEntropy(mnemonic), ...shares]),
  );

  return shares.map((share) => bip39.entropyToMnemonic(share));
};

export const combine = (shares: string[]): Promise<string> => {
  if (shares.some((share) => !bip39.validateMnemonic(share))) {
    throw new Error('[SeedXOR]: Invalid mnemonic');
  }

  const entropies = shares.map((share) => bip39.mnemonicToEntropy(share));

  if (entropies.some((entropy) => entropy.length !== entropies[0].length)) {
    throw new Error('[SeedXOR]: Not all mnemonics are the same length');
  }

  return Promise.resolve(
    bip39.entropyToMnemonic(bitwiseXorHexString(entropies)),
  );
};
