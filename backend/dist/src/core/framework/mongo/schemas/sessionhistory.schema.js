"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionHistoryModel = void 0;
const user_entity_1 = require("@domain/user/user.entity");
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
    role: {
        type: String,
        enum: user_entity_1.Roles,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    id: false,
    versionKey: false
});
exports.SessionHistoryModel = (0, mongoose_1.model)("SessionHistory", schema);
