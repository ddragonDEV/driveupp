import "reflect-metadata";
import { Server as IOServer } from "socket.io";
import { EventsModule } from "@modules/events.module";
import { SocketIOEnv } from "@modules/env.module";
import { SocketContext } from "@bootstrap/Express/ExpressSocketIO.server";

const context: SocketContext = {
    users: {}
};
export class SocketIOServer {
    io: IOServer;

    constructor() {
        this.io = new IOServer();

        EventsModule.forEach(event => {
            new event(this.io, context);
        });

        try {
            this.io.listen(Number(SocketIOEnv.PORT));
            console.log(`Socket server listening on ${ SocketIOEnv.PORT }`);
        } catch (error) {
            console.log(error);
            throw new Error("Unexpected error initializing Socket Io");
        }
    }
}