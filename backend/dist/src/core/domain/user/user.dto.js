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
exports.UserLocationDTO = exports.UserIdStatusDTO = exports.UserIdDTO = exports.GetUserFilterDTO = exports.UpdateUserDTO = exports.CreateUserDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const commonRegex_1 = require("../../../shared/helpers/commonRegex");
const isValidRUT_validator_1 = require("../../../../bootstrap/Express/validators/isValidRUT.validator");
const user_dto_messages_1 = require("./user.dto.messages");
const user_entity_1 = require("./user.entity");
class CreateUserDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.rutRequired }),
    (0, class_validator_1.Validate)(isValidRUT_validator_1.IsValidRUT, { message: user_dto_messages_1.userDtoMessages.rutInvalid }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "rut", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.emailRequired }),
    (0, class_validator_1.IsEmail)({ message: user_dto_messages_1.userDtoMessages.emailInvalid }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.nameRequired }),
    (0, class_validator_1.Length)(3, 30, { message: user_dto_messages_1.userDtoMessages.nameLength }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.lastNameRequired }),
    (0, class_validator_1.Length)(3, 30, { message: user_dto_messages_1.userDtoMessages.lastNameLength }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.phoneRequired }),
    (0, class_validator_1.IsNumberString)({ message: user_dto_messages_1.userDtoMessages.phoneInvalid }),
    (0, class_validator_1.Length)(12, 12, { message: user_dto_messages_1.userDtoMessages.phoneLength }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.passwordRequired }),
    (0, class_validator_1.Matches)(commonRegex_1.passwordRegex, { message: user_dto_messages_1.userDtoMessages.passwordInvalidPattern }),
    (0, class_validator_1.MinLength)(8, { message: user_dto_messages_1.userDtoMessages.passwordMinLength }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.Matches)(commonRegex_1.urlRegex, { message: user_dto_messages_1.userDtoMessages.photoInvalidPattern }),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "photo", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], CreateUserDTO.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "verifiedAccount", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], CreateUserDTO.prototype, "deleted", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "scoreAverage", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "scoreCount", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], CreateUserDTO.prototype, "scorePoints", void 0);
exports.CreateUserDTO = CreateUserDTO;
class UpdateUserDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.emailRequired }),
    (0, class_validator_1.IsEmail)({ message: user_dto_messages_1.userDtoMessages.emailInvalid }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.nameRequired }),
    (0, class_validator_1.Length)(3, 30, { message: user_dto_messages_1.userDtoMessages.nameLength }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.lastNameRequired }),
    (0, class_validator_1.Length)(3, 30, { message: user_dto_messages_1.userDtoMessages.lastNameLength }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.phoneRequired }),
    (0, class_validator_1.IsNumberString)({ message: user_dto_messages_1.userDtoMessages.phoneInvalid }),
    (0, class_validator_1.Length)(12, 12, { message: user_dto_messages_1.userDtoMessages.phoneLength }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userDtoMessages.passwordRequired }),
    (0, class_validator_1.Matches)(commonRegex_1.passwordRegex, { message: user_dto_messages_1.userDtoMessages.passwordInvalidPattern }),
    (0, class_validator_1.MinLength)(8, { message: user_dto_messages_1.userDtoMessages.passwordMinLength }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.Matches)(commonRegex_1.urlRegex, { message: user_dto_messages_1.userDtoMessages.photoInvalidPattern }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "photo", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "rut", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "role", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "verifiedAccount", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], UpdateUserDTO.prototype, "deleted", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], UpdateUserDTO.prototype, "scoreAverage", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], UpdateUserDTO.prototype, "scoreCount", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], UpdateUserDTO.prototype, "scorePoints", void 0);
exports.UpdateUserDTO = UpdateUserDTO;
class GetUserFilterDTO {
}
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.RoleFilter, { message: user_dto_messages_1.getUsersFilterDtoMessages.roleInvalid }),
    __metadata("design:type", String)
], GetUserFilterDTO.prototype, "role", void 0);
exports.GetUserFilterDTO = GetUserFilterDTO;
class UserIdDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.deleteUserDTOMessages.idRequired }),
    (0, class_validator_1.IsMongoId)({ message: user_dto_messages_1.deleteUserDTOMessages.idInvalid }),
    __metadata("design:type", String)
], UserIdDTO.prototype, "_id", void 0);
exports.UserIdDTO = UserIdDTO;
class UserIdStatusDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.deleteUserDTOMessages.idRequired }),
    (0, class_validator_1.IsMongoId)({ message: user_dto_messages_1.deleteUserDTOMessages.idInvalid }),
    __metadata("design:type", String)
], UserIdStatusDTO.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El estatus  del usuario es requerido" }),
    (0, class_validator_1.IsBoolean)({ message: "El campo es un booleano" }),
    __metadata("design:type", Boolean)
], UserIdStatusDTO.prototype, "deleted", void 0);
exports.UserIdStatusDTO = UserIdStatusDTO;
class UserLocationDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userLocationDTOMessages.latRequired }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: user_dto_messages_1.userLocationDTOMessages.latIsNumber }),
    __metadata("design:type", Number)
], UserLocationDTO.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: user_dto_messages_1.userLocationDTOMessages.lngRequired }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: user_dto_messages_1.userLocationDTOMessages.lngIsNumber }),
    __metadata("design:type", Number)
], UserLocationDTO.prototype, "longitude", void 0);
exports.UserLocationDTO = UserLocationDTO;
