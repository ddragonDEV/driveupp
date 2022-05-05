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
exports.SessionHistoryInteractor = void 0;
const typedi_1 = require("typedi");
let SessionHistoryInteractor = class SessionHistoryInteractor {
    constructor(sessionhistoryAdapter) {
        this.sessionhistoryAdapter = sessionhistoryAdapter;
    }
    ;
    async createSessionHistory(entry) {
        return await this.sessionhistoryAdapter.create(entry);
    }
    ;
    async updateSessionHistory(id, entry) {
        return await this.sessionhistoryAdapter.update(id, entry);
    }
    ;
    async getSessionHistoryById(id) {
        return await this.sessionhistoryAdapter.getById(id);
    }
    ;
    async getAllSessionHistorys() {
        return await this.sessionhistoryAdapter.getAll();
    }
    ;
    async deleteSessionHistory(id) {
        return await this.sessionhistoryAdapter.delete(id);
    }
    ;
};
SessionHistoryInteractor = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("SessionHistoryAdapter")),
    __metadata("design:paramtypes", [Object])
], SessionHistoryInteractor);
exports.SessionHistoryInteractor = SessionHistoryInteractor;
