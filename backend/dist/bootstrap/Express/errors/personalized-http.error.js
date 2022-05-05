"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizedError = void 0;
const routing_controllers_1 = require("routing-controllers");
class PersonalizedError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(411, message);
    }
}
exports.PersonalizedError = PersonalizedError;
