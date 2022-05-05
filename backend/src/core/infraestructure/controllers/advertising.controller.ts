import { JsonController, Post, Body, Get, Authorized } from "routing-controllers";
import { Service } from "typedi";

import { AdvertisingInteractor } from '@application/advertising.interactor';
import { CreateAdvertisingDTO, DeleteAdvertisingDTO, UpdateAdvertisingDTO } from "@domain/advertising/advertising.dto";
import { Roles } from "@domain/user/user.entity";

@Service()
@JsonController("/advertising")
export class AdvertisingController {
    constructor(private advertisingInteractor: AdvertisingInteractor) { };

    @Post("/upload")
    @Authorized([Roles.admin])
    async createAdvertising(@Body() entry: CreateAdvertisingDTO) {
        return await this.advertisingInteractor.createAdvertising(entry.banners);
    }

    @Post("/update")
    @Authorized([Roles.admin])
    async updateAdvertising(@Body() entry: UpdateAdvertisingDTO) {
        return await this.advertisingInteractor.updateAdvertising(entry._id, {
            image: entry.image,
            message: entry.message
        });
    }

    @Post("/delete")
    @Authorized([Roles.admin])
    async deleteAdvertising(@Body() entry: DeleteAdvertisingDTO) {
        return await this.advertisingInteractor.deleteAdvertising(entry._id);
    }

    @Get("/list")
    @Authorized([Roles.user, Roles.mechanic])
    async getAllAdvertisings() {
        return await this.advertisingInteractor.getAllAdvertisings();
    }
}