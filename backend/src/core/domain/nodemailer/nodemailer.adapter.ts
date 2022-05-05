import { RecoveryPasswordData, VerifyAccountData, WelcomeData } from "./nodemailer.entity";

export interface NodemailerAdapter {
    verifyAccount(data: VerifyAccountData);
    welcome(data: WelcomeData);
    recoveryPassword(data: RecoveryPasswordData);
}