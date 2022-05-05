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
exports.AdvertisingController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const advertising_interactor_1 = require("@application/advertising.interactor");
const advertising_dto_1 = require("@domain/advertising/advertising.dto");
const user_entity_1 = require("@domain/user/user.entity");
let AdvertisingController = class AdvertisingController {
    constructor(advertisingInteractor) {
        this.advertisingInteractor = advertisingInteractor;
    }
    ;
    async createAdvertising(entry) {
        return await this.advertisingInteractor.createAdvertising(entry.banners);
    }
    async updateAdvertising(entry) {
        return await this.advertisingInteractor.updateAdvertising(entry._id, {
            image: entry.image,
            message: entry.message
        });
    }
    async deleteAdvertising(entry) {
        return await this.advertisingInteractor.deleteAdvertising(entry._id);
    }
    async getAllAdvertisings() {
        return await this.advertisingInteractor.getAllAdvertisings();
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/upload"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advertising_dto_1.CreateAdvertisingDTO]),
    __metadata("design:returntype", Promise)
], AdvertisingController.prototype, "createAdvertising", null);
__decorate([
    (0, routing_controllers_1.Post)("/update"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advertising_dto_1.UpdateAdvertisingDTO]),
    __metadata("design:returntype", Promise)
], AdvertisingController.prototype, "updateAdvertising", null);
__decorate([
    (0, routing_controllers_1.Post)("/delete"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advertising_dto_1.DeleteAdvertisingDTO]),
    __metadata("design:returntype", Promise)
], AdvertisingController.prototype, "deleteAdvertising", null);
__decorate([
    (0, routing_controllers_1.Get)("/list"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdvertisingController.prototype, "getAllAdvertisings", null);
AdvertisingController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/advertising"),
    __metadata("design:paramtypes", [advertising_interactor_1.AdvertisingInteractor])
], AdvertisingController);
exports.AdvertisingController = AdvertisingController;
