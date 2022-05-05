import { Server, Socket } from "socket.io";


export class TestEvent {
    constructor(
        private io: Server,
        private context: any
    ) {
        this.io.on('connection', async (socket: Socket) => {
            console.log("entro aqui");
            socket.on("test1", (data) => {
                console.log("test1", data);
            });

            socket.on("test2", (data) => {
                console.log("test2", data);
            });
        });
    }
}