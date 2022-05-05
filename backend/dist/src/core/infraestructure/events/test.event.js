"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEvent = void 0;
class TestEvent {
    constructor(io, context) {
        this.io = io;
        this.context = context;
        this.io.on('connection', async (socket) => {
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
exports.TestEvent = TestEvent;
