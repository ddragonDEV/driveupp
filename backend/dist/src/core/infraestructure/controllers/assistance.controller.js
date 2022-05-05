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
exports.AssistanceController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const assistance_interactor_1 = require("@application/assistance.interactor");
const user_entity_1 = require("@domain/user/user.entity");
const assistance_dto_1 = require("@domain/assistance/assistance.dto");
let AssistanceController = class AssistanceController {
    constructor(assistanceInteractor) {
        this.assistanceInteractor = assistanceInteractor;
    }
    ;
    async createAssistance(user) {
        return await this.assistanceInteractor.cancelCurrentAssistance(user);
    }
    async getCurrentAssistance(user) {
        return await this.assistanceInteractor.getCurrentAssistance(user);
    }
    async myAssistances(user, paginationData) {
        return await this.assistanceInteractor.myAssists(user, paginationData);
    }
    async rateAssitance(user, { id_assistance, score }) {
        return await this.assistanceInteractor.rate(user, id_assistance, score);
    }
    ;
    async getAllAsistances(entry) {
        return await this.assistanceInteractor.getAllAsistances(entry);
    }
};
__decorate([
    (0, routing_controllers_1.Put)("/cancel-current"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "createAssistance", null);
__decorate([
    (0, routing_controllers_1.Get)("/current"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "getCurrentAssistance", null);
__decorate([
    (0, routing_controllers_1.Post)("/my-assists"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        assistance_dto_1.MyAssistsDTO]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "myAssistances", null);
__decorate([
    (0, routing_controllers_1.Post)("/rate"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        assistance_dto_1.RateAssistance]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "rateAssitance", null);
__decorate([
    (0, routing_controllers_1.Post)("/all"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assistance_dto_1.GetAssistancesFilterDTO]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "getAllAsistances", null);
AssistanceController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/assistance"),
    __metadata("design:paramtypes", [assistance_interactor_1.AssistanceInteractor])
], AssistanceController);
exports.AssistanceController = AssistanceController;
