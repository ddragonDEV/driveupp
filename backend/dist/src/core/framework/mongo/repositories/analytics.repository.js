"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRespository = void 0;
const BaseMongoRepository_1 = require("@bootstrap/Mongo/utilities/BaseMongoRepository");
const analytics_schema_1 = require("../schemas/analytics.schema");
class AnalyticsRespository extends BaseMongoRepository_1.BaseRepository {
    constructor() {
        super(analytics_schema_1.AnalyticsModel);
    }
}
exports.AnalyticsRespository = AnalyticsRespository;
