import { JsonController, Authorized, CurrentUser, Put, Get, Body, Post } from "routing-controllers";
import { Service } from "typedi";

import { AssistanceInteractor } from '@application/assistance.interactor';
import { Roles, UserEntity } from '@domain/user/user.entity';
import { GetAssistancesFilterDTO, MyAssistsDTO, RateAssistance } from "@domain/assistance/assistance.dto";

@Service()
@JsonController("/assistance")
export class AssistanceController {
    constructor(private assistanceInteractor: AssistanceInteractor) { };

    @Put("/cancel-current")
    @Authorized([Roles.user, Roles.mechanic])
    async createAssistance(@CurrentUser({ required: true }) user: UserEntity) {
        return await this.assistanceInteractor.cancelCurrentAssistance(user);
    }

    @Get("/current")
    @Authorized([Roles.user, Roles.mechanic])
    async getCurrentAssistance(@CurrentUser({ required: true }) user: UserEntity) {
        return await this.assistanceInteractor.getCurrentAssistance(user);
    }

    @Post("/my-assists")
    @Authorized([Roles.user, Roles.mechanic])
    async myAssistances(@CurrentUser({ required: true }) user: UserEntity,
        @Body() paginationData: MyAssistsDTO) {
        return await this.assistanceInteractor.myAssists(user, paginationData);
    }

    @Post("/rate")
    @Authorized([Roles.user, Roles.mechanic])
    async rateAssitance(@CurrentUser({ required: true }) user: UserEntity,
        @Body() { id_assistance, score }: RateAssistance) {
        return await this.assistanceInteractor.rate(user, id_assistance, score);
    };

    @Post("/all")
    @Authorized([Roles.admin])
    async getAllAsistances(@Body() entry: GetAssistancesFilterDTO) {
        return await this.assistanceInteractor.getAllAsistances(entry);
    }
}