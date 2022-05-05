import { Socket } from "socket.io";

export const errorSocket = (socket: Socket, message: string) => socket.emit("error", message);