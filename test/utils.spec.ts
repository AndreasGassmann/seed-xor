import { test, expect } from 'vitest';
import {
  bitwiseXorHexString,
  getRandomEntropy,
  hexToUint8Array,
  mnemonicToEntropyLength,
  toHexString,
} from '../ts_src/utils.js';

test('hex to uint8array and back', async () => {
  const input = '00';

  const result = hexToUint8Array(input);

  expect(result).toEqual(new Uint8Array([0]));

  const reconstructed = toHexString(result);

  expect(reconstructed).toBe(input);
});

test('invalid hex string length', async () => {
  expect(() => hexToUint8Array('0')).toThrow(
    '[SeedXOR]: Hex string must have an even length',
  );
});

test('invalid hex string characters', async () => {
  expect(() => hexToUint8Array('0z')).toThrow(
    '[SeedXOR]: Hex string contains invalid characters',
  );
});

test('mnemonic to entropy length', async () => {
  {
    const length = mnemonicToEntropyLength('1 2 3 4 5 6 7 8 9 10 11 12');
    expect(length).toBe(16);
  }
  {
    const length = mnemonicToEntropyLength(
      '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18',
    );
    expect(length).toBe(24);
  }
  {
    const length = mnemonicToEntropyLength(
      '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 34',
    );
    expect(length).toBe(32);
  }
});

test('invalid mnemonic lengths', async () => {
  expect(() =>
    mnemonicToEntropyLength('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15'),
  ).toThrow('[SeedXOR]: Invalid mnemonic length');
});

test('xor bitwise hex string', async () => {
  expect(bitwiseXorHexString(['00', '00'])).toBe('00');
  expect(bitwiseXorHexString(['00', '01'])).toBe('01');
  expect(bitwiseXorHexString(['00', '10'])).toBe('10');
  expect(bitwiseXorHexString(['00', '11'])).toBe('11');

  expect(bitwiseXorHexString(['01', '00'])).toBe('01');
  expect(bitwiseXorHexString(['01', '01'])).toBe('00');
  expect(bitwiseXorHexString(['01', '10'])).toBe('11');
  expect(bitwiseXorHexString(['01', '11'])).toBe('10');

  expect(bitwiseXorHexString(['10', '00'])).toBe('10');
  expect(bitwiseXorHexString(['10', '01'])).toBe('11');
  expect(bitwiseXorHexString(['10', '10'])).toBe('00');
  expect(bitwiseXorHexString(['10', '11'])).toBe('01');

  expect(bitwiseXorHexString(['11', '00'])).toBe('11');
  expect(bitwiseXorHexString(['11', '01'])).toBe('10');
  expect(bitwiseXorHexString(['11', '10'])).toBe('01');
  expect(bitwiseXorHexString(['11', '11'])).toBe('00');
});

test('xor bitwise hex string with different lengths', async () => {
  expect(() => bitwiseXorHexString(['00', '0100'])).toThrow(
    '[SeedXOR]: Not all input shares are the same length',
  );
});

test('get random entropy', async () => {
  const result = await getRandomEntropy();
  expect(result.length).toBe(64);
});
