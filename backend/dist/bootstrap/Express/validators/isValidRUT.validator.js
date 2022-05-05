"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidRUT = void 0;
const class_validator_1 = require("class-validator");
const rut_js_1 = require("rut.js");
let IsValidRUT = class IsValidRUT {
    validate(value, validationArguments) {
        return (0, rut_js_1.validate)(value);
    }
    defaultMessage(validationArguments) {
        return "El RUT ingresado no es válido";
    }
};
IsValidRUT = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsValidRUT" })
], IsValidRUT);
exports.IsValidRUT = IsValidRUT;
