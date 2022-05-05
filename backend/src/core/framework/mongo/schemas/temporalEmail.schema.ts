import { TemporalEmailEntity } from "@domain/temporalEmail/temporalEmail.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        token: {
            type: String,
            required: [function () { return !this.pin; }, "Token es requerido"]
        },
        pin: {
            type: Number,
            required: [function () { return !this.token; }, "El pin es requerido"]
        },
        userId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        id: false,
        versionKey: false,
        timestamps: true
    }
);

schema.set("toJSON", {
    transform: function (doc, ret) {

        return ret;
    }
});


export const TemporalEmailModel = model<TemporalEmailEntity>("TemporalEmail", schema);
