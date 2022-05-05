import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { Period } from "@bootstrap/Mongo/utilities/MongooseDateFilter";
import { Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { AssistanceCreate, AssistanceEdit, AssistanceEntity, GetAssistancesFilter } from "./assistance.entity";

export interface AssistanceAdapter extends BaseAdapter<AssistanceCreate, AssistanceEdit, AssistanceEntity> {
    getByParticipants(idUser: string, idMechanic: string): Promise<AssistanceEntity | null>;
    getByUserId(id: string): Promise<AssistanceEntity | null>;
    getByMechanicId(id: string): Promise<AssistanceEntity | null>;
    cancel(id: string, idUser: string, roleUser: string): Promise<AssistanceEntity>;
    abort(id: string, idUser: string, roleUser: string): Promise<AssistanceEntity>;
    completed(id: string): Promise<AssistanceEntity>;
    getAssistancesByUserId(id: string, pagination: Pagination): Promise<any>;
    getAssistancesByMechanicId(id: string, pagination: Pagination): Promise<any>;
    assistancesPerPeriod(period: Period, pagination: Pagination): Promise<any>;
    updateScore(idAssistance: string, idUser: string, role: string, score: number): Promise<AssistanceEntity>;
    getAllAssistances(filter: GetAssistancesFilter): Promise<any>;
    getTotalAssistancesByUserId(id: string): Promise<any>;
    getTotalAssistancesByZone(period: Period): Promise<any>;
}