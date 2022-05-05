import { MongoEnv } from "@modules/env.module";
import mongoose from "mongoose";

export class MongoServer {

    constructor() {
        mongoose.connect(MongoEnv.CONNECTION_STRING, {},
            () => {
                console.log(`Mongo Connection has been established`);
            });
    }
}