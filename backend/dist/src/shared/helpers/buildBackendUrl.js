"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBackendUrl = void 0;
const buildBackendUrl = (request, endpoint, endpointParam) => {
    return `${request.protocol}://${request.headers.host}${endpoint ? "/" + endpoint : ""}${endpoint && endpointParam ? "/" + endpointParam : ""}`;
};
exports.buildBackendUrl = buildBackendUrl;
