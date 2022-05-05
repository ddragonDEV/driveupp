import "reflect-metadata";
import "./aliases";

import { exit } from "process";
import { ExpressServer } from "./Express/Express.server";
import { MongoServer } from "./Mongo/MongoServer";
import { SocketIOServer } from './SocketIO/SocketIO.Server';
import { NodemailerService } from './Nodemailer/Nodemailer.Server';
import { ExpressSocketIOServer } from "./Express/ExpressSocketIO.server";

export class Server {
  async initialize() {
    try {
      await this.expressSocketIOInstance();
      await this.MongoInstance();
      await this.NodemailerInstance();

    } catch (error) {
      console.log(error);

      exit(1);
    }
  }

  private async expressSocketIOInstance() {
    await new ExpressSocketIOServer();
  }

  private async expressInstance() {
    await new ExpressServer();
  }

  private async socketIoInstance() {
    await new SocketIOServer();
  }

  private async MongoInstance() {
    await new MongoServer();
  }

  private async NodemailerInstance() {
    await new NodemailerService();
  }
}
