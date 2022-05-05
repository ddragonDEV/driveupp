"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAvailableResourceError = void 0;
const routing_controllers_1 = require("routing-controllers");
class NotAvailableResourceError extends routing_controllers_1.HttpError {
    constructor(message) {
        super(410, message);
    }
}
exports.NotAvailableResourceError = NotAvailableResourceError;
