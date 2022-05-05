"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalEmailRepository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const temporalEmail_schema_1 = require("../schemas/temporalEmail.schema");
const env_module_1 = require("@modules/env.module");
class TemporalEmailRepository {
    async deleteEmail(email, pin) {
        return await temporalEmail_schema_1.TemporalEmailModel.deleteOne({ email, pin });
    }
    async getEmail(email, pin) {
        return await temporalEmail_schema_1.TemporalEmailModel.findOne({ email, pin });
    }
    async register(entry) {
        entry["expirationDate"] = (0, dayjs_1.default)().add(env_module_1.AppEnv.EXPIRATION_TEMPORAL_TOKEN_IN_DB, "second");
        const newEmail = new temporalEmail_schema_1.TemporalEmailModel(entry);
        return await newEmail.save();
    }
    async deleteByToken(token) {
        return await temporalEmail_schema_1.TemporalEmailModel.findOneAndDelete({ token });
    }
}
exports.TemporalEmailRepository = TemporalEmailRepository;
