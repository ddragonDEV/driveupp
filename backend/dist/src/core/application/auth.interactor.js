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
exports.AuthInteractor = void 0;
const confict_http_error_1 = require("@bootstrap/Express/errors/confict-http-error");
const EncryptionTools_1 = require("../../shared/helpers/EncryptionTools");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const TokenTools_1 = require("../../shared/helpers/TokenTools");
const env_module_1 = require("@modules/env.module");
const buildBackendUrl_1 = require("../../shared/helpers/buildBackendUrl");
const RandomValuesGenerator_1 = require("../../shared/helpers/RandomValuesGenerator");
let AuthInteractor = class AuthInteractor {
    constructor(userAdapter, sessionAdapter, sessionHistoryAdapter, nodemailerAdapter, temporalEmailAdapter) {
        this.userAdapter = userAdapter;
        this.sessionAdapter = sessionAdapter;
        this.sessionHistoryAdapter = sessionHistoryAdapter;
        this.nodemailerAdapter = nodemailerAdapter;
        this.temporalEmailAdapter = temporalEmailAdapter;
    }
    ;
    async registerUser(user, request) {
        const userExists = await this.userAdapter.getUserByEmail(user.email);
        if (userExists)
            throw new confict_http_error_1.ConflictError("Usuario creado anteriormente");
        user.password = EncryptionTools_1.EncryptionTools.encryptPassword(user.password);
        const newUser = await this.userAdapter.create(user);
        const verifyAccountToken = TokenTools_1.TokenTools.transforDotToPesosSymbol(await TokenTools_1.TokenTools.generateJWT({ _id: newUser["_id"], type: "verifyAccount" }, env_module_1.AppEnv.EXPIRATION_TEMPORAL_TOKEN, env_module_1.AppEnv.SECRET_KEY));
        await this.nodemailerAdapter.verifyAccount({
            name: newUser.name, email: newUser.email,
            url: (0, buildBackendUrl_1.buildBackendUrl)(request, "auth/verify", verifyAccountToken)
        });
        return { emailSentSuccesfully: true };
    }
    async login(entry) {
        const [user, session] = await Promise.all([
            this.userAdapter.getUserByEmail(entry.email),
            this.sessionAdapter.getSessionByEmail(entry.email)
        ]);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        if (!EncryptionTools_1.EncryptionTools.isSamePassword(entry.password, user.password))
            throw new routing_controllers_1.UnauthorizedError("La contraseña introducida es incorrecta");
        if (user.deleted)
            throw new routing_controllers_1.UnauthorizedError("El usuario ha sido dado de baja del sistema");
        if (!user.verifiedAccount)
            throw new routing_controllers_1.UnauthorizedError("El usuario no ha verificado su email");
        if (session)
            await this.sessionAdapter.deleteAllSessionsByUserId(user["_id"]);
        const registeredSession = await this.sessionHistoryAdapter.getTodaySessionByUserId(user["_id"]);
        if (!registeredSession)
            await this.sessionHistoryAdapter.create({ userId: user["_id"], email: user.email, role: user.role });
        const dataUser = {
            user,
            token: await TokenTools_1.TokenTools.generateJWT({ _id: user["_id"], role: user.role }, env_module_1.AppEnv.EXPIRATION_TOKEN, env_module_1.AppEnv.SECRET_KEY)
        };
        await this.sessionAdapter.create({ userId: user["_id"], token: dataUser.token, email: user.email });
        return dataUser;
    }
    async refreshToken(token) {
        const payloadToken = TokenTools_1.TokenTools.verifyJWT(token, env_module_1.AppEnv.SECRET_KEY);
        const [user, session, registeredSession] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token),
            this.sessionHistoryAdapter.getTodaySessionByUserId(payloadToken._id)
        ]);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        if (!session)
            throw new routing_controllers_1.UnauthorizedError("La sesión no existe");
        if (!registeredSession)
            await this.sessionHistoryAdapter.create({
                userId: user["_id"], email: user.email, role: user.role
            });
        const dataUser = {
            user,
            token: await TokenTools_1.TokenTools.generateJWT({ _id: user["_id"], role: user.role }, env_module_1.AppEnv.EXPIRATION_TOKEN, env_module_1.AppEnv.SECRET_KEY)
        };
        await this.sessionAdapter.deleteSession(session["_id"]);
        await this.sessionAdapter.create({ userId: user["_id"], token: dataUser.token, email: user.email });
        return dataUser;
    }
    async logout(token) {
        const payloadToken = TokenTools_1.TokenTools.verifyJWT(token, env_module_1.AppEnv.SECRET_KEY);
        const [user, session] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token)
        ]);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        if (!session)
            throw new routing_controllers_1.UnauthorizedError("La sesión no existe");
        await this.sessionAdapter.deleteSession(session["_id"]);
        return {};
    }
    async changePassword(token, newPassword) {
        const payloadToken = TokenTools_1.TokenTools.verifyJWT(token, env_module_1.AppEnv.SECRET_KEY);
        const [user, session] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token)
        ]);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        if (!session)
            throw new routing_controllers_1.UnauthorizedError("La sesión no existe");
        if (EncryptionTools_1.EncryptionTools.isSamePassword(newPassword, user.password))
            throw new routing_controllers_1.UnauthorizedError("La contraseña no puede ser la misma");
        await this.userAdapter.updatePassword(user["_id"], EncryptionTools_1.EncryptionTools.encryptPassword(newPassword));
        return {};
    }
    ;
    async verifyAccount(token) {
        token = TokenTools_1.TokenTools.transformPesosSymbolToDot(token);
        const { _id, type } = TokenTools_1.TokenTools.getPayloadJWT(token, env_module_1.AppEnv.SECRET_KEY);
        const user = await this.userAdapter.getById(_id);
        if (type !== "verifyAccount")
            throw new routing_controllers_1.UnauthorizedError("El token no es válido");
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        if (user.verifiedAccount)
            throw new routing_controllers_1.ForbiddenError("El usuario verificó su cuenta anteriormente");
        await this.userAdapter.verifyUser(_id);
        await this.nodemailerAdapter.welcome({ name: user.name, email: user.email });
        return { emailSentSuccesfully: true };
    }
    async recoveryPasswordEmail(email) {
        const user = await this.userAdapter.getUserByEmail(email);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        const newEmailRegistered = await this.temporalEmailAdapter.register({
            userId: user["_id"],
            pin: RandomValuesGenerator_1.RandomValues.numbersGenerator(6),
            type: "recoveryPassword"
        });
        this.nodemailerAdapter.recoveryPassword({
            email: user.email,
            pin: newEmailRegistered.pin
        });
        return { emailSentSuccesfully: true };
    }
    async recoveryPasswordReset(entry) {
        const user = await this.userAdapter.getUserByEmail(entry.email);
        if (!user)
            throw new routing_controllers_1.NotFoundError("Usuario no encontrado");
        const tmpEmailDB = await this.temporalEmailAdapter.getEmail(entry.email, entry.pin);
        if (!tmpEmailDB || !!tmpEmailDB && tmpEmailDB.type !== "recoveryPassword")
            throw new routing_controllers_1.NotFoundError("Solicitud no encontrada. Es posible que haya caducado o el pin es incorrecto");
        if (EncryptionTools_1.EncryptionTools.isSamePassword(entry.password, user.password))
            throw new routing_controllers_1.UnauthorizedError("La contraseña no puede ser la misma");
        await Promise.all([
            this.userAdapter.updatePassword(user["_id"], EncryptionTools_1.EncryptionTools.encryptPassword(entry.password)),
            this.sessionAdapter.deleteAllSessionsByUserId(user["_id"]),
            this.temporalEmailAdapter.deleteEmail(entry.email, entry.pin)
        ]);
        return {};
    }
};
AuthInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("UserAdapter")),
    __param(1, (0, typedi_1.Inject)("SessionAdapter")),
    __param(2, (0, typedi_1.Inject)("SessionHistoryAdapter")),
    __param(3, (0, typedi_1.Inject)("NodemailerAdapter")),
    __param(4, (0, typedi_1.Inject)("TemporalEmailAdapter")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AuthInteractor);
exports.AuthInteractor = AuthInteractor;
