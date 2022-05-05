"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalEmailModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    token: {
        type: String,
        required: [function () { return !this.pin; }, "Token es requerido"]
    },
    pin: {
        type: Number,
        required: [function () { return !this.token; }, "El pin es requerido"]
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    type: {
        type: String
    },
    expirationDate: {
        type: Date,
        required: true,
        expires: 0
    }
}, {
    id: false,
    versionKey: false,
    timestamps: true
});
schema.set("toJSON", {
    transform: function (doc, ret) {
        return ret;
    }
});
exports.TemporalEmailModel = (0, mongoose_1.model)("TemporalEmail", schema);
