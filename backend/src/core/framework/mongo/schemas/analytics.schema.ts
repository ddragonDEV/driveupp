import { AnalyticsEntity } from "@domain/analytics/analytics.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        title: {
            type: String,
        }
    },
    {
        id: false,
        versionKey: false
    }
);


export const AnalyticsModel = model<AnalyticsEntity>("Analytics", schema);
