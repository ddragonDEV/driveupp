import { BaseRepository } from "@bootstrap/Mongo/utilities/BaseMongoRepository";
import { AnalyticsCreate, AnalyticsEdit, AnalyticsEntity } from "@domain/analytics/analytics.entity";
import { AnalyticsModel } from "../schemas/analytics.schema";


export class AnalyticsRespository extends BaseRepository<AnalyticsCreate, AnalyticsEdit, AnalyticsEntity>{
    constructor() {
        super(AnalyticsModel);
    }
}