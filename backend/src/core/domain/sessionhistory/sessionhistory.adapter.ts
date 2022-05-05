import { Period } from "@bootstrap/Mongo/utilities/MongooseDateFilter";
import { SessionHistoryCreate, SessionHistoryEntity } from "./sessionhistory.entity";

export interface SessionHistoryAdapter {
    create(entry: SessionHistoryCreate): Promise<SessionHistoryEntity>;
    getTodaySessionByUserId(userId: string): Promise<SessionHistoryEntity | null>;
    getSessionPerPeriod(period: Period): Promise<any>;
}