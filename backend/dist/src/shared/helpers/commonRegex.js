"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRegexNotBlank = exports.urlRegex = exports.passwordRegex = void 0;
exports.passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!¿@(.)$=%^/&¡*-]).{8,}$/);
exports.urlRegex = new RegExp(/^($)|((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)$/);
exports.urlRegexNotBlank = new RegExp(/^((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)$/);
