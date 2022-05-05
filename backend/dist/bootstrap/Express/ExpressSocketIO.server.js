"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressSocketIOServer = exports.context = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const repositories_module_1 = require("@modules/repositories.module");
const controllers_module_1 = require("@modules/controllers.module");
const env_module_1 = require("@modules/env.module");
const error_handler_middleware_1 = require("./error-handler.middleware");
const response_interceptor_1 = require("./response.interceptor");
const events_module_1 = require("@modules/events.module");
const user_repository_1 = require("../../src/core/framework/mongo/repositories/user.repository");
const TokenTools_1 = require("../../src/shared/helpers/TokenTools");
const session_repository_1 = require("../../src/core/framework/mongo/repositories/session.repository");
exports.context = {
    users: {}
};
class ExpressSocketIOServer {
    constructor() {
        this.userRepository = new user_repository_1.UserRespository();
        this.sessionRepository = new session_repository_1.SessionRespository();
        this.currentUserChecker = async (action) => {
            let token = action.request.headers["authorization"];
            if (token)
                token = token.replace("Bearer", "").trim();
            const [payloadToken, session] = await Promise.all([
                TokenTools_1.TokenTools.verifyJWT(token, env_module_1.AppEnv.SECRET_KEY),
                this.sessionRepository.getSessionByToken(token)
            ]);
            if (!session || !payloadToken)
                throw new routing_controllers_1.UnauthorizedError("La sesión no existe");
            const user = this.userRepository.getById(payloadToken === null || payloadToken === void 0 ? void 0 : payloadToken._id);
            if (!user)
                throw new routing_controllers_1.NotFoundError("El usuario no existe");
            return user;
        };
        this.authorizationChecker = async (action, roles) => {
            let token = action.request.headers["authorization"];
            if (token)
                token = token.replace("Bearer", "").trim();
            const [payloadToken, session] = await Promise.all([
                TokenTools_1.TokenTools.verifyJWT(token, env_module_1.AppEnv.SECRET_KEY),
                this.sessionRepository.getSessionByToken(token)
            ]);
            if (!session || !payloadToken)
                throw new routing_controllers_1.UnauthorizedError("La sesión no existe");
            const user = await this.userRepository.getById(payloadToken === null || payloadToken === void 0 ? void 0 : payloadToken._id);
            if (!user)
                throw new routing_controllers_1.NotFoundError("El usuario no existe");
            return roles.includes(user.role);
        };
        this.app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
        this.routingControllerEvent();
        events_module_1.EventsModule.forEach((event) => {
            new event(this.io, exports.context);
        });
        httpServer.listen(env_module_1.SocketIOEnv.PORT, () => {
            console.log(`Express server established on port ${env_module_1.SocketIOEnv.PORT}`);
        });
    }
    routingControllerEvent() {
        (0, routing_controllers_1.useContainer)(typedi_1.Container);
        typedi_1.Container.set("io", this.io);
        Object.entries(repositories_module_1.repositoriesModule).forEach(item => {
            typedi_1.Container.set(item[0], item[1]);
        });
        (0, routing_controllers_1.useExpressServer)(this.app, {
            cors: true,
            controllers: controllers_module_1.ControllersModule,
            defaultErrorHandler: false,
            classTransformer: true,
            validation: true,
            currentUserChecker: this.currentUserChecker,
            authorizationChecker: this.authorizationChecker,
            middlewares: [error_handler_middleware_1.ErrorHandlerMiddleware],
            interceptors: [response_interceptor_1.ResponseInterceptor]
        });
    }
}
exports.ExpressSocketIOServer = ExpressSocketIOServer;
