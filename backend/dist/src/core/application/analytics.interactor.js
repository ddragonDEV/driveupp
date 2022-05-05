"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsInteractor = void 0;
const typedi_1 = require("typedi");
let AnalyticsInteractor = class AnalyticsInteractor {
    constructor(userAdapter, assistanceAdapter, sessionHistoryAdapter) {
        this.userAdapter = userAdapter;
        this.assistanceAdapter = assistanceAdapter;
        this.sessionHistoryAdapter = sessionHistoryAdapter;
    }
    ;
    async generateUserAnalytics() {
        return await this.userAdapter.countUsers();
    }
    ;
    async generateAssistanceMechanicPerPeriodAnalytics(period, pagination) {
        return await this.assistanceAdapter.assistancesPerPeriod(period, pagination);
    }
    async generateAssistanceZonePerPeriodAnalytics(period) {
        return await this.assistanceAdapter.getTotalAssistancesByZone(period);
    }
    async generateSessionPeriodAnalytics(period) {
        return await this.sessionHistoryAdapter.getSessionPerPeriod(period);
    }
};
AnalyticsInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("UserAdapter")),
    __param(1, (0, typedi_1.Inject)("AssistanceAdapter")),
    __param(2, (0, typedi_1.Inject)("SessionHistoryAdapter")),
    __metadata("design:paramtypes", [Object, Object, Object])
], AnalyticsInteractor);
exports.AnalyticsInteractor = AnalyticsInteractor;
