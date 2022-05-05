import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { AdvertisingCreate, AdvertisingEdit, AdvertisingEntity } from "./advertising.entity";

export interface AdvertisingAdapter extends BaseAdapter<AdvertisingCreate, AdvertisingEdit, AdvertisingEntity> {

}