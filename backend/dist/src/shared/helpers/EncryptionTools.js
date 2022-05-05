"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionTools = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class EncryptionTools {
    static encryptPassword(password) {
        return bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
    }
    static isSamePassword(password1, password2) {
        return bcryptjs_1.default.compareSync(password1, password2);
    }
}
exports.EncryptionTools = EncryptionTools;
