import dayjs from "dayjs";
import { TemporalEmailAdapter } from "@domain/temporalEmail/temporalEmail.adapter";
import { CreateTemporalEmail, TemporalEmailEntity } from "@domain/temporalEmail/temporalEmail.entity";
import { TemporalEmailModel } from "../schemas/temporalEmail.schema";
import { AppEnv } from "@modules/env.module";

export class TemporalEmailRepository implements TemporalEmailAdapter {
    async deleteEmail(email: string, pin: number): Promise<TemporalEmailEntity | any> {
        return await TemporalEmailModel.deleteOne({ email, pin });
    }
    async getEmail(email: string, pin: number): Promise<TemporalEmailEntity> {
        return await TemporalEmailModel.findOne({ email, pin });
    }

    async register(entry: CreateTemporalEmail): Promise<TemporalEmailEntity> {
        entry["expirationDate"] = dayjs().add(AppEnv.EXPIRATION_TEMPORAL_TOKEN_IN_DB, "second");
        const newEmail = new TemporalEmailModel(entry);

        return await newEmail.save();
    }

    async deleteByToken(token: String): Promise<any> {
        return await TemporalEmailModel.findOneAndDelete({ token });
    }

}