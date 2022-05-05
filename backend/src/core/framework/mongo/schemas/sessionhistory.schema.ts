import { SessionHistoryEntity } from "@domain/sessionhistory/sessionhistory.entity";
import { Roles } from "@domain/user/user.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
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
            enum: Roles,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        id: false,
        versionKey: false
    }
);


export const SessionHistoryModel = model<SessionHistoryEntity>("SessionHistory", schema);
