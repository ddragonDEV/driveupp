"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceStatusEvent = exports.eventsAssistance = void 0;
const assistance_entity_1 = require("@domain/assistance/assistance.entity");
const assistance_repository_1 = require("@framework/mongo/repositories/assistance.repository");
const error_socket_helper_1 = require("../helpers/error-socket.helper");
var eventsAssistance;
(function (eventsAssistance) {
    eventsAssistance["request_cancelled_mechanic"] = "request_cancelled_mechanic";
    eventsAssistance["request_cancelled_user"] = "request_cancelled_user";
    eventsAssistance["request_completed_user"] = "request_completed_user";
    eventsAssistance["request_completed_confirm"] = "request_completed_confirm";
})(eventsAssistance = exports.eventsAssistance || (exports.eventsAssistance = {}));
class AssistanceStatusEvent {
    constructor(io, context) {
        this.io = io;
        this.context = context;
        this.assistanceRepository = new assistance_repository_1.AssistanceRepository();
        this.io.on('connection', async (socket) => {
            socket.on(eventsAssistance.request_cancelled_mechanic, async (data) => {
                try {
                    const [userInfo, userSocket, assistanceDB] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idUser),
                        this.assistanceRepository.getById(data.idAssistance)
                    ]);
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    if (!assistanceDB)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Assistance does not exist");
                    if (!userSocket)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User is  not available");
                    if (assistanceDB.status !== assistance_entity_1.AsistanceStatus.InProcess)
                        return (0, error_socket_helper_1.errorSocket)(socket, "This assistance is not in process");
                    await this.assistanceRepository.cancel(assistanceDB["_id"], userInfo.userId, userInfo.role);
                    this.io.to(userSocket.socketId).emit(eventsAssistance.request_cancelled_mechanic, data);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
            socket.on(eventsAssistance.request_cancelled_user, async (data) => {
                try {
                    const [userInfo, assistanceDB, mechSocket] = await Promise.all([
                        this.context.users[socket.id],
                        this.assistanceRepository.getById(data.idAssistance),
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic)
                    ]);
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    if (!assistanceDB)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Assistance does not exist");
                    if (!mechSocket)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Mechanic is  not available");
                    if (assistanceDB.status !== assistance_entity_1.AsistanceStatus.InProcess)
                        return (0, error_socket_helper_1.errorSocket)(socket, "This assistance is not in process");
                    await this.assistanceRepository.cancel(assistanceDB["_id"], userInfo.userId, userInfo.role);
                    this.io.to(mechSocket.socketId).emit(eventsAssistance.request_cancelled_user, data);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
            socket.on(eventsAssistance.request_completed_user, async (data) => {
                try {
                    const [userInfo, mechSocket, assistanceDB] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic),
                        this.assistanceRepository.getById(data.idAssistance)
                    ]);
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    if (!mechSocket)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Mechanic is  not available");
                    if (!assistanceDB)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Assistance does not exist");
                    if (assistanceDB.status !== assistance_entity_1.AsistanceStatus.InProcess)
                        return (0, error_socket_helper_1.errorSocket)(socket, "This assistance is not in process");
                    await this.assistanceRepository.completed(data.idAssistance);
                    this.io.to(mechSocket.socketId).emit(eventsAssistance.request_completed_confirm, data);
                    socket.emit(eventsAssistance.request_completed_confirm, data);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
        });
    }
}
exports.AssistanceStatusEvent = AssistanceStatusEvent;
