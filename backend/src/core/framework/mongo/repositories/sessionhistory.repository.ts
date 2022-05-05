import dayjs from "dayjs";
import { SessionHistoryAdapter } from "@domain/sessionhistory/sessionhistory.adapter";
import { SessionHistoryCreate, SessionHistoryEntity } from "@domain/sessionhistory/sessionhistory.entity";
import { SessionHistoryModel } from "../schemas/sessionhistory.schema";
import { dateQueryFilter, Period } from "@bootstrap/Mongo/utilities/MongooseDateFilter";
import { Roles } from "@domain/user/user.entity";


export class SessionHistoryRepository implements SessionHistoryAdapter {
    async getSessionPerPeriod(period: Period): Promise<any> {
        const { startDate, endDate } = dateQueryFilter(period);

        return await SessionHistoryModel.aggregate([
            { $match: { role: { $ne: Roles.admin } } },
            { $match: { date: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    "_id": "$date",
                    date: { $first: "$date" },
                    totalSessions: { $sum: 1 }
                }
            },
            { $sort: { date: 1 } }
        ]);
    }

    async getTodaySessionByUserId(userId: string): Promise<SessionHistoryEntity | null> {
        return await SessionHistoryModel.findOne({
            userId,
            date: dayjs().hour(0).minute(0).second(0).millisecond(0).toDate()
        });
    }

    async create(entry: SessionHistoryCreate): Promise<SessionHistoryEntity> {
        const newElement = new SessionHistoryModel({
            ...entry,
            date: dayjs().hour(0).minute(0).second(0).millisecond(0).toDate()
        });

        return await newElement.save();
    }
}