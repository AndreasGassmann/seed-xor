import * as tape from 'tape';
import {
  bitwiseXorHexString,
  getRandomEntropy,
  hexToUint8Array,
  mnemonicToEntropyLength,
  toHexString,
} from '../ts_src/utils';

tape('hex to uint8array and back', async (t) => {
  const input = '00';

  const result = hexToUint8Array(input);

  t.deepEqual(result, new Uint8Array([0]));

  const reconstructed = toHexString(result);

  t.equal(reconstructed, input);

  t.end();
});

tape('invalid hex string length', async (t) => {
  const input = '0';

  try {
    hexToUint8Array(input);
  } catch (error: any) {
    t.equal(error.message, '[SeedXOR]: Hex string must have an even length');
  }

  t.end();
});

tape('invalid hex string characters', async (t) => {
  const input = '0z';

  try {
    hexToUint8Array(input);
  } catch (error: any) {
    t.equal(error.message, '[SeedXOR]: Hex string contains invalid characters');
  }

  t.end();
});

tape('mnemonic to entropy length', async (t) => {
  {
    const length = mnemonicToEntropyLength('1 2 3 4 5 6 7 8 9 10 11 12');
    t.equal(length, 16);
  }
  {
    const length = mnemonicToEntropyLength(
      '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 34',
    );
    t.equal(length, 32);
  }

  t.end();
});

tape('invalid mnemonic lengths', async (t) => {
  try {
    mnemonicToEntropyLength('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15');
  } catch (error: any) {
    t.equal(error.message, '[SeedXOR]: Invalid mnemonic length');
  }

  t.end();
});

tape('xor bitwise hex string', async (t) => {
  {
    const result = bitwiseXorHexString(['00', '00']);
    t.equal(result, '00');
  }
  {
    const result = bitwiseXorHexString(['00', '01']);
    t.equal(result, '01');
  }
  {
    const result = bitwiseXorHexString(['00', '10']);
    t.equal(result, '10');
  }
  {
    const result = bitwiseXorHexString(['00', '11']);
    t.equal(result, '11');
  }

  {
    const result = bitwiseXorHexString(['01', '00']);
    t.equal(result, '01');
  }
  {
    const result = bitwiseXorHexString(['01', '01']);
    t.equal(result, '00');
  }
  {
    const result = bitwiseXorHexString(['01', '10']);
    t.equal(result, '11');
  }
  {
    const result = bitwiseXorHexString(['01', '11']);
    t.equal(result, '10');
  }

  {
    const result = bitwiseXorHexString(['10', '00']);
    t.equal(result, '10');
  }
  {
    const result = bitwiseXorHexString(['10', '01']);
    t.equal(result, '11');
  }
  {
    const result = bitwiseXorHexString(['10', '10']);
    t.equal(result, '00');
  }
  {
    const result = bitwiseXorHexString(['10', '11']);
    t.equal(result, '01');
  }

  {
    const result = bitwiseXorHexString(['11', '00']);
    t.equal(result, '11');
  }
  {
    const result = bitwiseXorHexString(['11', '01']);
    t.equal(result, '10');
  }
  {
    const result = bitwiseXorHexString(['11', '10']);
    t.equal(result, '01');
  }
  {
    const result = bitwiseXorHexString(['11', '11']);
    t.equal(result, '00');
  }

  t.end();
});

tape('xor bitwise hex string with different lengths', async (t) => {
  try {
    bitwiseXorHexString(['00', '0100']);
  } catch (error: any) {
    t.equal(
      error.message,
      '[SeedXOR]: Not all input shares are the same length',
    );
  }

  t.end();
});

tape('get random entropy with no window object', async (t) => {
  (globalThis as any).window = {
    crypto: { getRandomValues: (length: number) => new Uint8Array(length) },
  };
  const result = await getRandomEntropy();

  t.equal(result.length, 64);
  (globalThis as any).window = undefined;

  t.end();
});
