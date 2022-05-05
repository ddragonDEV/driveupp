import { BaseRepository } from "@bootstrap/Mongo/utilities/BaseMongoRepository";
import { AdvertisingCreate, AdvertisingEdit, AdvertisingEntity } from "@domain/advertising/advertising.entity";
import { AdvertisingModel } from "../schemas/advertising.schema";


export class AdvertisingRespository extends BaseRepository<AdvertisingCreate, AdvertisingEdit, AdvertisingEntity>{
    constructor() {
        super(AdvertisingModel);
    }
}