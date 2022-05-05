"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomValues = void 0;
const nanoid_1 = require("nanoid");
class RandomValues {
    static numbersGenerator(length = 6) {
        return Number((0, nanoid_1.customAlphabet)("123456789", length)());
    }
    static stringGenerator(length = 6, includeNumbers = true) {
        const alphabet = includeNumbers ? "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return (0, nanoid_1.customAlphabet)(alphabet, length)();
    }
}
exports.RandomValues = RandomValues;
