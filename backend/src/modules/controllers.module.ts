import { AdvertisingController } from "@controllers/advertising.controller";
import { AnalyticsController } from "@controllers/analytics.controller";
import { AssistanceController } from "@controllers/assistance.controller";
import { AuthController } from "@controllers/auth.controller";
import { UserController } from "@controllers/user.controller";
import { WebPushController } from "@controllers/webpush.controller";


export const ControllersModule: any = [
    AuthController,
    AssistanceController,
    UserController,
    AnalyticsController,
    WebPushController,
    AdvertisingController
];