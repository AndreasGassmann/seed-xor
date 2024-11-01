"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeterministicEntropyFromMnemonic = exports.getRandomEntropy = exports.sha256Double = exports.bitwiseXorHexString = exports.mnemonicToEntropyLength = exports.hexToUint8Array = exports.toHexString = void 0;
const bip39 = require("bip39");
const sha256_1 = require("@noble/hashes/sha256");
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
exports.toHexString = toHexString;
const hexToUint8Array = (hexString) => {
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
exports.hexToUint8Array = hexToUint8Array;
const mnemonicToEntropyLength = (mnemonic) => {
    const parts = mnemonic.split(' ');
    if (parts.length === 12) {
        return 16;
    }
    else if (parts.length === 24) {
        return 32;
    }
    throw new Error('[SeedXOR]: Invalid mnemonic length');
};
exports.mnemonicToEntropyLength = mnemonicToEntropyLength;
const bitwiseXorHexString = (hexStrings) => {
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
exports.bitwiseXorHexString = bitwiseXorHexString;
const sha256Double = (data) => {
    return (0, sha256_1.sha256)((0, sha256_1.sha256)(data));
};
exports.sha256Double = sha256Double;
const getRandomEntropy = async (length = 32) => {
    const randomBuffer = new Uint8Array(length);
    if (typeof window !== 'undefined') {
        window.crypto.getRandomValues(randomBuffer);
    }
    else {
        const webcrypto = require('crypto').webcrypto; // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        webcrypto.getRandomValues(randomBuffer);
    }
    return (0, exports.toHexString)((0, exports.sha256Double)(randomBuffer).slice(0, length));
};
exports.getRandomEntropy = getRandomEntropy;
const getDeterministicEntropyFromMnemonic = async (mnemonic, part, nofParts, entropyLength) => {
    const salt = 'Batshitoshi ';
    const originalEntropy = bip39.mnemonicToEntropy(mnemonic);
    const partsText = `${part} of ${nofParts} parts`;
    const prefix = new TextEncoder().encode(salt);
    const rawSecret = (0, exports.hexToUint8Array)(originalEntropy);
    const partInfo = new TextEncoder().encode(partsText);
    const data = new Uint8Array([...prefix, ...rawSecret, ...partInfo]);
    const entropy = (0, exports.sha256Double)(data).slice(0, entropyLength);
    return (0, exports.toHexString)(entropy);
};
exports.getDeterministicEntropyFromMnemonic = getDeterministicEntropyFromMnemonic;
