"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersModule = void 0;
const advertising_controller_1 = require("@controllers/advertising.controller");
const analytics_controller_1 = require("@controllers/analytics.controller");
const assistance_controller_1 = require("@controllers/assistance.controller");
const auth_controller_1 = require("@controllers/auth.controller");
const user_controller_1 = require("@controllers/user.controller");
const webpush_controller_1 = require("@controllers/webpush.controller");
exports.ControllersModule = [
    auth_controller_1.AuthController,
    assistance_controller_1.AssistanceController,
    user_controller_1.UserController,
    analytics_controller_1.AnalyticsController,
    webpush_controller_1.WebPushController,
    advertising_controller_1.AdvertisingController
];
