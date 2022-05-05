import { Period } from "@bootstrap/Mongo/utilities/MongooseDateFilter";
import { Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { AssistanceAdapter } from "@domain/assistance/assistance.adapter";
import { SessionHistoryAdapter } from "@domain/sessionhistory/sessionhistory.adapter";
import { UserAdapter } from "@domain/user/user.adapter";
import { Service, Inject } from "typedi";

@Service()
export class AnalyticsInteractor {
    constructor(@Inject("UserAdapter") private userAdapter: UserAdapter,
        @Inject("AssistanceAdapter") private assistanceAdapter: AssistanceAdapter,
        @Inject("SessionHistoryAdapter") private sessionHistoryAdapter: SessionHistoryAdapter) { };

    async generateUserAnalytics() {
        return await this.userAdapter.countUsers();
    };

    async generateAssistanceMechanicPerPeriodAnalytics(period: Period, pagination: Pagination) {
        return await this.assistanceAdapter.assistancesPerPeriod(period, pagination);
    }

    async generateAssistanceZonePerPeriodAnalytics(period: Period) {
        return await this.assistanceAdapter.getTotalAssistancesByZone(period);
    }

    async generateSessionPeriodAnalytics(period: Period) {
        return await this.sessionHistoryAdapter.getSessionPerPeriod(period);
    }
}   