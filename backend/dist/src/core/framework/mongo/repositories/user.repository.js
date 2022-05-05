"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRespository = void 0;
const BaseMongoRepository_1 = require("@bootstrap/Mongo/utilities/BaseMongoRepository");
const MongoosePagination_1 = require("@bootstrap/Mongo/utilities/MongoosePagination");
const user_entity_1 = require("@domain/user/user.entity");
const dayjs_1 = __importDefault(require("dayjs"));
const user_schema_1 = require("../schemas/user.schema");
class UserRespository extends BaseMongoRepository_1.BaseRepository {
    constructor() {
        super(user_schema_1.UserModel);
    }
    async logicalDelete(id, status) {
        return await user_schema_1.UserModel.findOneAndUpdate({ _id: id }, { deleted: status }, { new: true });
    }
    async countUsers() {
        return await user_schema_1.UserModel.aggregate([
            {
                $facet: {
                    totalUsers: [
                        { $count: "count" }
                    ],
                    deletedUsers: [
                        { $match: { deleted: true } },
                        { $count: "count" }
                    ],
                    activeUsers: [
                        { $match: { deleted: false } },
                        { $count: "count" }
                    ],
                    newUsersInLastWeek: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: (0, dayjs_1.default)().subtract(7, "day").hour(0).minute(0).second(0).toDate(),
                                    $lte: (0, dayjs_1.default)().toDate()
                                }
                            }
                        },
                        { $count: "count" }
                    ]
                }
            }
        ])
            .addFields({ totalUsers: { $ifNull: [{ $arrayElemAt: ["$totalUsers.count", 0] }, 0] } })
            .addFields({ deletedUsers: { $ifNull: [{ $arrayElemAt: ["$deletedUsers.count", 0] }, 0] } })
            .addFields({ activeUsers: { $ifNull: [{ $arrayElemAt: ["$activeUsers.count", 0] }, 0] } })
            .addFields({ newUsersInLastWeek: { $ifNull: [{ $arrayElemAt: ["$newUsersInLastWeek.count", 0] }, 0] } });
    }
    async getUsers(filter, { page, rowsPerPage }) {
        const { skip, limit, currentPage } = (0, MongoosePagination_1.mongoosePagination)(page, rowsPerPage);
        const result = await user_schema_1.UserModel.aggregate([
            { $match: { role: { $regex: filter.role, $options: "i" } } },
            {
                $group: {
                    _id: "$_id",
                    rut: { $first: "$rut" },
                    email: { $first: "$email" },
                    name: { $first: "$name" },
                    lastName: { $first: "$lastName" },
                    phone: { $first: "$phone" },
                    role: { $first: "$role" },
                    createdAt: { $first: "$createdAt" },
                    fullName: { $push: { $concat: ["$name", " ", "$lastName"] } },
                    verifiedAccount: { $first: "$verifiedAccount" },
                    deleted: { $first: "$deleted" },
                    photo: { $first: "$photo" },
                    scoreAverage: { $first: "$scoreAverage" }
                }
            },
            { $match: { fullName: { $regex: filter.name || "", $options: "i" } } },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: 1,
                    rut: 1,
                    email: 1,
                    name: 1,
                    lastName: 1,
                    phone: 1,
                    role: 1,
                    createdAt: 1,
                    deleted: 1,
                    fullName: { $arrayElemAt: ["$fullName", 0] },
                    verifiedAccount: 1,
                    photo: 1,
                    scoreAverage: 1
                }
            },
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
    async createMechanic(entry) {
        const newElement = new user_schema_1.UserModel({ ...entry, role: user_entity_1.Roles.mechanic });
        return await newElement.save();
    }
    async verifyUser(id) {
        return await user_schema_1.UserModel.findOneAndUpdate({ _id: id }, { verifiedAccount: true });
    }
    async updatePassword(id, password) {
        return await user_schema_1.UserModel.findOneAndUpdate({ _id: id }, { password });
    }
    async getUserByEmail(email) {
        return await user_schema_1.UserModel.findOne({ email });
    }
}
exports.UserRespository = UserRespository;
