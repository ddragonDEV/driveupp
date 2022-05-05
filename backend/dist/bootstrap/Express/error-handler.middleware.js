"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const http_errors_helper_1 = require("./http-errors.helper");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    error(error, request, response, next) {
        return response.send({
            headerResponse: {
                code: (error === null || error === void 0 ? void 0 : error.httpCode) || 500,
                message: !!(error === null || error === void 0 ? void 0 : error.httpCode) && !!(error === null || error === void 0 ? void 0 : error.message) && (error === null || error === void 0 ? void 0 : error.httpCode) !== 400
                    && (error === null || error === void 0 ? void 0 : error.httpCode) !== 403 ?
                    error === null || error === void 0 ? void 0 : error.message : (0, http_errors_helper_1.httpErrorMessage)(error === null || error === void 0 ? void 0 : error.httpCode) ||
                    (0, http_errors_helper_1.httpErrorMessage)(error === null || error === void 0 ? void 0 : error.httpCode),
                validations: (0, http_errors_helper_1.getValidationErrors)(error === null || error === void 0 ? void 0 : error.errors)
            },
            payload: {}
        });
    }
};
ErrorHandlerMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
