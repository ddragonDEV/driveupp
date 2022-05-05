"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionHistoryRepository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const sessionhistory_schema_1 = require("../schemas/sessionhistory.schema");
const MongooseDateFilter_1 = require("@bootstrap/Mongo/utilities/MongooseDateFilter");
const user_entity_1 = require("@domain/user/user.entity");
class SessionHistoryRepository {
    async getSessionPerPeriod(period) {
        const { startDate, endDate } = (0, MongooseDateFilter_1.dateQueryFilter)(period);
        return await sessionhistory_schema_1.SessionHistoryModel.aggregate([
            { $match: { role: { $ne: user_entity_1.Roles.admin } } },
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
    async getTodaySessionByUserId(userId) {
        return await sessionhistory_schema_1.SessionHistoryModel.findOne({
            userId,
            date: (0, dayjs_1.default)().hour(0).minute(0).second(0).millisecond(0).toDate()
        });
    }
    async create(entry) {
        const newElement = new sessionhistory_schema_1.SessionHistoryModel({
            ...entry,
            date: (0, dayjs_1.default)().hour(0).minute(0).second(0).millisecond(0).toDate()
        });
        return await newElement.save();
    }
}
exports.SessionHistoryRepository = SessionHistoryRepository;
