import { SessionEntity } from "@domain/session/session.entity";
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
        token: {
            type: String,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true,
            expires: 0
        }
    },
    {
        id: false,
        versionKey: false
    }
);


export const SessionModel = model<SessionEntity>("Session", schema);
