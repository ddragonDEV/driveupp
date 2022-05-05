"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPushEnv = exports.AppEnv = exports.NodemailerEnv = exports.MongoEnv = exports.SocketIOEnv = exports.ExpressEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Express_config_1 = require("@config/Express.config");
const SocketIO_config_1 = require("@config/SocketIO.config");
const Mongo_config_1 = require("@config/Mongo.config");
const Nodemailer_config_1 = require("@config/Nodemailer.config");
const App_config_1 = require("@config/App.config");
class ExpressEnv {
}
exports.ExpressEnv = ExpressEnv;
ExpressEnv.PORT = Number(process.env.PORT) || Express_config_1.ExpressConfig.PORT;
class SocketIOEnv {
}
exports.SocketIOEnv = SocketIOEnv;
SocketIOEnv.PORT = Number(process.env.PORT) || SocketIO_config_1.SocketIOConfig.PORT;
class MongoEnv {
}
exports.MongoEnv = MongoEnv;
MongoEnv.CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || Mongo_config_1.MongoConfig.CONNECTION_STRING;
class NodemailerEnv {
}
exports.NodemailerEnv = NodemailerEnv;
_a = NodemailerEnv;
NodemailerEnv.HOST = process.env.EMAIL_HOST || Nodemailer_config_1.NodemailerConfig.HOST || undefined;
NodemailerEnv.PORT = Number(process.env.EMAIL_PORT) || Nodemailer_config_1.NodemailerConfig.PORT || 587;
NodemailerEnv.SECURE_MODE = Boolean(process.env.EMAIL_SECURE_MODE) || Nodemailer_config_1.NodemailerConfig.SECURE_MODE || false;
NodemailerEnv.USER = process.env.EMAIL_USER || Nodemailer_config_1.NodemailerConfig.USER || undefined;
NodemailerEnv.PASSWORD = process.env.EMAIL_PASSWORD || Nodemailer_config_1.NodemailerConfig.PASSWORD || undefined;
NodemailerEnv.PERSONALIZED_USER = process.env.PERSONALIZED_USER || Nodemailer_config_1.NodemailerConfig.PERSONALIZED_USER || "";
NodemailerEnv.CONFIG = {
    HOST: _a.HOST,
    PORT: _a.PORT,
    SECURE_MODE: _a.SECURE_MODE,
    USER: _a.USER,
    PASSWORD: _a.PASSWORD,
    PERSONALIZED_USER: _a.PERSONALIZED_USER,
};
class AppEnv {
}
exports.AppEnv = AppEnv;
AppEnv.SECRET_KEY = process.env.SECRET_KEY || App_config_1.AppConfig.SECRET_KEY;
AppEnv.EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || App_config_1.AppConfig.EXPIRATION_TOKEN;
AppEnv.EXPIRATION_SESSION_IN_DB = Number(process.env.EXPIRATION_SESSION_IN_DB) || App_config_1.AppConfig.EXPIRATION_SESSION_IN_DB;
AppEnv.EXPIRATION_TEMPORAL_TOKEN = process.env.EXPIRATION_TEMPORAL_TOKEN || App_config_1.AppConfig.EXPIRATION_TEMPORAL_TOKEN;
AppEnv.EXPIRATION_TEMPORAL_TOKEN_IN_DB = Number(process.env.EXPIRATION_TEMPORAL_TOKEN_IN_DB) || App_config_1.AppConfig.EXPIRATION_TEMPORAL_TOKEN_IN_DB;
AppEnv.TIME_IN_CACHE = Number(process.env.TIME_IN_CACHE) || App_config_1.AppConfig.TIME_IN_CACHE;
class WebPushEnv {
}
exports.WebPushEnv = WebPushEnv;
