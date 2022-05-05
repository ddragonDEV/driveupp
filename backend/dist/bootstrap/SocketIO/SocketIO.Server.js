"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOServer = void 0;
require("reflect-metadata");
const socket_io_1 = require("socket.io");
const events_module_1 = require("@modules/events.module");
const env_module_1 = require("@modules/env.module");
const context = {
    users: {}
};
class SocketIOServer {
    constructor() {
        this.io = new socket_io_1.Server();
        events_module_1.EventsModule.forEach(event => {
            new event(this.io, context);
        });
        try {
            this.io.listen(Number(env_module_1.SocketIOEnv.PORT));
            console.log(`Socket server listening on ${env_module_1.SocketIOEnv.PORT}`);
        }
        catch (error) {
            console.log(error);
            throw new Error("Unexpected error initializing Socket Io");
        }
    }
}
exports.SocketIOServer = SocketIOServer;
