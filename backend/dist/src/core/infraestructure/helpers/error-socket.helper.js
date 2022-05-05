"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSocket = void 0;
const errorSocket = (socket, message) => socket.emit("error", message);
exports.errorSocket = errorSocket;
