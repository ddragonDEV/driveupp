"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoriesModule = void 0;
const nodemailer_repository_1 = require("@framework/nodemailer/nodemailer.repository");
const session_repository_1 = require("@framework/mongo/repositories/session.repository");
const temporalEmail_repository_1 = require("@framework/mongo/repositories/temporalEmail.repository");
const user_repository_1 = require("@framework/mongo/repositories/user.repository");
const assistance_repository_1 = require("@framework/mongo/repositories/assistance.repository");
const sessionhistory_repository_1 = require("@framework/mongo/repositories/sessionhistory.repository");
const webpush_repository_1 = require("@framework/mongo/repositories/webpush.repository");
const advertising_repository_1 = require("@framework/mongo/repositories/advertising.repository");
exports.repositoriesModule = {
    UserAdapter: new user_repository_1.UserRespository(),
    SessionAdapter: new session_repository_1.SessionRespository(),
    NodemailerAdapter: new nodemailer_repository_1.NodemailerRepository(),
    TemporalEmailAdapter: new temporalEmail_repository_1.TemporalEmailRepository(),
    AssistanceAdapter: new assistance_repository_1.AssistanceRepository(),
    SessionHistoryAdapter: new sessionhistory_repository_1.SessionHistoryRepository(),
    WebPushAdapter: new webpush_repository_1.WebPushRepository(),
    AdvertisingAdapter: new advertising_repository_1.AdvertisingRespository()
};
