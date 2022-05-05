"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerRepository = void 0;
const Nodemailer_Server_1 = require("@bootstrap/Nodemailer/Nodemailer.Server");
class NodemailerRepository {
    async verifyAccount(data) {
        const emailOptions = {
            templateName: "verifyAccount",
            to: data.email,
            subject: "Verifica tu cuenta",
            attachments: [],
            context: data
        };
        return await Nodemailer_Server_1.NodemailerService.sendMessage(emailOptions);
    }
    async welcome(data) {
        const emailOptions = {
            templateName: "welcome",
            to: data.email,
            subject: "Bienvenido",
            attachments: [],
            context: data
        };
        return await Nodemailer_Server_1.NodemailerService.sendMessage(emailOptions);
    }
    async recoveryPassword(data) {
        const emailOptions = {
            templateName: "recoveryPassword",
            to: data.email,
            subject: "Recupera tu contraseña",
            attachments: [],
            context: data
        };
        return await Nodemailer_Server_1.NodemailerService.sendMessage(emailOptions);
    }
}
exports.NodemailerRepository = NodemailerRepository;
