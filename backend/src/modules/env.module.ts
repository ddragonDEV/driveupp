import dotenv from "dotenv";
dotenv.config();

import { ExpressConfig } from "@config/Express.config";
import { SocketIOConfig } from "@config/SocketIO.config";
import { MongoConfig } from "@config/Mongo.config";
import { NodemailerConfig } from "@config/Nodemailer.config";
import { AppConfig } from "@config/App.config";
import { webPushConfig } from "@config/Onesignal.config";

export class ExpressEnv {
    static PORT: number = Number(process.env.PORT) || ExpressConfig.PORT;
}

export class SocketIOEnv {
    public static PORT: number = Number(process.env.PORT) || SocketIOConfig.PORT;
}

export class MongoEnv {
    public static CONNECTION_STRING: string = process.env.MONGO_CONNECTION_STRING || MongoConfig.CONNECTION_STRING;
}

export class NodemailerEnv {
    public static HOST: string = process.env.EMAIL_HOST || NodemailerConfig.HOST || undefined;
    public static PORT: number = Number(process.env.EMAIL_PORT) || NodemailerConfig.PORT || 587;
    public static SECURE_MODE: boolean = Boolean(process.env.EMAIL_SECURE_MODE) || NodemailerConfig.SECURE_MODE || false;
    public static USER: string = process.env.EMAIL_USER || NodemailerConfig.USER || undefined;
    public static PASSWORD: string = process.env.EMAIL_PASSWORD || NodemailerConfig.PASSWORD || undefined;
    public static PERSONALIZED_USER: string = process.env.PERSONALIZED_USER || NodemailerConfig.PERSONALIZED_USER || "";

    public static CONFIG = {
        HOST: this.HOST,
        PORT: this.PORT,
        SECURE_MODE: this.SECURE_MODE,
        USER: this.USER,
        PASSWORD: this.PASSWORD,
        PERSONALIZED_USER: this.PERSONALIZED_USER,
    };
}


export class AppEnv {
    public static SECRET_KEY: string = process.env.SECRET_KEY || AppConfig.SECRET_KEY;
    public static EXPIRATION_TOKEN: string = process.env.EXPIRATION_TOKEN || AppConfig.EXPIRATION_TOKEN;
    public static EXPIRATION_SESSION_IN_DB: number = Number(process.env.EXPIRATION_SESSION_IN_DB) || AppConfig.EXPIRATION_SESSION_IN_DB;
    public static EXPIRATION_TEMPORAL_TOKEN: string = process.env.EXPIRATION_TEMPORAL_TOKEN || AppConfig.EXPIRATION_TEMPORAL_TOKEN;
    public static EXPIRATION_TEMPORAL_TOKEN_IN_DB: number = Number(process.env.EXPIRATION_TEMPORAL_TOKEN_IN_DB) || AppConfig.EXPIRATION_TEMPORAL_TOKEN_IN_DB;
    public static TIME_IN_CACHE: number = Number(process.env.TIME_IN_CACHE) || AppConfig.TIME_IN_CACHE;
}


export class WebPushEnv {
    //public static PUBLIC_KEY: string = process.env.WEBPUSH_PUBLIC_KEY || webPushConfig.publicKey;
    //public static PRIVATE_KEY: string = process.env.WEBPUSH_PRIVATE_KEY || webPushConfig.publicKey;
}