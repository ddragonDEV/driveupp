import { AdvertisingEntity } from "@domain/advertising/advertising.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        image: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    {
        id: false,
        versionKey: false,
        timestamps: true
    }
);


export const AdvertisingModel = model<AdvertisingEntity>("Advertising", schema);
