# Seed XOR

[![GitHub Action](https://github.com/AndreasGassmann/seed-xor/workflows/Build%2C%20Test%20and%20Analyze/badge.svg)](https://github.com/AndreasGassmann/seed-xor/actions?query=workflow%3A%22Build%2C+Test+and+Analyze%22+branch%3Amain)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AndreasGassmann_seed-xor&metric=alert_status)](https://sonarcloud.io/dashboard?id=AndreasGassmann_seed-xor)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=AndreasGassmann_seed-xor&metric=coverage)](https://sonarcloud.io/dashboard?id=AndreasGassmann_seed-xor)
[![npm](https://img.shields.io/npm/v/seed-xor.svg?colorB=brightgreen)](https://www.npmjs.com/package/seed-xor)

TypeScript/JavaScript implementation of [Seed XOR](https://seedxor.com): A simple way of securing seeds.

# DISCLAIMER

This project is in an early development phase and has not been audited or reviewed. Use it at your own risk.

## Description

Seed XOR allows you to split up your seed into multiple parts. The parts can then be used to reconstruct the original seed.

Read more about the concepts behind SeedXOR on the official website: [Seed XOR](https://seedxor.com)

## Installation

```
npm install seed-xor
```

## Example

```typescript
import { combine, split } from 'seed-xor';

const original =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art';

(async () => {
  console.log('Original:', original);

  const [share1, share2, share3] = await split(original, 3, true);

  console.log('Share 1:', share1);
  console.log('Share 2:', share2);
  console.log('Share 3:', share3);

  const recovered = await combine([share1, share2, share3]);

  console.log('Recovered:', recovered);
})();
```

For more examples, check the [examples](/examples/) folder or the [tests](/test/).

## Documentation

This library exports two methods, `split` and `combine`.

#### Split

`split` is used to split an existing seed into multiple shares. It takes 3 parameters:

`split(mnemonic: string, numberOfShares: 2 | 3 | 4 = 2, useRandom = false): Promise<string[]>`

`mnemonic`: The seed that should be split.
`numberOfShares`: The number of shares that you want to split your mnemonic into. **You need ALLx shares to recover your seed phrase**.
`useRandom`: If set to true, the shares will be generated randomly. This means that if you use SeedXOR with the same seed multiple times, you will get **different** shares. If set to false, you will always get the same shares.

#### Combine

`combine` is used to combine SeedXOR shares and reconstruct the original seed phrase. **Remember: You need ALL shares to recover your seed phrase**.

`split(shares: string[]): Promise<string>`

`shares`: An array of shares that will be used to recover the original seed phrase.

## Testing

```bash

npm install
npm test

-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   98.52 |    93.75 |     100 |   98.03 |
 index.ts    |     100 |      100 |     100 |     100 |
 seed-xor.ts |     100 |      100 |     100 |     100 |
 utils.ts    |   97.22 |       50 |     100 |   96.42 | 29
-------------|---------|----------|---------|---------|-------------------
```

## TODOs

- [ ] Fix sonarsource coverage not working
- [ ] Audit/review of library by 3rd party

## Dependencies

We try to use only a minimal set of dependencies to reduce the attack surface of malicious code being added by one of those dependencies.

There are only 2 (non-dev) dependencies:

- [bip39](https://www.npmjs.com/package/bip39)
- [create-hash](https://www.npmjs.com/package/create-hash)

1 of those repositories is owned by the [bitcoinjs](https://github.com/bitcoinjs) organization, one of them is managed by [crypto-browserify](https://github.com/crypto-browserify).

## Usages

Currently, the following wallets support or are working on integrating SeedXOR:

- [Coldcard](https://coldcard.com)
- [AirGap Vault (planned)](https://github.com/airgap-it/airgap-vault)

## Credits

The project setup has been inspired by multiple bitcoinjs libraries, such as [bip39](https://www.npmjs.com/package/bip39) and [bip85](https://www.npmjs.com/package/bip85).

## LICENSE

MIT
