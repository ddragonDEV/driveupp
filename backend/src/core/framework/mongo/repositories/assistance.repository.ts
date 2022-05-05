import { BaseRepository } from "@bootstrap/Mongo/utilities/BaseMongoRepository";
import { dateQueryFilter, Period } from "@bootstrap/Mongo/utilities/MongooseDateFilter";
import { mongoosePagination, paginateQuery, Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { AssistanceAdapter } from "@domain/assistance/assistance.adapter";
import { AsistanceStatus, AssistanceCreate, AssistanceEdit, AssistanceEntity, GetAssistancesFilter } from "@domain/assistance/assistance.entity";
import { AssistanceModel } from "../schemas/assistance.schema";
import { UserModel } from "../schemas/user.schema";
import mongoose from 'mongoose';


export class AssistanceRepository extends BaseRepository<AssistanceCreate, AssistanceEdit, AssistanceEntity>
    implements AssistanceAdapter {
    constructor() {
        super(AssistanceModel);
    }

    async getTotalAssistancesByUserId(id: string): Promise<any> {
        return await AssistanceModel.aggregate([
            {
                $match: {
                    $or: [
                        { userId: { $eq: new mongoose.Types.ObjectId(id) } },
                        { mechanicId: { $eq: new mongoose.Types.ObjectId(id) } }
                    ]
                },
            },
            {
                $facet: {
                    completed: [
                        { $match: { status: AsistanceStatus.Completed } },
                        { $count: "count" }
                    ],
                    inProcess: [
                        { $match: { status: AsistanceStatus.InProcess } },
                        { $count: "count" }
                    ],
                    canceled: [
                        { $match: { status: AsistanceStatus.Canceled } },
                        { $count: "count" }
                    ],
                    aborted: [
                        { $match: { status: AsistanceStatus.Aborted } },
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

    async getAllAssistances(filter: GetAssistancesFilter): Promise<any> {
        const { skip, limit, currentPage } = mongoosePagination(filter.page, filter.rowsPerPage);

        const result = await AssistanceModel.aggregate([
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
        ]).addFields({ totalItems: { $ifNull: [{ $arrayElemAt: ["$totalItems.count", 0] }, 0] } });;

        return paginateQuery({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }

    async updateScore(idAssistance: string, idUser: string, role: string, score: number): Promise<any> {
        const session = await AssistanceModel.startSession();
        let asistanceUpdated;
        await session.withTransaction(async () => {
            const user = await UserModel.findByIdAndUpdate(idUser, {
                $inc: { "scorePoints": score, "scoreCount": 1 }
            }, { new: true });
            const [_, assistance] = await Promise.all([
                UserModel.findByIdAndUpdate(idUser, { scoreAverage: user.scorePoints / user.scoreCount }, { new: true }),
                AssistanceModel.findOneAndUpdate({ _id: idAssistance }, {
                    $set: { [`score.${ role }`]: score }
                }, { new: true })
            ]);
            asistanceUpdated = assistance;

        });

        await session.endSession();
        return asistanceUpdated;
    }

    async cancel(id: string, idUser: string, roleUser: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: AsistanceStatus.Canceled,
            cancellation: {
                userId: idUser,
                userRole: roleUser,
            }
        }, { new: true });
    }

    async abort(id: string, idUser: string, roleUser: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: AsistanceStatus.Aborted,
            cancellation: {
                userId: idUser,
                userRole: roleUser,
            }
        }, { new: true });
    }

    async completed(id: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOneAndUpdate({ _id: id }, {
            status: AsistanceStatus.Completed
        }, { new: true });
    }

    async getByUserId(id: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOne({ userId: id, status: AsistanceStatus.InProcess });
    }

    async getByMechanicId(id: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOne({ mechanicId: id, status: AsistanceStatus.InProcess });
    }

    async getByParticipants(idUser: string, idMechanic: string): Promise<AssistanceEntity> {
        return await AssistanceModel.findOne({
            status: AsistanceStatus.InProcess,
            userId: idUser,
            mechanicId: idMechanic
        });
    }

    async getAssistancesByUserId(id: string, { page, rowsPerPage }: Pagination): Promise<any> {
        const { skip, limit, currentPage } = mongoosePagination(page, rowsPerPage);

        const result = await AssistanceModel.aggregate([
            { $match: { userId: { $eq: id } } },
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

    async getAssistancesByMechanicId(id: string, { page, rowsPerPage }: Pagination): Promise<any> {
        const { skip, limit, currentPage } = mongoosePagination(page, rowsPerPage);

        const result = await AssistanceModel.aggregate([
            { $match: { mechanicId: { $eq: id } } },
            {
                $facet: {
                    list: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
                    totalItems: [{ $count: "count" }]
                }
            }
        ]).addFields({ totalItems: { $ifNull: [{ $arrayElemAt: ["$totalItems.count", 0] }, 0] } });;

        return paginateQuery({
            items: result[0].list,
            totalItems: result[0].totalItems,
            rowsPerPage: limit,
            currentPage: currentPage
        });
    }

    async assistancesPerPeriod(period: Period, { page, rowsPerPage }: Pagination): Promise<any> {
        const { startDate, endDate } = dateQueryFilter(period);

        return await AssistanceModel.aggregate([
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

    async getTotalAssistancesByZone(period: Period): Promise<any> {
        const { startDate, endDate } = dateQueryFilter(period);

        return await AssistanceModel.aggregate([
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