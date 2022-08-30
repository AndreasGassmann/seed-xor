"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combine = exports.split = void 0;
const bip39 = require("bip39");
const utils_1 = require("./utils");
// https://github.com/Coldcard/firmware/blob/master/shared/xor_seed.py
const split = async (mnemonic, numberOfShares = 2, useRandom = false) => {
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('[SeedXOR]: Invalid mnemonic');
    }
    if (numberOfShares < 2 || numberOfShares > 4) {
        throw new Error('[SeedXOR]: Invalid number of shares');
    }
    const shares = [];
    for (let i = 0; i < numberOfShares - 1; i++) {
        shares[i] = useRandom
            ? await (0, utils_1.getRandomEntropy)()
            : await (0, utils_1.getDeterministicEntropyFromMnemonic)(mnemonic, i + 1, numberOfShares);
    }
    shares.push((0, utils_1.bitwiseXorHexString)([bip39.mnemonicToEntropy(mnemonic), ...shares]));
    return shares.map((share) => bip39.entropyToMnemonic(share));
};
exports.split = split;
const combine = (shares) => {
    if (shares.some((share) => !bip39.validateMnemonic(share))) {
        throw new Error('[SeedXOR]: Invalid mnemonic');
    }
    const entropies = shares.map((share) => bip39.mnemonicToEntropy(share));
    if (entropies.some((entropy) => entropy.length !== entropies[0].length)) {
        throw new Error('[SeedXOR]: Not all mnemonics are the same length');
    }
    return Promise.resolve(bip39.entropyToMnemonic((0, utils_1.bitwiseXorHexString)(entropies)));
};
exports.combine = combine;
