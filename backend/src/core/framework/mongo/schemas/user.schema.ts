import { Roles, UserEntity } from "@domain/user/user.entity";
import { Schema, model } from "mongoose";


const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        rut: {
            type: String,
            required: true,
            trim: true
        },
        photo: {
            type: String,
        },
        role: {
            type: String,
            required: true,
            trim: true,
            default: Roles.user
        },
        verifiedAccount: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false
        },
        scoreAverage: {
            type: Number,
            default: 0
        },
        scoreCount: {
            type: Number,
            default: 0
        },
        scorePoints: {
            type: Number,
            default: 0
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
        delete ret.password;
        delete ret.verifiedAccount;
        delete ret.updatedAt;

        return ret;
    }
});


export const UserModel = model<UserEntity>("User", schema);
