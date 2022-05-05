import { CreateTemporalEmail, TemporalEmailEntity } from "./temporalEmail.entity";

export interface TemporalEmailAdapter {
    register(entry: CreateTemporalEmail): Promise<TemporalEmailEntity>;
    deleteByToken(token: String): Promise<TemporalEmailEntity | null>;
    getEmail(email: string, pin: number): Promise<TemporalEmailEntity | null>;
    deleteEmail(email: string, pin: number): Promise<TemporalEmailEntity | null>;
}