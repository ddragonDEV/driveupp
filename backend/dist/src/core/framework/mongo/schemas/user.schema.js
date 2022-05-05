"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const user_entity_1 = require("@domain/user/user.entity");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rut: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: user_entity_1.Roles.user
    },
    verifiedAccount: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    scoreAverage: {
        type: Number,
        default: 0
    },
    scoreCount: {
        type: Number,
        default: 0
    },
    scorePoints: {
        type: Number,
        default: 0
    }
}, {
    id: false,
    versionKey: false,
    timestamps: true
});
schema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.verifiedAccount;
        delete ret.updatedAt;
        return ret;
    }
});
exports.UserModel = (0, mongoose_1.model)("User", schema);
