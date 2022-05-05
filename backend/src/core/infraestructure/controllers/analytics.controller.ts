import { JsonController, Authorized, Body, Post } from 'routing-controllers';
import { Service } from "typedi";

import { AnalyticsInteractor } from '@application/analytics.interactor';
import { Roles } from "@domain/user/user.entity";
import { AssistanceAnalyticsDTO, SessionsAnalyticsDTO } from "@domain/analytics/analytics.dto";

@Service()
@JsonController("/analytics")
@Authorized([Roles.admin])
export class AnalyticsController {
    constructor(private analyticsInteractor: AnalyticsInteractor) { };

    @Post("/users")
    async createUserAnalytics() {
        return await this.analyticsInteractor.generateUserAnalytics();
    }

    @Post("/assistance/by-mechanic")
    async createAssistancByMecheAnalytics(@Body() entry: AssistanceAnalyticsDTO) {
        return await this.analyticsInteractor.generateAssistanceMechanicPerPeriodAnalytics(
            { startDate: entry.startDate, endDate: entry.endDate },
            { page: entry.page, rowsPerPage: entry.rowsPerPage }
        );
    }

    @Post("/assistance/by-zone")
    async createAssistanceByZoneAnalytics(@Body() entry: AssistanceAnalyticsDTO) {
        return await this.analyticsInteractor.generateAssistanceZonePerPeriodAnalytics(
            { startDate: entry.startDate, endDate: entry.endDate }
        );
    }

    @Post("/sessions/by-role")
    async createSessionAnalytics(@Body() entry: SessionsAnalyticsDTO) {
        return await this.analyticsInteractor.generateSessionPeriodAnalytics(
            { startDate: entry.startDate, endDate: entry.endDate }
        );
    }


}