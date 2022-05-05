import { BaseRepository } from "@bootstrap/Mongo/utilities/BaseMongoRepository";
import { mongoosePagination, paginateQuery, Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { UserAdapter } from "@domain/user/user.adapter";
import { GetUsersFilter, Roles, UserCreate, UserEdit, UserEntity } from "@domain/user/user.entity";
import dayjs from "dayjs";
import { UserModel } from "../schemas/user.schema";


export class UserRespository extends BaseRepository<UserCreate, UserEdit, UserEntity> implements UserAdapter {
    constructor() {
        super(UserModel);
    }

    async logicalDelete(id: string, status: boolean): Promise<UserEntity> {
        return await UserModel.findOneAndUpdate({ _id: id }, { deleted: status }, { new: true });
    }

    async countUsers(): Promise<any> {
        return await UserModel.aggregate([
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
                                    $gte: dayjs().subtract(7, "day").hour(0).minute(0).second(0).toDate(),
                                    $lte: dayjs().toDate()
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

    async getUsers(filter: GetUsersFilter, { page, rowsPerPage }: Pagination): Promise<any> {
        const { skip, limit, currentPage } = mongoosePagination(page, rowsPerPage);

        const result = await UserModel.aggregate([
            { $match: { role: { $regex: filter.role, $options: "i" } } },
            {
                $group: {
                    _id: "$_id" as any,
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

        return paginateQuery({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }

    async createMechanic(entry: UserCreate): Promise<UserEntity> {
        const newElement = new UserModel({ ...entry, role: Roles.mechanic });

        return await newElement.save() as unknown as any;
    }

    async verifyUser(id: string): Promise<UserEntity> {
        return await UserModel.findOneAndUpdate({ _id: id }, { verifiedAccount: true });
    }

    async updatePassword(id: string, password: string): Promise<UserEntity> {
        return await UserModel.findOneAndUpdate({ _id: id }, { password });
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return await UserModel.findOne({ email });
    }
}