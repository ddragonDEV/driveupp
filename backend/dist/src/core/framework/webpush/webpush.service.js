"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotification = exports.webpush = void 0;
const env_module_1 = require("@modules/env.module");
exports.webpush = require('web-push');
exports.webpush.setVapidDetails(`mailto:${env_module_1.NodemailerEnv.USER}`, env_module_1.WebPushEnv.PUBLIC_KEY, env_module_1.WebPushEnv.PRIVATE_KEY);
const sendPushNotification = async (destination, title, message) => {
    try {
        await exports.webpush.sendNotification(destination, JSON.stringify({
            title,
            message
        }));
    }
    catch (error) {
        return;
    }
};
exports.sendPushNotification = sendPushNotification;
