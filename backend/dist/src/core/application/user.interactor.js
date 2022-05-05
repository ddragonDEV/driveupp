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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractor = void 0;
const typedi_1 = require("typedi");
const socket_io_1 = require("socket.io");
const confict_http_error_1 = require("@bootstrap/Express/errors/confict-http-error");
const EncryptionTools_1 = require("../../shared/helpers/EncryptionTools");
const TokenTools_1 = require("../../shared/helpers/TokenTools");
const env_module_1 = require("@modules/env.module");
const buildBackendUrl_1 = require("../../shared/helpers/buildBackendUrl");
const routing_controllers_1 = require("routing-controllers");
const user_entity_1 = require("../domain/user/user.entity");
const ExpressSocketIO_server_1 = require("@bootstrap/Express/ExpressSocketIO.server");
const location_event_1 = require("@events/location.event");
let UserInteractor = class UserInteractor {
    constructor(userAdapter, nodemailerAdapter, assistanceAdapter, io) {
        this.userAdapter = userAdapter;
        this.nodemailerAdapter = nodemailerAdapter;
        this.assistanceAdapter = assistanceAdapter;
        this.io = io;
    }
    async updateUser(user, newData) {
        const userWithSameEmail = await this.userAdapter.getUserByEmail(newData.email);
        if (userWithSameEmail && user["_id"].toString() !== userWithSameEmail["_id"].toString()) {
            throw new confict_http_error_1.ConflictError("Ya existe un usuario con este email");
        }
        return await this.userAdapter.update(user["_id"], {
            email: newData.email,
            name: newData.name,
            lastName: newData.lastName,
            phone: newData.phone,
            password: newData.password ?
                EncryptionTools_1.EncryptionTools.encryptPassword(newData.password) :
                user.password,
            photo: newData.photo ? newData.photo : user.photo
        });
    }
    async createMechanic(request, user) {
        const userExists = await this.userAdapter.getUserByEmail(user.email);
        if (userExists)
            throw new confict_http_error_1.ConflictError("Usuario creado anteriormente");
        user.password = EncryptionTools_1.EncryptionTools.encryptPassword(user.password);
        const newUser = await this.userAdapter.createMechanic(user);
        const verifyAccountToken = TokenTools_1.TokenTools.transforDotToPesosSymbol(await TokenTools_1.TokenTools.generateJWT({ _id: newUser["_id"], type: "verifyAccount" }, env_module_1.AppEnv.EXPIRATION_TEMPORAL_TOKEN, env_module_1.AppEnv.SECRET_KEY));
        await this.nodemailerAdapter.verifyAccount({
            name: newUser.name, email: newUser.email,
            url: (0, buildBackendUrl_1.buildBackendUrl)(request, "auth/verify", verifyAccountToken)
        });
        return { emailSentSuccesfully: true };
    }
    async getUsersFilters(filter) {
        return await this.userAdapter.getUsers(filter, { page: filter.page, rowsPerPage: filter.rowsPerPage });
    }
    async deleteUser(user, id, status) {
        if (user["_id"] === id)
            throw new routing_controllers_1.ForbiddenError();
        const userExists = await this.userAdapter.getById(id);
        if (!userExists)
            throw new routing_controllers_1.NotFoundError();
        return await this.userAdapter.logicalDelete(id, status);
    }
    async getUserById(id) {
        let user = await this.userAdapter.getById(id);
        if (!user)
            throw new routing_controllers_1.NotFoundError();
        const totalAssistances = await this.assistanceAdapter.getTotalAssistancesByUserId(id);
        return { user, totalAssistances };
    }
    async sendLocation(user, entry) {
        const currentAssistance = user.role === user_entity_1.Roles.user ?
            await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance)
            throw new routing_controllers_1.NotFoundError("El usuario no cuenta con una asistencia en curso");
        const destinationId = currentAssistance[user.role === user_entity_1.Roles.user ? "mechanicId" : "userId"];
        const socketDestination = Object.values(ExpressSocketIO_server_1.context.users).find(user => user.userId === destinationId.toString());
        if (socketDestination) {
            user.role === user_entity_1.Roles.user ? this.io.to(socketDestination.socketId).emit(location_event_1.events.current_location_user, {
                location: {
                    idUser: currentAssistance.userId,
                    latUser: entry.latitude,
                    lngUser: entry.longitude
                },
                idMechanic: destinationId,
                idAssistance: currentAssistance._id
            }) :
                this.io.to(socketDestination.socketId).emit(location_event_1.events.current_location_mechanic, {
                    location: {
                        idMechanic: currentAssistance.mechanicId,
                        latMechanic: entry.latitude,
                        lngMechanic: entry.longitude
                    },
                    idUser: currentAssistance.userId,
                    idAssistance: currentAssistance._id
                });
        }
        return {};
    }
};
UserInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("UserAdapter")),
    __param(1, (0, typedi_1.Inject)("NodemailerAdapter")),
    __param(2, (0, typedi_1.Inject)("AssistanceAdapter")),
    __param(3, (0, typedi_1.Inject)("io")),
    __metadata("design:paramtypes", [Object, Object, Object, socket_io_1.Server])
], UserInteractor);
exports.UserInteractor = UserInteractor;
