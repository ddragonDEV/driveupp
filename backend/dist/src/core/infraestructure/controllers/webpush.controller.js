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
exports.WebPushController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const webpush_interactor_1 = require("@application/webpush.interactor");
const webpush_dto_1 = require("@domain/webpush/webpush.dto");
const user_entity_1 = require("@domain/user/user.entity");
let WebPushController = class WebPushController {
    constructor(webpushInteractor) {
        this.webpushInteractor = webpushInteractor;
    }
    ;
    async createWebPush(user, entry) {
        return await this.webpushInteractor.createWebPush(user, { webpushObject: entry });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/subscription"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.mechanic, user_entity_1.Roles.user]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        webpush_dto_1.SubscriptionWebPushDTO]),
    __metadata("design:returntype", Promise)
], WebPushController.prototype, "createWebPush", null);
WebPushController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/webpush"),
    __metadata("design:paramtypes", [webpush_interactor_1.WebPushInteractor])
], WebPushController);
exports.WebPushController = WebPushController;
