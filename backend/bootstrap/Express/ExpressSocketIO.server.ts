
import 'reflect-metadata';
import express, { Application as ExpressApplication } from "express";
import { createServer as createHttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { Action, NotFoundError, UnauthorizedError, useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import { repositoriesModule } from '@modules/repositories.module';
import { ControllersModule } from '@modules/controllers.module';
import { AppEnv, SocketIOEnv } from '@modules/env.module';
import { ErrorHandlerMiddleware } from './error-handler.middleware';
import { ResponseInterceptor } from './response.interceptor';
import { EventsModule } from '@modules/events.module';
import { UserRespository } from '../../src/core/framework/mongo/repositories/user.repository';
import { TokenTools } from '../../src/shared/helpers/TokenTools';
import { SessionRespository } from '../../src/core/framework/mongo/repositories/session.repository';

export const context: SocketContext = {
  users: {}
};
export class ExpressSocketIOServer {
  io: IOServer;
  app: ExpressApplication;
  userRepository = new UserRespository();
  sessionRepository = new SessionRespository();

  constructor() {
    this.app = express();
    const httpServer = createHttpServer(this.app);
    this.io = new IOServer(httpServer, { cors: { origin: "*" } });

    this.routingControllerEvent();

    EventsModule.forEach((event) => {
      new event(this.io, context);
    });

    httpServer.listen(SocketIOEnv.PORT, () => {
      console.log(`Express server established on port ${ SocketIOEnv.PORT }`);
    });
  }

  private routingControllerEvent() {
    useContainer(Container);

    Container.set("io", this.io);

    Object.entries(repositoriesModule).forEach(item => {
      Container.set(item[0], item[1]);
    });

    useExpressServer(this.app, {
      cors: true,
      controllers: ControllersModule,
      defaultErrorHandler: false,
      classTransformer: true,
      validation: true,
      currentUserChecker: this.currentUserChecker,
      authorizationChecker: this.authorizationChecker,
      middlewares: [ErrorHandlerMiddleware],
      interceptors: [ResponseInterceptor]
    });
  }


  currentUserChecker = async (action: Action) => {
    let token = action.request.headers["authorization"];
    if (token) token = token.replace("Bearer", "").trim();

    const [payloadToken, session] = await Promise.all([
      TokenTools.verifyJWT(token, AppEnv.SECRET_KEY),
      this.sessionRepository.getSessionByToken(token)
    ]);
    if (!session || !payloadToken) throw new UnauthorizedError("La sesión no existe");
    const user = this.userRepository.getById(payloadToken?._id);
    if (!user) throw new NotFoundError("El usuario no existe");

    return user;
  };

  authorizationChecker = async (action: Action, roles: string[]) => {
    let token = action.request.headers["authorization"];
    if (token) token = token.replace("Bearer", "").trim();
    const [payloadToken, session] = await Promise.all([
      TokenTools.verifyJWT(token, AppEnv.SECRET_KEY),
      this.sessionRepository.getSessionByToken(token)
    ]);

    if (!session || !payloadToken) throw new UnauthorizedError("La sesión no existe");
    const user = await this.userRepository.getById(payloadToken?._id);
    if (!user) throw new NotFoundError("El usuario no existe");

    return roles.includes(user.role);
  };
}



export interface SocketContext {
  users: {
    [key: string]: {
      userId: string;
      email: string;
      name: string;
      lastName: string;
      fullName: string;
      role: string;
      socketId: string;
      rating: number;
      photo?: string;
    };
  };
}