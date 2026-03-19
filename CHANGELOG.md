# 1.0.0

- **BREAKING**: Convert to ESM (`"type": "module"`) with `NodeNext` module resolution
- **BREAKING**: Require Node.js >= 20.19.0
- **BREAKING**: `sha256Double` now only accepts `Uint8Array` (previously also accepted `string`)
- Add support for 18-word mnemonics
- Export additional utility functions: `toHexString`, `hexToUint8Array`, `bitwiseXorHexString`, `mnemonicToEntropyLength`, `getDeterministicEntropyFromMnemonic`
- Accept `salt` as a parameter in `getDeterministicEntropyFromMnemonic` instead of hardcoding
- Update `@noble/hashes` from 1.5.0 to 2.0.1 (import path changed from `/sha256` to `/sha2.js`)
- Update TypeScript from 4.x to 5.x
- Update ESLint from 8.x to 10.x (migrated to flat config)
- Update Prettier from 2.x to 3.x
- Replace `tape`/`nyc`/`ts-node` test stack with `vitest`
- Add test vectors from Coldcard firmware reference implementation (12, 18, 24 words)
- Add edge case tests (zero seeds, ones seeds)

# 0.0.2

- Make sure deterministic entropy from seed is the same as ColdCard
- Add support for 12 word mnemonics
- Add check for mnemonic length (only 12 or 24 words are supported)
- 100% test coverage

# 0.0.1

- Initial implementation of [Seed XOR](https://seedxor.com/)