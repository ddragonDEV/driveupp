import { SocketContext } from "@bootstrap/Express/ExpressSocketIO.server";
import { ConnectedData, RoleEvent } from "@domain/events/auth.event.entity";
import { AssistanceRepository } from "@framework/mongo/repositories/assistance.repository";
import { UserRespository } from "@framework/mongo/repositories/user.repository";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";
import { errorSocket } from "../helpers/error-socket.helper";
import { eventsAssistance } from "./assistanceStatus.event";

@Service()
export class AuthEvent {
    userRepository = new UserRespository();
    assistanceRepository = new AssistanceRepository();

    constructor(
        private io: Server,
        private context: SocketContext
    ) {
        this.io.on('connection', async (socket: Socket) => {
            socket.on("connected", async (data: ConnectedData) => {
                try {
                    const user = await this.userRepository.getUserByEmail(data.email);
                    if (!user) return errorSocket(socket, "user not found");
                    this.context["users"] = {
                        ...this.context?.users, [socket.id]: {
                            socketId: socket.id,
                            userId: user["_id"]?.toString(),
                            email: user.email,
                            name: user.name,
                            lastName: user.lastName,
                            fullName: (user.name + " " + user.lastName).trim(),
                            role: user.role,
                            rating: user.scoreAverage,
                            photo: user.photo,
                        }
                    };

                    socket.join(RoleEvent[user.role]);
                    socket.emit("connected_confirm", "User connected successfully");
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });

            socket.on("disconnect", async () => {
                delete this.context?.users?.[socket.id];
                socket.disconnect();
            });

        });
    }
};