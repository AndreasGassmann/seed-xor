# Seed XOR

[![GitHub Action](https://github.com/AndreasGassmann/seed-xor/workflows/Build%20and%20Test/badge.svg)](https://github.com/AndreasGassmann/seed-xor/actions?query=workflow%3A%22Build+and+Test%22+branch%3Amain)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/seed-xor.svg?colorB=brightgreen)](https://www.npmjs.com/package/seed-xor)

TypeScript/JavaScript implementation of [Seed XOR](https://seedxor.com): A simple way of securing seeds.

## Description

Seed XOR allows you to split up your BIP-39 seed phrase into multiple parts. The parts can then be used to reconstruct the original seed. Each part is itself a valid BIP-39 mnemonic, so it can be stored and backed up like any normal seed phrase.

Supports 12, 18, and 24-word mnemonics.

Read more about the concepts behind Seed XOR on the official website: [seedxor.com](https://seedxor.com)

## Installation

```
npm install seed-xor
```

Requires Node.js >= 20.19.0. This package is ESM-only.

## Example

```typescript
import { combine, split } from 'seed-xor';

const original =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

const [share1, share2, share3] = await split(original, 3, true);

console.log('Share 1:', share1);
console.log('Share 2:', share2);
console.log('Share 3:', share3);

const recovered = await combine([share1, share2, share3]);

console.log('Recovered:', recovered);
```

For more examples, check the [examples](/examples/) folder or the [tests](/test/).

## Documentation

This library exports two methods, `split` and `combine`.

#### Split

`split` is used to split an existing seed into multiple shares. It takes 3 parameters:

`split(mnemonic: string, numberOfShares: 2 | 3 | 4 = 2, useRandom = false): Promise<string[]>`

- `mnemonic`: The seed that should be split. Must be a valid BIP-39 mnemonic (12, 18, or 24 words).
- `numberOfShares`: The number of shares to split into (2, 3, or 4). **You need ALL shares to recover your seed phrase.**
- `useRandom`: If `true`, shares are generated randomly (different each time). If `false` (default), shares are generated deterministically (same seed always produces the same shares), matching the Coldcard implementation.

#### Combine

`combine` is used to combine Seed XOR shares and reconstruct the original seed phrase. **You need ALL shares to recover your seed phrase.**

`combine(shares: string[]): Promise<string>`

- `shares`: An array of shares to combine. All shares must be the same word length. Can be provided in any order.

## Testing

```bash
npm install
npm test
```

Test vectors are sourced from:

- [Coldcard firmware reference implementation](https://github.com/Coldcard/firmware/blob/master/docs/seed-xor.md)
- [Coldcard firmware test suite](https://github.com/Coldcard/firmware/blob/master/testing/test_seed_xor.py)
- [Rust seedxor library](https://github.com/nicbus/seedxor)

## Dependencies

We try to use only a minimal set of dependencies to reduce the attack surface of malicious code being added by one of those dependencies.

There are only 2 (non-dev) dependencies:

- [bip39](https://www.npmjs.com/package/bip39) (by [bitcoinjs](https://github.com/bitcoinjs))
- [@noble/hashes](https://www.npmjs.com/package/@noble/hashes) (by [paulmillr](https://github.com/paulmillr/noble-hashes))

## Usages

Currently, the following wallets support or are working on integrating Seed XOR:

- [Coldcard](https://coldcard.com)
- [AirGap Vault (planned)](https://github.com/airgap-it/airgap-vault)

## Credits

The project setup has been inspired by multiple bitcoinjs libraries, such as [bip39](https://www.npmjs.com/package/bip39) and [bip85](https://www.npmjs.com/package/bip85).

## LICENSE

MIT
