"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRespository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const env_module_1 = require("@modules/env.module");
const session_schema_1 = require("../schemas/session.schema");
class SessionRespository {
    async getSessionByToken(token) {
        return await session_schema_1.SessionModel.findOne({ token });
    }
    async getSessionByEmail(email) {
        return await session_schema_1.SessionModel.findOne({ email });
    }
    async create(entry) {
        entry["expirationDate"] = (0, dayjs_1.default)().add(env_module_1.AppEnv.EXPIRATION_SESSION_IN_DB, "second");
        const newSession = new session_schema_1.SessionModel(entry);
        return await newSession.save();
    }
    async deleteSession(id) {
        return await session_schema_1.SessionModel.findByIdAndRemove(id);
    }
    async deleteAllSessionsByUserId(userId) {
        return await session_schema_1.SessionModel.deleteMany({ userId });
    }
}
exports.SessionRespository = SessionRespository;
