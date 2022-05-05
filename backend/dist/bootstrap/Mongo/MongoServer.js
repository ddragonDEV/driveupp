"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoServer = void 0;
const env_module_1 = require("@modules/env.module");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoServer {
    constructor() {
        mongoose_1.default.connect(env_module_1.MongoEnv.CONNECTION_STRING, {}, () => {
            console.log(`Mongo Connection has been established`);
        });
    }
}
exports.MongoServer = MongoServer;
