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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_interactor_1 = require("@application/user.interactor");
const user_dto_1 = require("@domain/user/user.dto");
const user_entity_1 = require("@domain/user/user.entity");
let UserController = class UserController {
    constructor(authInteractor) {
        this.authInteractor = authInteractor;
    }
    ;
    async updateUser(user, entry) {
        return await this.authInteractor.updateUser(user, entry);
    }
    async registerMechanic(request, user) {
        return await this.authInteractor.createMechanic(request, user);
    }
    async deleteUser(user, userToDelete) {
        return await this.authInteractor.deleteUser(user, userToDelete._id, userToDelete.deleted);
    }
    async getUsers(filter) {
        return await this.authInteractor.getUsersFilters(filter);
    }
    async getUserById(data) {
        return await this.authInteractor.getUserById(data._id);
    }
    async sendLocation(user, data) {
        return await this.authInteractor.sendLocation(user, data);
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/update"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic, user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, user_dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Post)("/mechanic"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerMechanic", null);
__decorate([
    (0, routing_controllers_1.Post)("/disable"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, user_dto_1.UserIdStatusDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, routing_controllers_1.Post)("/all"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.GetUserFilterDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, routing_controllers_1.Post)("/get-by-id"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic, user_entity_1.Roles.admin]),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserIdDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, routing_controllers_1.Post)("/current-assistance/send-location"),
    (0, routing_controllers_1.Authorized)([user_entity_1.Roles.user, user_entity_1.Roles.mechanic]),
    __param(0, (0, routing_controllers_1.CurrentUser)({ required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, user_dto_1.UserLocationDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendLocation", null);
UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/user"),
    __metadata("design:paramtypes", [user_interactor_1.UserInteractor])
], UserController);
exports.UserController = UserController;
