import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { WebPushCreate, WebPushEdit, WebPushEntity } from "./webpush.entity";

export interface WebPushAdapter extends BaseAdapter<WebPushCreate, WebPushEdit, WebPushEntity> {
    getByUserId(userId: string): Promise<WebPushEntity>;
}