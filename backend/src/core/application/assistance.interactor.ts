import { PersonalizedError } from "@bootstrap/Express/errors/personalized-http.error";
import { Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { AssistanceAdapter } from "@domain/assistance/assistance.adapter";
import { AsistanceStatus } from "@domain/assistance/assistance.entity";
import { Roles, UserEntity } from "@domain/user/user.entity";
import { NotFoundError } from "routing-controllers";
import { Service, Inject } from "typedi";
import { GetAssistancesFilter } from '../domain/assistance/assistance.entity';

@Service()
export class AssistanceInteractor {
    constructor(@Inject("AssistanceAdapter") private assistanceAdapter: AssistanceAdapter) { };

    async cancelCurrentAssistance(user: UserEntity) {
        const currentAssistance = user.role === Roles.user ? await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance) throw new NotFoundError();

        return await this.assistanceAdapter.cancel(currentAssistance._id, user["_id"], user.role);
    };

    async getCurrentAssistance(user: UserEntity) {
        const currentAssistance = user.role === Roles.user ? await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance) throw new NotFoundError();

        return currentAssistance;
    }

    async myAssists(user: UserEntity, pagination: Pagination) {
        return user.role === Roles.user ? await this.assistanceAdapter.getAssistancesByUserId(user["_id"], pagination) :
            await this.assistanceAdapter.getAssistancesByMechanicId(user["_id"], pagination);
    }

    async rate(user: UserEntity, idAssitance: string, score: number) {
        const assistance = await this.assistanceAdapter.getById(idAssitance);
        if (!assistance) throw new NotFoundError();
        if (assistance.status !== AsistanceStatus.Completed)
            throw new PersonalizedError("El usuario no tiene los permisos para evaluar si la asistencia no se completó");

        const originId = user.role === Roles.user ? "userId" : "mechanicId";
        const destinationId = user.role === Roles.user ? "mechanicId" : "userId";
        if (assistance[originId].toString() !== user["_id"].toString())
            throw new PersonalizedError("El usuario no puede calificar una asistencia que no le pertenece");
        if (assistance.score[user.role] !== 0)
            throw new PersonalizedError("El usuario sólo puede calificar una vez");

        return await this.assistanceAdapter.updateScore(assistance._id,
            assistance[destinationId],
            user.role, score
        );

    };

    async getAllAsistances(filter: GetAssistancesFilter) {
        return await this.assistanceAdapter.getAllAssistances(filter);
    }
}