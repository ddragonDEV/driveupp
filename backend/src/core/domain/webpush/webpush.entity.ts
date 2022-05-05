export class WebPushEntity {
    _id: string;
    userId: string;
    webpushObject: {
        endpoint: string;
        expirationTime: any;
        keys: {
            p256dh: string;
            auth: string;
        };
    };
}

export class WebPushCreate {
    userId: string;
    webpushObject: WebPushContent;
}

export class WebPushObject {
    webpushObject: WebPushContent;
}

export class WebPushContent {
    endpoint: string;
    expirationTime: any;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export class WebPushEdit {
    title: string;
}
