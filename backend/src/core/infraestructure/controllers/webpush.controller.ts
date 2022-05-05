import { JsonController, Post, Body, CurrentUser, Authorized } from "routing-controllers";
import { Service } from "typedi";

import { WebPushInteractor } from '@application/webpush.interactor';
import { SubscriptionWebPushDTO } from "@domain/webpush/webpush.dto";
import { Roles, UserEntity } from "@domain/user/user.entity";

@Service()
@JsonController("/webpush")
export class WebPushController {
    constructor(private webpushInteractor: WebPushInteractor) { };

    @Post("/subscription")
    @Authorized([Roles.mechanic, Roles.user])
    async createWebPush(@CurrentUser({ required: true }) user: UserEntity,
        @Body() entry: SubscriptionWebPushDTO) {
        return await this.webpushInteractor.createWebPush(user, { webpushObject: entry });
    }
}