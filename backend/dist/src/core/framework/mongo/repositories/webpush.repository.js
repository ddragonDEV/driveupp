"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPushRepository = void 0;
const BaseMongoRepository_1 = require("@bootstrap/Mongo/utilities/BaseMongoRepository");
const webpush_schema_1 = require("../schemas/webpush.schema");
class WebPushRepository extends BaseMongoRepository_1.BaseRepository {
    constructor() {
        super(webpush_schema_1.WebPushModel);
    }
    async getByUserId(userId) {
        return await webpush_schema_1.WebPushModel.findOne({ userId });
    }
}
exports.WebPushRepository = WebPushRepository;
