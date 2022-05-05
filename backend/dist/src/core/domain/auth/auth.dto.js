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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryPasswordResetDTO = exports.recoveyPasswordDTO = exports.changePasswordDTO = exports.LoginDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const commonRegex_1 = require("../../../shared/helpers/commonRegex");
const auth_dto_messages_1 = require("./auth.dto.messages");
class LoginDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.emailRequired }),
    (0, class_validator_1.IsEmail)({ message: auth_dto_messages_1.LoginDtoMessages.emailInvalid }),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.passwordRequired }),
    (0, class_validator_1.MinLength)(8, { message: auth_dto_messages_1.LoginDtoMessages.passwordMinLength }),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class changePasswordDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.passwordRequired }),
    (0, class_validator_1.Matches)(commonRegex_1.passwordRegex, { message: auth_dto_messages_1.LoginDtoMessages.passwordInvalidPattern }),
    (0, class_validator_1.MinLength)(8, { message: auth_dto_messages_1.LoginDtoMessages.passwordMinLength }),
    __metadata("design:type", String)
], changePasswordDTO.prototype, "password", void 0);
exports.changePasswordDTO = changePasswordDTO;
class recoveyPasswordDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.emailRequired }),
    (0, class_validator_1.IsEmail)({ message: auth_dto_messages_1.LoginDtoMessages.emailInvalid }),
    __metadata("design:type", String)
], recoveyPasswordDTO.prototype, "email", void 0);
exports.recoveyPasswordDTO = recoveyPasswordDTO;
class recoveryPasswordResetDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.emailRequired }),
    (0, class_validator_1.IsEmail)({ message: auth_dto_messages_1.LoginDtoMessages.emailInvalid }),
    __metadata("design:type", String)
], recoveryPasswordResetDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.passwordRequired }),
    (0, class_validator_1.Matches)(commonRegex_1.passwordRegex, { message: auth_dto_messages_1.LoginDtoMessages.passwordInvalidPattern }),
    (0, class_validator_1.MinLength)(8, { message: auth_dto_messages_1.LoginDtoMessages.passwordMinLength }),
    __metadata("design:type", String)
], recoveryPasswordResetDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: auth_dto_messages_1.LoginDtoMessages.pinRequired }),
    (0, class_validator_1.IsPositive)({ message: auth_dto_messages_1.LoginDtoMessages.pinPositiveNumber }),
    __metadata("design:type", Number)
], recoveryPasswordResetDTO.prototype, "pin", void 0);
exports.recoveryPasswordResetDTO = recoveryPasswordResetDTO;
