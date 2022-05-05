
import 'reflect-metadata';
import express, { Application } from 'express';
import { Action, NotFoundError, UnauthorizedError, useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';

import { repositoriesModule } from '@modules/repositories.module';
import { ControllersModule } from '@modules/controllers.module';
import { AppEnv, ExpressEnv } from '@modules/env.module';
import { ErrorHandlerMiddleware } from './error-handler.middleware';
import { ResponseInterceptor } from './response.interceptor';
import { UserRespository } from '@framework/mongo/repositories/user.repository';
import { SessionRespository } from '@framework/mongo/repositories/session.repository';
import { TokenTools } from '../../src/shared/helpers/TokenTools';

export class ExpressServer {
  app: Application;
  userRepository = new UserRespository();
  sessionRepository = new SessionRespository();

  constructor() {
    this.app = express();
    this.app.use(express.json());

    this.routingControllerEvent();

    this.app.listen(ExpressEnv.PORT, () => {
      console.log(`Server is running on port ${ ExpressEnv.PORT }`);
    });
  }

  private routingControllerEvent() {
    useContainer(Container);

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
    try {
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
    } catch (error) {
      console.log(error);
    }

  };
}
