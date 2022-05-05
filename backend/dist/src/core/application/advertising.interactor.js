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
exports.AdvertisingInteractor = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
let AdvertisingInteractor = class AdvertisingInteractor {
    constructor(advertisingAdapter) {
        this.advertisingAdapter = advertisingAdapter;
    }
    ;
    async createAdvertising(entry) {
        return await Promise.all([...entry].map(async (banner) => await this.advertisingAdapter.create(banner)));
    }
    ;
    async updateAdvertising(id, entry) {
        const bannerInDB = await this.advertisingAdapter.getById(id);
        if (!bannerInDB)
            throw new routing_controllers_1.NotFoundError();
        return await this.advertisingAdapter.update(id, entry);
    }
    ;
    async getAllAdvertisings() {
        return await this.advertisingAdapter.getAll();
    }
    ;
    async deleteAdvertising(id) {
        const bannerInDB = await this.advertisingAdapter.getById(id);
        if (!bannerInDB)
            throw new routing_controllers_1.NotFoundError();
        return await this.advertisingAdapter.delete(id);
    }
    ;
};
AdvertisingInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("AdvertisingAdapter")),
    __metadata("design:paramtypes", [Object])
], AdvertisingInteractor);
exports.AdvertisingInteractor = AdvertisingInteractor;
