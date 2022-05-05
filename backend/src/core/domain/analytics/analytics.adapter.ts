import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { AnalyticsCreate, AnalyticsEdit, AnalyticsEntity } from "./analytics.entity";

export interface AnalyticsAdapter extends BaseAdapter<AnalyticsCreate, AnalyticsEdit, AnalyticsEntity> {

}