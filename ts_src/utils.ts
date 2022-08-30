import * as bip39 from 'bip39';
import * as createHash from 'create-hash';

export const toHexString = (bytes: Uint8Array): string =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export const bitwiseXorHexString = (hexStrings: string[]): string => {
  let result = '';
  for (let index = 0; index < hexStrings[0].length; index++) {
    let temp = parseInt(hexStrings[0].charAt(index), 16);
    for (let x = 1; x < hexStrings.length; x++) {
      temp = temp ^ parseInt(hexStrings[x].charAt(index), 16);
    }
    result += temp.toString(16).toUpperCase();
  }
  return result;
};

export const sha256 = (value: string | Buffer | Uint32Array): string => {
  const hash: Uint8Array = createHash('sha256').update(value).digest();

  return toHexString(hash);
};

export const getRandomEntropy = (): Promise<string> => {
  const randomBuffer: Uint32Array = new Uint32Array(32);

  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(randomBuffer);
  } else {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    const webcrypto: Crypto = require('crypto').webcrypto;
    webcrypto.getRandomValues(randomBuffer);
  }

  return Promise.resolve(sha256(sha256(randomBuffer)));
};

export const getDeterministicEntropyFromMnemonic = (
  mnemonic: string,
  part: number,
  nofParts: number,
): Promise<string> => {
  const salt = 'Batshitoshi';
  const rawSecret = bip39.mnemonicToEntropy(mnemonic);
  const partsText = `${part} of ${nofParts} parts`;

  const str = `${salt} ${rawSecret} ${partsText}`;

  return Promise.resolve(sha256(str));
};
