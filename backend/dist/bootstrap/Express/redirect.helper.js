"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectByResponse = void 0;
const redirectByResponse = async (response, endpoint) => await new Promise(async (resolve, reject) => {
    response.redirect(`/${endpoint}`);
});
exports.redirectByResponse = redirectByResponse;
