import { NodemailerService } from "@bootstrap/Nodemailer/Nodemailer.Server";
import { NodemailerAdapter } from "@domain/nodemailer/nodemailer.adapter";
import { VerifyAccountData, WelcomeData, RecoveryPasswordData } from "@domain/nodemailer/nodemailer.entity";

export class NodemailerRepository implements NodemailerAdapter {
    async verifyAccount(data: VerifyAccountData) {
        const emailOptions = {
            templateName: "verifyAccount",
            to: data.email,
            subject: "Verifica tu cuenta",
            attachments: [],
            context: data
        };
        return await NodemailerService.sendMessage(emailOptions);
    }

    async welcome(data: WelcomeData) {
        const emailOptions = {
            templateName: "welcome",
            to: data.email,
            subject: "Bienvenido",
            attachments: [],
            context: data
        };
        return await NodemailerService.sendMessage(emailOptions);
    }
    async recoveryPassword(data: RecoveryPasswordData) {
        const emailOptions = {
            templateName: "recoveryPassword",
            to: data.email,
            subject: "Recupera tu contraseña",
            attachments: [],
            context: data
        };
        return await NodemailerService.sendMessage(emailOptions);
    }

}
