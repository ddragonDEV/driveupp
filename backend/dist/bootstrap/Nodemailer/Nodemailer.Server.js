"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const util_1 = __importDefault(require("util"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const env_module_1 = require("@modules/env.module");
class NodemailerService {
    constructor() {
        NodemailerService.transporter.verify().then(() => {
            NodemailerService.useTemplate();
            console.log('Nodemailer service is running');
        }).catch((error) => { console.log(error.message); });
    }
    static async sendMessage(emailOptions) {
        const sendMail = util_1.default.promisify(NodemailerService.transporter.sendMail);
        return sendMail
            .call(NodemailerService.transporter, {
            from: `"${env_module_1.NodemailerEnv.PERSONALIZED_USER}" <${env_module_1.NodemailerEnv.USER}>`,
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
        NodemailerService.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                extName: ".handlebars",
                partialsDir: __dirname + "/email-templates",
                layoutsDir: __dirname + "/email-templates",
                defaultLayout: false
            },
            viewPath: __dirname + "/email-templates",
            extName: ".handlebars"
        }));
    }
}
exports.NodemailerService = NodemailerService;
NodemailerService.transporter = nodemailer_1.default.createTransport({
    host: env_module_1.NodemailerEnv.HOST,
    port: env_module_1.NodemailerEnv.PORT,
    secure: env_module_1.NodemailerEnv.SECURE_MODE,
    auth: {
        user: env_module_1.NodemailerEnv.USER,
        pass: env_module_1.NodemailerEnv.PASSWORD
    }
});
