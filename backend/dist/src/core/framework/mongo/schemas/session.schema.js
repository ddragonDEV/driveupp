"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    email: {
        type: String,
        required: true,
        ref: "users"
    },
    token: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true,
        expires: 0
    }
}, {
    id: false,
    versionKey: false
});
exports.SessionModel = (0, mongoose_1.model)("Session", schema);
