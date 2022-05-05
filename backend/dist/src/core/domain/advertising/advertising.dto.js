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
exports.DeleteAdvertisingDTO = exports.UpdateAdvertisingDTO = exports.CreateAdvertisingDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const commonRegex_1 = require("../../../../src/shared/helpers/commonRegex");
class BannerDTO {
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: "La url de la imagen es requerida" }),
    (0, class_validator_1.Matches)(commonRegex_1.urlRegexNotBlank, { message: "La imagen no contiene una url válida" }),
    __metadata("design:type", String)
], BannerDTO.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: "El mensaje es requerido" }),
    __metadata("design:type", String)
], BannerDTO.prototype, "message", void 0);
class CreateAdvertisingDTO {
}
__decorate([
    (0, class_transformer_1.Type)(() => BannerDTO),
    (0, class_validator_1.IsArray)({ message: "Los banners son un arreglo" }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: "Se quiere al menos un banner" }),
    __metadata("design:type", Array)
], CreateAdvertisingDTO.prototype, "banners", void 0);
exports.CreateAdvertisingDTO = CreateAdvertisingDTO;
class UpdateAdvertisingDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El id es obligatorio" }),
    (0, class_validator_1.IsMongoId)({ message: "El id no es válido" }),
    __metadata("design:type", String)
], UpdateAdvertisingDTO.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: "La url de la imagen es requerida" }),
    (0, class_validator_1.Matches)(commonRegex_1.urlRegexNotBlank, { message: "La imagen no contiene una url válida" }),
    __metadata("design:type", String)
], UpdateAdvertisingDTO.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    (0, class_validator_1.IsNotEmpty)({ message: "El mensaje es requerido" }),
    __metadata("design:type", String)
], UpdateAdvertisingDTO.prototype, "message", void 0);
exports.UpdateAdvertisingDTO = UpdateAdvertisingDTO;
class DeleteAdvertisingDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El id es obligatorio" }),
    (0, class_validator_1.IsMongoId)({ message: "El id no es válido" }),
    __metadata("design:type", String)
], DeleteAdvertisingDTO.prototype, "_id", void 0);
exports.DeleteAdvertisingDTO = DeleteAdvertisingDTO;
