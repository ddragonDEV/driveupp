"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationEvent = exports.events = void 0;
const error_socket_helper_1 = require("../helpers/error-socket.helper");
var events;
(function (events) {
    events["current_location_user"] = "current_location_user";
    events["current_location_mechanic"] = "current_location_mechanic";
})(events = exports.events || (exports.events = {}));
class LocationEvent {
    constructor(io, context) {
        this.io = io;
        this.context = context;
        this.io.on('connection', async (socket) => {
            socket.on(events.current_location_user, async (data) => {
                try {
                    const [userInfo, mechanicSocket] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idMechanic)
                    ]);
                    if (!userInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    if (!mechanicSocket)
                        return (0, error_socket_helper_1.errorSocket)(socket, "Mechanic is  not available");
                    this.io.to(mechanicSocket.socketId).emit(events.current_location_user, data);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
            socket.on(events.current_location_mechanic, async (data) => {
                try {
                    const [mechInfo, mechanicSocket] = await Promise.all([
                        this.context.users[socket.id],
                        Object.values(this.context.users).find(user => user.userId === data.idUser)
                    ]);
                    if (!mechInfo)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User not logged into sockets");
                    if (!mechanicSocket)
                        return (0, error_socket_helper_1.errorSocket)(socket, "User is  not available");
                    this.io.to(mechanicSocket.socketId).emit(events.current_location_mechanic, data);
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
        });
    }
}
exports.LocationEvent = LocationEvent;
