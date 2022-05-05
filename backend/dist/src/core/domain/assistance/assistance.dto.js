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
exports.GetAssistancesFilterDTO = exports.RateAssistance = exports.MyAssistsDTO = void 0;
const class_validator_1 = require("class-validator");
const assistance_dto_messages_1 = require("./assistance.dto.messages");
const assistance_entity_1 = require("./assistance.entity");
class MyAssistsDTO {
}
exports.MyAssistsDTO = MyAssistsDTO;
class RateAssistance {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: assistance_dto_messages_1.rateAssitanceMessages.idAssistanceRequired }),
    (0, class_validator_1.IsMongoId)({ message: assistance_dto_messages_1.rateAssitanceMessages.idAssitanceInvalid }),
    __metadata("design:type", String)
], RateAssistance.prototype, "id_assistance", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ allowInfinity: false }, { message: assistance_dto_messages_1.rateAssitanceMessages.scoreIsNumber }),
    (0, class_validator_1.Min)(1, { message: assistance_dto_messages_1.rateAssitanceMessages.scoreMinValue }),
    (0, class_validator_1.Max)(5, { message: assistance_dto_messages_1.rateAssitanceMessages.scoreMaxValue }),
    __metadata("design:type", Number)
], RateAssistance.prototype, "score", void 0);
exports.RateAssistance = RateAssistance;
class GetAssistancesFilterDTO {
}
__decorate([
    (0, class_validator_1.IsEnum)(assistance_entity_1.AssistanceFilterStatus, { message: assistance_dto_messages_1.assistanceFilterDtoMessages.statusInvalid }),
    __metadata("design:type", String)
], GetAssistancesFilterDTO.prototype, "status", void 0);
exports.GetAssistancesFilterDTO = GetAssistancesFilterDTO;
