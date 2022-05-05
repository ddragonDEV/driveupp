import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { SessionCreate, SessionEntity } from "./session.entity";

export interface SessionAdapter {
    create(entry: SessionCreate): Promise<SessionEntity>;
    deleteSession(id: string): Promise<SessionEntity>;
    deleteAllSessionsByUserId(userId: string): Promise<SessionEntity>;
    getSessionByEmail(email: string): Promise<SessionEntity | null>;
    getSessionByToken(token: string): Promise<SessionEntity | null>;
}