import dayjs from "dayjs";
import { SessionAdapter } from "@domain/session/session.adapter";
import { SessionCreate, SessionEntity } from "@domain/session/session.entity";
import { AppEnv } from "@modules/env.module";
import { SessionModel } from "../schemas/session.schema";


export class SessionRespository implements SessionAdapter {
    async getSessionByToken(token: string): Promise<SessionEntity> {
        return await SessionModel.findOne({ token });
    }

    async getSessionByEmail(email: string): Promise<SessionEntity> {
        return await SessionModel.findOne({ email });
    }

    async create(entry: SessionCreate): Promise<SessionEntity> {
        entry["expirationDate"] = dayjs().add(AppEnv.EXPIRATION_SESSION_IN_DB, "second");
        const newSession = new SessionModel(entry);

        return await newSession.save();
    }

    async deleteSession(id: string): Promise<SessionEntity> {
        return await SessionModel.findByIdAndRemove(id);
    }

    async deleteAllSessionsByUserId(userId: string): Promise<any> {
        return await SessionModel.deleteMany({ userId });
    }
}