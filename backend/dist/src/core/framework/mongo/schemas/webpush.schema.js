"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPushModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    webpushObject: {
        endpoint: {
            type: String,
            required: true,
        },
        expirationTime: { type: Date, default: null },
        keys: {
            p256dh: {
                type: String,
                required: true
            },
            auth: {
                type: String,
                required: true
            }
        }
    }
}, {
    id: false,
    versionKey: false
});
exports.WebPushModel = (0, mongoose_1.model)("WebPush", schema);
