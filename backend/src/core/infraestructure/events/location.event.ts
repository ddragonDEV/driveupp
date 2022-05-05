import { SocketContext } from "@bootstrap/Express/ExpressSocketIO.server";
import { CurrentLocationMechData, CurrentLocationUserData } from "@domain/events/location.event.entity";
import { Server, Socket } from "socket.io";
import { errorSocket } from "../helpers/error-socket.helper";

export enum events {
    current_location_user = "current_location_user",
    current_location_mechanic = "current_location_mechanic"
}

export class LocationEvent {
    constructor(
        private io: Server,
        private context: SocketContext
    ) {
        this.io.on('connection', async (socket: Socket) => {
            socket.on(events.current_location_user, async (data: CurrentLocationUserData) => {
                try {
                    const [userInfo, mechanicSocket] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic)
                    ]);

                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");
                    if (!mechanicSocket) return errorSocket(socket, "Mechanic is  not available");

                    this.io.to(mechanicSocket.socketId).emit(events.current_location_user, data);
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });

            socket.on(events.current_location_mechanic, async (data: CurrentLocationMechData) => {
                try {
                    const [mechInfo, mechanicSocket] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idUser)
                    ]);
                    if (!mechInfo) return errorSocket(socket, "User not logged into sockets");
                    if (!mechanicSocket) return errorSocket(socket, "User is  not available");

                    this.io.to(mechanicSocket.socketId).emit(events.current_location_mechanic, data);
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });
        });
    }
}