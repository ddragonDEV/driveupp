import { customAlphabet } from "nanoid";

export class RandomValues {
    static numbersGenerator(length = 6) {
        return Number(customAlphabet("123456789", length)());
    }

    static stringGenerator(length = 6, includeNumbers = true) {
        const alphabet = includeNumbers ? "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return customAlphabet(alphabet, length)();
    }
}