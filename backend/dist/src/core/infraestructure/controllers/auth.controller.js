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
exports.AuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const auth_interactor_1 = require("@application/auth.interactor");
const user_dto_1 = require("@domain/user/user.dto");
const auth_dto_1 = require("@domain/auth/auth.dto");
const redirect_helper_1 = require("@bootstrap/Express/redirect.helper");
let AuthController = class AuthController {
    constructor(authInteractor) {
        this.authInteractor = authInteractor;
    }
    ;
    async createUser(request, entry) {
        return await this.authInteractor.registerUser(entry, request);
    }
    async login(entry) {
        return await this.authInteractor.login(entry);
    }
    async refreshToken(token) {
        var _a;
        token = (_a = token === null || token === void 0 ? void 0 : token.replace("Bearer ", "")) === null || _a === void 0 ? void 0 : _a.trim();
        return await this.authInteractor.refreshToken(token);
    }
    async logout(token) {
        var _a;
        token = (_a = token === null || token === void 0 ? void 0 : token.replace("Bearer ", "")) === null || _a === void 0 ? void 0 : _a.trim();
        return await this.authInteractor.logout(token);
    }
    async changePasswordlogin(token, entry) {
        var _a;
        token = (_a = token === null || token === void 0 ? void 0 : token.replace("Bearer ", "")) === null || _a === void 0 ? void 0 : _a.trim();
        return await this.authInteractor.changePassword(token, entry.password);
    }
    async verifyAccount(response, emailToken) {
        await this.authInteractor.verifyAccount(emailToken);
        await (0, redirect_helper_1.redirectByResponse)(response, "verificated");
        return {};
    }
    async requestRecoveryPassword(entry) {
        return await this.authInteractor.recoveryPasswordEmail(entry.email);
    }
    async resetRecoveryPassword(entry) {
        return await this.authInteractor.recoveryPasswordReset(entry);
    }
    ;
};
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)("/refresh-token"),
    __param(0, (0, routing_controllers_1.HeaderParam)("Authorization", { required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, routing_controllers_1.Post)("/logout"),
    __param(0, (0, routing_controllers_1.HeaderParam)("Authorization", { required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, routing_controllers_1.Post)("/change-password"),
    __param(0, (0, routing_controllers_1.HeaderParam)("Authorization", { required: true })),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_dto_1.changePasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePasswordlogin", null);
__decorate([
    (0, routing_controllers_1.Get)("/verify/:emailToken"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Param)("emailToken")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyAccount", null);
__decorate([
    (0, routing_controllers_1.Post)("/recoveryPassword/email"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.recoveyPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestRecoveryPassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/recoveryPassword/reset"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.recoveryPasswordResetDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetRecoveryPassword", null);
AuthController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/auth"),
    __metadata("design:paramtypes", [auth_interactor_1.AuthInteractor])
], AuthController);
exports.AuthController = AuthController;
