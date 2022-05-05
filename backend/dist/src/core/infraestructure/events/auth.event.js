"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEvent = void 0;
const auth_event_entity_1 = require("@domain/events/auth.event.entity");
const assistance_repository_1 = require("@framework/mongo/repositories/assistance.repository");
const user_repository_1 = require("@framework/mongo/repositories/user.repository");
const socket_io_1 = require("socket.io");
const typedi_1 = require("typedi");
const error_socket_helper_1 = require("../helpers/error-socket.helper");
let AuthEvent = class AuthEvent {
    constructor(io, context) {
        this.io = io;
        this.context = context;
        this.userRepository = new user_repository_1.UserRespository();
        this.assistanceRepository = new assistance_repository_1.AssistanceRepository();
        this.io.on('connection', async (socket) => {
            socket.on("connected", async (data) => {
                var _a, _b;
                try {
                    const user = await this.userRepository.getUserByEmail(data.email);
                    if (!user)
                        return (0, error_socket_helper_1.errorSocket)(socket, "user not found");
                    this.context["users"] = {
                        ...(_a = this.context) === null || _a === void 0 ? void 0 : _a.users, [socket.id]: {
                            socketId: socket.id,
                            userId: (_b = user["_id"]) === null || _b === void 0 ? void 0 : _b.toString(),
                            email: user.email,
                            name: user.name,
                            lastName: user.lastName,
                            fullName: (user.name + " " + user.lastName).trim(),
                            role: user.role,
                            rating: user.scoreAverage,
                            photo: user.photo,
                        }
                    };
                    socket.join(auth_event_entity_1.RoleEvent[user.role]);
                    socket.emit("connected_confirm", "User connected successfully");
                }
                catch (error) {
                    console.log(error);
                    return (0, error_socket_helper_1.errorSocket)(socket, "Unexpected error");
                }
            });
            socket.on("disconnect", async () => {
                var _a, _b;
                (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? true : delete _b[socket.id];
                socket.disconnect();
            });
        });
    }
};
AuthEvent = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [socket_io_1.Server, Object])
], AuthEvent);
exports.AuthEvent = AuthEvent;
;
