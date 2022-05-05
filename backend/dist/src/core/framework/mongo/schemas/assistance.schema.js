"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceModel = void 0;
const assistance_entity_1 = require("@domain/assistance/assistance.entity");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    mechanicId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    destination: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    destinationAddress: {
        tourism: { type: String },
        road: { type: String },
        neighbourhood: { type: String },
        city: { type: String, default: "desconocido" },
        postcode: { type: String, default: "0000000" },
        country: { type: String },
        country_code: { type: String },
    },
    status: {
        type: String,
        enum: assistance_entity_1.AsistanceStatus,
        required: true,
        default: assistance_entity_1.AsistanceStatus.InProcess
    },
    cancellation: {
        userId: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: [function () {
                    return this.status === assistance_entity_1.AsistanceStatus.Aborted || this.status === assistance_entity_1.AsistanceStatus.Canceled;
                }],
        },
        userRole: {
            type: String,
            required: [function () {
                    return this.status === assistance_entity_1.AsistanceStatus.Aborted || this.status === assistance_entity_1.AsistanceStatus.Canceled;
                }],
        }
    },
    score: {
        user: {
            type: Number,
            default: 0
        },
        mechanic: {
            type: Number,
            default: 0
        }
    }
}, {
    id: false,
    versionKey: false,
    timestamps: true
});
exports.AssistanceModel = (0, mongoose_1.model)("Assistance", schema);
