import { WebPushEntity } from "@domain/webpush/webpush.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        id: false,
        versionKey: false
    }
);


export const WebPushModel = model<WebPushEntity>("WebPush", schema);
