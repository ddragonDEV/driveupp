import { UserEntity } from "@domain/user/user.entity";
import { WebPushAdapter } from "@domain/webpush/webpush.adapter";
import { WebPushObject } from "@domain/webpush/webpush.entity";
import { Service, Inject } from "typedi";

@Service()
export class WebPushInteractor {
    constructor(@Inject("WebPushAdapter") private webpushAdapter: WebPushAdapter) { };

    async createWebPush(user: UserEntity, { webpushObject }: WebPushObject) {
        const webpushUser = await this.webpushAdapter.getByUserId(user["_id"]);
        if (webpushUser) await this.webpushAdapter.delete(webpushUser["_id"]);

        return await this.webpushAdapter.create({
            userId: user["_id"],
            webpushObject
        });
    };
}