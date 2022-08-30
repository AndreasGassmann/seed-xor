"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeterministicEntropyFromMnemonic = exports.getRandomEntropy = exports.sha256 = exports.bitwiseXorHexString = exports.toHexString = void 0;
const bip39 = require("bip39");
const createHash = require("create-hash");
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
exports.toHexString = toHexString;
const bitwiseXorHexString = (hexStrings) => {
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
const sha256 = (value) => {
    const hash = createHash('sha256').update(value).digest();
    return (0, exports.toHexString)(hash);
};
exports.sha256 = sha256;
const getRandomEntropy = () => {
    const randomBuffer = new Uint32Array(32);
    if (typeof window !== 'undefined') {
        window.crypto.getRandomValues(randomBuffer);
    }
    else {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        const webcrypto = require('crypto').webcrypto;
        webcrypto.getRandomValues(randomBuffer);
    }
    return Promise.resolve((0, exports.sha256)((0, exports.sha256)(randomBuffer)));
};
exports.getRandomEntropy = getRandomEntropy;
const getDeterministicEntropyFromMnemonic = (mnemonic, part, nofParts) => {
    const salt = 'Batshitoshi';
    const rawSecret = bip39.mnemonicToEntropy(mnemonic);
    const partsText = `${part} of ${nofParts} parts`;
    const str = `${salt} ${rawSecret} ${partsText}`;
    return Promise.resolve((0, exports.sha256)(str));
};
exports.getDeterministicEntropyFromMnemonic = getDeterministicEntropyFromMnemonic;
