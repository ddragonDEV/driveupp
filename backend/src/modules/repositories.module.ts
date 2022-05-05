import { NodemailerRepository } from "@framework/nodemailer/nodemailer.repository";
import { SessionRespository } from "@framework/mongo/repositories/session.repository";
import { TemporalEmailRepository } from "@framework/mongo/repositories/temporalEmail.repository";
import { UserRespository } from "@framework/mongo/repositories/user.repository";
import { AssistanceRepository } from "@framework/mongo/repositories/assistance.repository";
import { SessionHistoryRepository } from "@framework/mongo/repositories/sessionhistory.repository";
import { WebPushRepository } from '@framework/mongo/repositories/webpush.repository';
import { AdvertisingRespository } from "@framework/mongo/repositories/advertising.repository";


export const repositoriesModule: any = {
    UserAdapter: new UserRespository(),
    SessionAdapter: new SessionRespository(),
    NodemailerAdapter: new NodemailerRepository(),
    TemporalEmailAdapter: new TemporalEmailRepository(),
    AssistanceAdapter: new AssistanceRepository(),
    SessionHistoryAdapter: new SessionHistoryRepository(),
    WebPushAdapter: new WebPushRepository(),
    AdvertisingAdapter: new AdvertisingRespository()
}; 