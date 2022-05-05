import { SocketContext } from "@bootstrap/Express/ExpressSocketIO.server";
import { AsistanceStatus } from "@domain/assistance/assistance.entity";
import { CompletedAssistanceUserData, MechanicCancellationData, UserCancellationData } from "@domain/events/assistanceStatus.event.entity";
import { AssistanceRepository } from "@framework/mongo/repositories/assistance.repository";
import { Server, Socket } from "socket.io";
import { errorSocket } from "../helpers/error-socket.helper";

export enum eventsAssistance {
    request_cancelled_mechanic = "request_cancelled_mechanic",
    request_cancelled_user = "request_cancelled_user",
    request_completed_user = "request_completed_user",
    request_completed_confirm = "request_completed_confirm"
}

export class AssistanceStatusEvent {
    assistanceRepository = new AssistanceRepository();

    constructor(
        private io: Server,
        private context: SocketContext
    ) {
        this.io.on('connection', async (socket: Socket) => {
            socket.on(eventsAssistance.request_cancelled_mechanic, async (data: MechanicCancellationData) => {
                try {
                    const [userInfo, userSocket, assistanceDB] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idUser),
                        this.assistanceRepository.getById(data.idAssistance)
                    ]);
                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");
                    if (!assistanceDB) return errorSocket(socket, "Assistance does not exist");
                    if (assistanceDB.status !== AsistanceStatus.InProcess)
                        return errorSocket(socket, "This assistance is not in process");

                    await this.assistanceRepository.cancel(assistanceDB["_id"], userInfo.userId, userInfo.role);
                    if (userSocket) {
                        this.io.to(userSocket.socketId).emit(eventsAssistance.request_cancelled_mechanic, data);
                    }
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });

            socket.on(eventsAssistance.request_cancelled_user, async (data: UserCancellationData) => {
                try {
                    const [userInfo, assistanceDB, mechSocket] = await Promise.all([
                        this.context.users[socket.id],
                        this.assistanceRepository.getById(data.idAssistance),
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic)
                    ]);
                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");
                    if (!assistanceDB) return errorSocket(socket, "Assistance does not exist");
                    if (assistanceDB.status !== AsistanceStatus.InProcess)
                        return errorSocket(socket, "This assistance is not in process");

                    await this.assistanceRepository.cancel(assistanceDB["_id"], userInfo.userId, userInfo.role);
                    if (mechSocket) {
                        this.io.to(mechSocket.socketId).emit(eventsAssistance.request_cancelled_user, data);
                    }
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });

            socket.on(eventsAssistance.request_completed_user, async (data: CompletedAssistanceUserData) => {
                try {
                    const [userInfo, mechSocket, assistanceDB] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic),
                        this.assistanceRepository.getById(data.idAssistance)
                    ]);
                    if (!userInfo) return errorSocket(socket, "User not logged into sockets");
                    if (!assistanceDB) return errorSocket(socket, "Assistance does not exist");
                    if (assistanceDB.status !== AsistanceStatus.InProcess) {
                        return errorSocket(socket, "This assistance is not in process");
                    }
                    await this.assistanceRepository.completed(data.idAssistance);

                    if (mechSocket) {
                        this.io.to(mechSocket.socketId).emit(eventsAssistance.request_completed_confirm, data);
                    }
                    socket.emit(eventsAssistance.request_completed_confirm, data);
                } catch (error) {
                    console.log(error);
                    return errorSocket(socket, "Unexpected error");
                }
            });
        });
    }
}