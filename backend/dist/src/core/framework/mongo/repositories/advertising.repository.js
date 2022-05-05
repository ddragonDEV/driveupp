"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisingRespository = void 0;
const BaseMongoRepository_1 = require("@bootstrap/Mongo/utilities/BaseMongoRepository");
const advertising_schema_1 = require("../schemas/advertising.schema");
class AdvertisingRespository extends BaseMongoRepository_1.BaseRepository {
    constructor() {
        super(advertising_schema_1.AdvertisingModel);
    }
}
exports.AdvertisingRespository = AdvertisingRespository;
