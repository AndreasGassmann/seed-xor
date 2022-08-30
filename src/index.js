"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.combine = exports.split = void 0;
const utils_1 = require("./utils");
var seed_xor_1 = require("./seed-xor");
Object.defineProperty(exports, "split", { enumerable: true, get: function () { return seed_xor_1.split; } });
Object.defineProperty(exports, "combine", { enumerable: true, get: function () { return seed_xor_1.combine; } });
const utils = {
    sha256: utils_1.sha256,
    getRandomEntropy: utils_1.getRandomEntropy,
};
exports.utils = utils;
