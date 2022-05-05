"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTools = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
class TokenTools {
    static generateJWT(payload, expiration = "1h", secretKey) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiration }, (err, token) => {
                if (err)
                    throw err;
                resolve(token);
            });
        });
    }
    static getPayloadJWT(token, secretKey) {
        return jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
            if ((error === null || error === void 0 ? void 0 : error.name) === "TokenExpiredError") {
                return jsonwebtoken_1.default.verify(token, secretKey, { ignoreExpiration: true });
            }
            if (error)
                throw new routing_controllers_1.UnauthorizedError("Token inválido");
            return decoded;
        });
    }
    static verifyJWT(token, secretKey) {
        return jsonwebtoken_1.default.verify(token, secretKey, (error, decoded) => {
            if (error)
                throw new routing_controllers_1.UnauthorizedError("Token inválido");
            return decoded;
        });
    }
    static transforDotToPesosSymbol(token) {
        return token.split(".").join("$");
    }
    static transformPesosSymbolToDot(token) {
        return token.split("$").join(".");
    }
    ;
}
exports.TokenTools = TokenTools;
