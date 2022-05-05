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
exports.AssistanceInteractor = void 0;
const personalized_http_error_1 = require("@bootstrap/Express/errors/personalized-http.error");
const assistance_entity_1 = require("@domain/assistance/assistance.entity");
const user_entity_1 = require("@domain/user/user.entity");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
let AssistanceInteractor = class AssistanceInteractor {
    constructor(assistanceAdapter) {
        this.assistanceAdapter = assistanceAdapter;
    }
    ;
    async cancelCurrentAssistance(user) {
        const currentAssistance = user.role === user_entity_1.Roles.user ? await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance)
            throw new routing_controllers_1.NotFoundError();
        return await this.assistanceAdapter.cancel(currentAssistance._id, user["_id"], user.role);
    }
    ;
    async getCurrentAssistance(user) {
        const currentAssistance = user.role === user_entity_1.Roles.user ? await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance)
            throw new routing_controllers_1.NotFoundError();
        return currentAssistance;
    }
    async myAssists(user, pagination) {
        return user.role === user_entity_1.Roles.user ? await this.assistanceAdapter.getAssistancesByUserId(user["_id"], pagination) :
            await this.assistanceAdapter.getAssistancesByMechanicId(user["_id"], pagination);
    }
    async rate(user, idAssitance, score) {
        const assistance = await this.assistanceAdapter.getById(idAssitance);
        if (!assistance)
            throw new routing_controllers_1.NotFoundError();
        if (assistance.status !== assistance_entity_1.AsistanceStatus.Completed)
            throw new personalized_http_error_1.PersonalizedError("El usuario no tiene los permisos para evaluar si la asistencia no se completó");
        const originId = user.role === user_entity_1.Roles.user ? "userId" : "mechanicId";
        const destinationId = user.role === user_entity_1.Roles.user ? "mechanicId" : "userId";
        if (assistance[originId].toString() !== user["_id"].toString())
            throw new personalized_http_error_1.PersonalizedError("El usuario no puede calificar una asistencia que no le pertenece");
        if (assistance.score[user.role] !== 0)
            throw new personalized_http_error_1.PersonalizedError("El usuario sólo puede calificar una vez");
        return await this.assistanceAdapter.updateScore(assistance._id, assistance[destinationId], user.role, score);
    }
    ;
    async getAllAsistances(filter) {
        return await this.assistanceAdapter.getAllAssistances(filter);
    }
};
AssistanceInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("AssistanceAdapter")),
    __metadata("design:paramtypes", [Object])
], AssistanceInteractor);
exports.AssistanceInteractor = AssistanceInteractor;
