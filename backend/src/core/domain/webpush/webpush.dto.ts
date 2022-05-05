import { IsNotEmpty } from "class-validator";
import { webpushDtoMessages } from "./webpush.dto.messages";

export class SubscriptionWebPushDTO {
    @IsNotEmpty({ message: webpushDtoMessages.endpointRequired })
    endpoint: string;
    expirationTime: any;
    @IsNotEmpty({ message: webpushDtoMessages.keysRequired })
    keys: {
        p256dh: string;
        auth: string;
    };
}