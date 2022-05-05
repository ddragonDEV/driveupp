"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
require("reflect-metadata");
require("./aliases");
const process_1 = require("process");
const Express_server_1 = require("./Express/Express.server");
const MongoServer_1 = require("./Mongo/MongoServer");
const SocketIO_Server_1 = require("./SocketIO/SocketIO.Server");
const Nodemailer_Server_1 = require("./Nodemailer/Nodemailer.Server");
const ExpressSocketIO_server_1 = require("./Express/ExpressSocketIO.server");
class Server {
    async initialize() {
        try {
            await this.expressSocketIOInstance();
            await this.MongoInstance();
            await this.NodemailerInstance();
        }
        catch (error) {
            console.log(error);
            (0, process_1.exit)(1);
        }
    }
    async expressSocketIOInstance() {
        await new ExpressSocketIO_server_1.ExpressSocketIOServer();
    }
    async expressInstance() {
        await new Express_server_1.ExpressServer();
    }
    async socketIoInstance() {
        await new SocketIO_Server_1.SocketIOServer();
    }
    async MongoInstance() {
        await new MongoServer_1.MongoServer();
    }
    async NodemailerInstance() {
        await new Nodemailer_Server_1.NodemailerService();
    }
}
exports.Server = Server;
