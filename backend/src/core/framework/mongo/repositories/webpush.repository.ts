import { BaseRepository } from "@bootstrap/Mongo/utilities/BaseMongoRepository";
import { WebPushAdapter } from "@domain/webpush/webpush.adapter";
import { WebPushCreate, WebPushEdit, WebPushEntity } from "@domain/webpush/webpush.entity";
import { WebPushModel } from "../schemas/webpush.schema";


export class WebPushRepository extends BaseRepository<WebPushCreate, WebPushEdit, WebPushEntity>
    implements WebPushAdapter {
    constructor() {
        super(WebPushModel);
    }

    async getByUserId(userId: string): Promise<WebPushEntity> {
        return await WebPushModel.findOne({ userId });
    }
}