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
exports.WebPushInteractor = void 0;
const typedi_1 = require("typedi");
let WebPushInteractor = class WebPushInteractor {
    constructor(webpushAdapter) {
        this.webpushAdapter = webpushAdapter;
    }
    ;
    async createWebPush(user, { webpushObject }) {
        const webpushUser = await this.webpushAdapter.getByUserId(user["_id"]);
        if (webpushUser)
            await this.webpushAdapter.delete(webpushUser["_id"]);
        return await this.webpushAdapter.create({
            userId: user["_id"],
            webpushObject
        });
    }
    ;
};
WebPushInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("WebPushAdapter")),
    __metadata("design:paramtypes", [Object])
], WebPushInteractor);
exports.WebPushInteractor = WebPushInteractor;
