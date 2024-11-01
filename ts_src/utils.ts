import * as bip39 from 'bip39';
import * as createHash from 'create-hash';

export const toHexString = (bytes: Uint8Array): string =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

export const hexToUint8Array = (hexString: string): Uint8Array => {
  // Ensure the hex string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error('[SeedXOR]: Hex string must have an even length');
  }

  // Validate characters are all valid hexadecimal
  if (!/^[\da-fA-F]+$/.test(hexString)) {
    throw new Error('[SeedXOR]: Hex string contains invalid characters');
  }

  const array = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    array[i / 2] = parseInt(hexString.slice(i, i + 2), 16);
  }
  return array;
};

export const mnemonicToEntropyLength = (mnemonic: string): number => {
  const parts = mnemonic.split(' ');

  if (parts.length === 12) {
    return 16;
  } else if (parts.length === 24) {
    return 32;
  }

  throw new Error('[SeedXOR]: Invalid mnemonic length');
};

export const bitwiseXorHexString = (hexStrings: string[]): string => {
  if (hexStrings.some((hex) => hex.length !== hexStrings[0].length)) {
    throw new Error('[SeedXOR]: Not all input shares are the same length');
  }

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

export const sha256Double = (data: Uint8Array | string): Uint8Array => {
  const hash1 = createHash('sha256').update(data).digest();
  return createHash('sha256').update(hash1).digest();
};

export const getRandomEntropy = async (length = 32): Promise<string> => {
  const randomBuffer: Uint8Array = new Uint8Array(length);

  if (typeof window !== 'undefined') {
    window.crypto.getRandomValues(randomBuffer);
  } else {
    const webcrypto: Crypto = require('crypto').webcrypto; // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    webcrypto.getRandomValues(randomBuffer);
  }

  return toHexString(sha256Double(randomBuffer).slice(0, length));
};

export const getDeterministicEntropyFromMnemonic = async (
  mnemonic: string,
  part: number,
  nofParts: number,
  entropyLength: number,
): Promise<string> => {
  const salt = 'Batshitoshi ';
  const originalEntropy = bip39.mnemonicToEntropy(mnemonic);
  const partsText = `${part} of ${nofParts} parts`;

  const prefix = new TextEncoder().encode(salt);
  const rawSecret = hexToUint8Array(originalEntropy);
  const partInfo = new TextEncoder().encode(partsText);

  const data = new Uint8Array([...prefix, ...rawSecret, ...partInfo]);

  const entropy = sha256Double(data).slice(0, entropyLength);

  return toHexString(entropy);
};
