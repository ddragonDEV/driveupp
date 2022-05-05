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
exports.AnalyticsController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const analytics_interactor_1 = require("@application/analytics.interactor");
const user_entity_1 = require("@domain/user/user.entity");
const analytics_dto_1 = require("@domain/analytics/analytics.dto");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsInteractor) {
        this.analyticsInteractor = analyticsInteractor;
    }
    ;
    async createUserAnalytics() {
        return await this.analyticsInteractor.generateUserAnalytics();
    }
    async createAssistancByMecheAnalytics(entry) {
        return await this.analyticsInteractor.generateAssistanceMechanicPerPeriodAnalytics({ startDate: entry.startDate, endDate: entry.endDate }, { page: entry.page, rowsPerPage: entry.rowsPerPage });
    }
    async createAssistanceByZoneAnalytics(entry) {
        return await this.analyticsInteractor.generateAssistanceZonePerPeriodAnalytics({ startDate: entry.startDate, endDate: entry.endDate });
    }
    async createSessionAnalytics(entry) {
        return await this.analyticsInteractor.generateSessionPeriodAnalytics({ startDate: entry.startDate, endDate: entry.endDate });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "createUserAnalytics", null);
__decorate([
    (0, routing_controllers_1.Post)("/assistance/by-mechanic"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.AssistanceAnalyticsDTO]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "createAssistancByMecheAnalytics", null);
__decorate([
    (0, routing_controllers_1.Post)("/assistance/by-zone"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.AssistanceAnalyticsDTO]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "createAssistanceByZoneAnalytics", null);
__decorate([
    (0, routing_controllers_1.Post)("/sessions/by-role"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [analytics_dto_1.SessionsAnalyticsDTO]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "createSessionAnalytics", null);
AnalyticsController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/analytics"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __metadata("design:paramtypes", [analytics_interactor_1.AnalyticsInteractor])
], AnalyticsController);
exports.AnalyticsController = AnalyticsController;
