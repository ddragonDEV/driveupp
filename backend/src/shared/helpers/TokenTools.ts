import jwt from "jsonwebtoken";
import { UnauthorizedError } from "routing-controllers";

export class TokenTools {
    static generateJWT(payload, expiration = "1h", secretKey) {
        return new Promise<String>((resolve, reject) => {
            jwt.sign(
                payload,
                secretKey,
                { expiresIn: expiration },
                (err, token) => {
                    if (err) throw err;
                    resolve(token);
                }
            );
        });
    }

    static getPayloadJWT(token, secretKey) {
        return jwt.verify(token, secretKey, (error, decoded) => {
            if (error?.name === "TokenExpiredError") {
                return jwt.verify(token, secretKey, { ignoreExpiration: true });
            }
            if (error) throw new UnauthorizedError("Token inválido");

            return decoded;
        });
    }

    static verifyJWT(token, secretKey) {
        return jwt.verify(token, secretKey, (error, decoded) => {
            if (error) throw new UnauthorizedError("Token inválido");
            return decoded;
        });
    }

    static transforDotToPesosSymbol(token) {
        return token.split(".").join("$");
    }

    static transformPesosSymbolToDot(token) {
        return token.split("$").join(".");
    };
}