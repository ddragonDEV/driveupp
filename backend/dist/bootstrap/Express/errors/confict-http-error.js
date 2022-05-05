"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const routing_controllers_1 = require("routing-controllers");
class ConflictError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(409, message);
    }
}
exports.ConflictError = ConflictError;
