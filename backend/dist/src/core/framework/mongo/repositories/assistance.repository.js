"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceRepository = void 0;
const BaseMongoRepository_1 = require("@bootstrap/Mongo/utilities/BaseMongoRepository");
const MongooseDateFilter_1 = require("@bootstrap/Mongo/utilities/MongooseDateFilter");
const MongoosePagination_1 = require("@bootstrap/Mongo/utilities/MongoosePagination");
const assistance_entity_1 = require("@domain/assistance/assistance.entity");
const assistance_schema_1 = require("../schemas/assistance.schema");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_1 = __importDefault(require("mongoose"));
class AssistanceRepository extends BaseMongoRepository_1.BaseRepository {
    constructor() {
        super(assistance_schema_1.AssistanceModel);
    }
    async getTotalAssistancesByUserId(id) {
        return await assistance_schema_1.AssistanceModel.aggregate([
            {
                $match: {
                    $or: [
                        { userId: { $eq: new mongoose_1.default.Types.ObjectId(id) } },
                        { mechanicId: { $eq: new mongoose_1.default.Types.ObjectId(id) } }
                    ]
                },
            },
            {
                $facet: {
                    completed: [
                        { $match: { status: assistance_entity_1.AsistanceStatus.Completed } },
                        { $count: "count" }
                    ],
                    inProcess: [
                        { $match: { status: assistance_entity_1.AsistanceStatus.InProcess } },
                        { $count: "count" }
                    ],
                    canceled: [
                        { $match: { status: assistance_entity_1.AsistanceStatus.Canceled } },
                        { $count: "count" }
                    ],
                    aborted: [
                        { $match: { status: assistance_entity_1.AsistanceStatus.Aborted } },
                        { $count: "count" }
                    ]
                }
            }
        ])
            .addFields({ completed: { $ifNull: [{ $arrayElemAt: ["$completed.count", 0] }, 0] } })
            .addFields({ inProcess: { $ifNull: [{ $arrayElemAt: ["$inProcess.count", 0] }, 0] } })
            .addFields({ canceled: { $ifNull: [{ $arrayElemAt: ["$canceled.count", 0] }, 0] } })
            .addFields({ aborted: { $ifNull: [{ $arrayElemAt: ["$aborted.count", 0] }, 0] } });
    }
    async getAllAssistances(filter) {
        const { skip, limit, currentPage } = (0, MongoosePagination_1.mongoosePagination)(filter.page, filter.rowsPerPage);
        const result = await assistance_schema_1.AssistanceModel.aggregate([
            { $match: { status: { $regex: filter.status, $options: "i" } } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userInfo" } },
            { $unwind: "$userInfo" },
            { $lookup: { from: "users", localField: "mechanicId", foreignField: "_id", as: "mechanicInfo" } },
            { $unwind: "$mechanicInfo" },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    mechanicId: 1,
                    userFullName: { $concat: ["$userInfo.name", " ", "$userInfo.lastName"] },
                    mechanicFullName: { $concat: ["$mechanicInfo.name", " ", "$mechanicInfo.lastName"] },
                    status: 1,
                    canceledBy: "$cancellation.userRole",
                    createdAt: 1,
                    destinationAddress: 1
                }
            },
            {
                $match: {
                    $or: [
                        { userFullName: { $regex: filter.name || "", $options: "i" } },
                        { mechanicFullName: { $regex: filter.name || "", $options: "i" } }
                    ]
                },
            },
            {
                $facet: {
                    list: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }]
                }
            }
        ]).addFields({ totalItems: { $ifNull: [{ $arrayElemAt: ["$totalItems.count", 0] }, 0] } });
        ;
        return (0, MongoosePagination_1.paginateQuery)({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }
    async updateScore(idAssistance, idUser, role, score) {
        const session = await assistance_schema_1.AssistanceModel.startSession();
        let asistanceUpdated;
        await session.withTransaction(async () => {
            const user = await user_schema_1.UserModel.findByIdAndUpdate(idUser, {
                $inc: { "scorePoints": score, "scoreCount": 1 }
            }, { new: true });
            const [_, assistance] = await Promise.all([
                user_schema_1.UserModel.findByIdAndUpdate(idUser, { scoreAverage: user.scorePoints / user.scoreCount }, { new: true }),
                assistance_schema_1.AssistanceModel.findOneAndUpdate({ _id: idAssistance }, {
                    $set: { [`score.${role}`]: score }
                }, { new: true })
            ]);
            asistanceUpdated = assistance;
        });
        await session.endSession();
        return asistanceUpdated;
    }
    async cancel(id, idUser, roleUser) {
        return await assistance_schema_1.AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: assistance_entity_1.AsistanceStatus.Canceled,
            cancellation: {
                userId: idUser,
                userRole: roleUser,
            }
        }, { new: true });
    }
    async abort(id, idUser, roleUser) {
        return await assistance_schema_1.AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: assistance_entity_1.AsistanceStatus.Aborted,
            cancellation: {
                userId: idUser,
                userRole: roleUser,
            }
        }, { new: true });
    }
    async completed(id) {
        return await assistance_schema_1.AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: assistance_entity_1.AsistanceStatus.Completed
        }, { new: true });
    }
    async getByUserId(id) {
        return await assistance_schema_1.AssistanceModel.findOne({ userId: id, status: assistance_entity_1.AsistanceStatus.InProcess });
    }
    async getByMechanicId(id) {
        return await assistance_schema_1.AssistanceModel.findOne({ mechanicId: id, status: assistance_entity_1.AsistanceStatus.InProcess });
    }
    async getByParticipants(idUser, idMechanic) {
        return await assistance_schema_1.AssistanceModel.findOne({
            status: assistance_entity_1.AsistanceStatus.InProcess,
            userId: idUser,
            mechanicId: idMechanic
        });
    }
    async getAssistancesByUserId(id, { page, rowsPerPage }) {
        const { skip, limit, currentPage } = (0, MongoosePagination_1.mongoosePagination)(page, rowsPerPage);
        const result = await assistance_schema_1.AssistanceModel.aggregate([
            { $match: { userId: { $eq: id } } },
            {
                $facet: {
                    list: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }]
                }
            }
        ]).addFields({ totalItems: { $ifNull: [{ $arrayElemAt: ["$totalItems.count", 0] }, 0] } });
        return (0, MongoosePagination_1.paginateQuery)({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }
    async getAssistancesByMechanicId(id, { page, rowsPerPage }) {
        const { skip, limit, currentPage } = (0, MongoosePagination_1.mongoosePagination)(page, rowsPerPage);
        const result = await assistance_schema_1.AssistanceModel.aggregate([
            { $match: { mechanicId: { $eq: id } } },
            {
                $facet: {
                    list: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }]
                }
            }
        ]).addFields({ totalItems: { $ifNull: [{ $arrayElemAt: ["$totalItems.count", 0] }, 0] } });
        ;
        return (0, MongoosePagination_1.paginateQuery)({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }
    async assistancesPerPeriod(period, { page, rowsPerPage }) {
        const { startDate, endDate } = (0, MongooseDateFilter_1.dateQueryFilter)(period);
        return await assistance_schema_1.AssistanceModel.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            { $lookup: { from: "users", localField: "mechanicId", foreignField: "_id", as: "userInfo" } },
            { $unwind: "$userInfo" },
            {
                $group: {
                    _id: "$mechanicId",
                    name: { $first: "$userInfo.name" },
                    lastName: { $first: "$userInfo.lastName" },
                    totalAssistances: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: { $concat: ["$name", " ", "$lastName"] },
                    totalAssistances: 1
                }
            },
            {
                $sort: { fullName: 1 }
            }
        ]);
    }
    async getTotalAssistancesByZone(period) {
        const { startDate, endDate } = (0, MongooseDateFilter_1.dateQueryFilter)(period);
        return await assistance_schema_1.AssistanceModel.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: "$destinationAddress.postcode",
                    postalCode: { $first: "$destinationAddress.postcode" },
                    city: { $first: "$destinationAddress.city" },
                    country: { $first: "$destinationAddress.country" },
                    totalAssistances: { $sum: 1 }
                }
            },
            {
                $sort: { postalCode: 1 }
            }
        ]);
    }
}
exports.AssistanceRepository = AssistanceRepository;
