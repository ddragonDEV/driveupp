"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisingModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    id: false,
    versionKey: false,
    timestamps: true
});
exports.AdvertisingModel = (0, mongoose_1.model)("Advertising", schema);
