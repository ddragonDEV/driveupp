import nodemailer from "nodemailer";
import util from "util";
import hbs from "nodemailer-express-handlebars";

import { NodemailerEnv } from "@modules/env.module";
export class NodemailerService {
    static transporter: any = nodemailer.createTransport({
        host: NodemailerEnv.HOST,
        port: NodemailerEnv.PORT,
        secure: NodemailerEnv.SECURE_MODE,
        auth: {
            user: NodemailerEnv.USER,
            pass: NodemailerEnv.PASSWORD
        }
    });

    constructor() {
        NodemailerService.transporter.verify().then(() => {
            NodemailerService.useTemplate();
            console.log('Nodemailer service is running');
        }).catch((error) => { console.log(error.message); });
    }

    static async sendMessage(emailOptions: {
        templateName: string;
        to: string;
        subject: string;
        attachments: any;
        context: any;
    }) {
        const sendMail = util.promisify(NodemailerService.transporter.sendMail);

        return sendMail
            .call(NodemailerService.transporter, {
                from: `"${ NodemailerEnv.PERSONALIZED_USER }" <${ NodemailerEnv.USER }>`,
                to: emailOptions.to,
                subject: emailOptions.subject,
                attachments: emailOptions.attachments,
                template: emailOptions.templateName,
                context: emailOptions.context
            })
            .catch((err) => {
                console.log(err);
                throw new Error("Ha ocurrido un error durante el envío del correo electrónico");
            });
    }

    static useTemplate() {
        NodemailerService.transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extName: ".handlebars",
                    partialsDir: __dirname + "/email-templates",
                    layoutsDir: __dirname + "/email-templates",
                    defaultLayout: false
                },
                viewPath: __dirname + "/email-templates",
                extName: ".handlebars"
            })
        );
    }
}
