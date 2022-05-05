import { AsistanceStatus, AssistanceEntity } from "@domain/assistance/assistance.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        },
        mechanicId: {
            type: Schema.Types.ObjectId,
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
            enum: AsistanceStatus,
            required: true,
            default: AsistanceStatus.InProcess
        },
        cancellation: {
            userId: {
                type: Schema.Types.ObjectId,
                required: [function () {
                    return this.status === AsistanceStatus.Aborted || this.status === AsistanceStatus.Canceled;
                }],
            },
            userRole: {
                type: String,
                required: [function () {
                    return this.status === AsistanceStatus.Aborted || this.status === AsistanceStatus.Canceled;
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
    },
    {
        id: false,
        versionKey: false,
        timestamps: true
    }
);


export const AssistanceModel = model<AssistanceEntity>("Assistance", schema);
