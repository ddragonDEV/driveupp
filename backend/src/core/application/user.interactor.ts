import { Service, Inject } from "typedi";
import { Server as IOServer } from "socket.io";
import { ConflictError } from "@bootstrap/Express/errors/confict-http-error";
import { UserAdapter } from "@domain/user/user.adapter";
import { GetUsersFilter, sendLocationEntity, UserCreate, UserEdit, UserEntity } from "@domain/user/user.entity";
import { EncryptionTools } from '../../shared/helpers/EncryptionTools';
import { TokenTools } from '../../shared/helpers/TokenTools';
import { AppEnv } from "@modules/env.module";
import { NodemailerAdapter } from "@domain/nodemailer/nodemailer.adapter";
import { buildBackendUrl } from '../../shared/helpers/buildBackendUrl';
import { ForbiddenError, NotFoundError } from "routing-controllers";
import { NotAvailableResourceError } from "@bootstrap/Express/errors/not-available-http-error";
import { AssistanceAdapter } from "@domain/assistance/assistance.adapter";
import { Roles } from '../domain/user/user.entity';
import { context } from "@bootstrap/Express/ExpressSocketIO.server";
import { events } from "@events/location.event";

@Service()
export class UserInteractor {
    constructor(
        @Inject("UserAdapter") private userAdapter: UserAdapter,
        @Inject("NodemailerAdapter") private nodemailerAdapter: NodemailerAdapter,
        @Inject("AssistanceAdapter") private assistanceAdapter: AssistanceAdapter,
        @Inject("io") private io: IOServer
    ) { }

    async updateUser(user: UserEntity, newData: UserEdit) {
        const userWithSameEmail = await this.userAdapter.getUserByEmail(newData.email);
        if (userWithSameEmail && user["_id"].toString() !== userWithSameEmail["_id"].toString()) {
            throw new ConflictError("Ya existe un usuario con este email");
        }

        return await this.userAdapter.update(user["_id"], {
            email: newData.email,
            name: newData.name,
            lastName: newData.lastName,
            phone: newData.phone,
            password: newData.password ?
                EncryptionTools.encryptPassword(newData.password) :
                user.password,
            photo: newData.photo ? newData.photo : user.photo
        });
    }

    async createMechanic(request: any, user: UserCreate) {
        const userExists = await this.userAdapter.getUserByEmail(user.email);
        if (userExists) throw new ConflictError("Usuario creado anteriormente");

        user.password = EncryptionTools.encryptPassword(user.password);
        const newUser = await this.userAdapter.createMechanic(user);

        const verifyAccountToken = TokenTools.transforDotToPesosSymbol(
            await TokenTools.generateJWT({ _id: newUser["_id"], type: "verifyAccount" },
                AppEnv.EXPIRATION_TEMPORAL_TOKEN,
                AppEnv.SECRET_KEY)
        );
        await this.nodemailerAdapter.verifyAccount({
            name: newUser.name, email: newUser.email,
            url: buildBackendUrl(request, "auth/verify", verifyAccountToken)
        });

        return { emailSentSuccesfully: true };
    }

    async getUsersFilters(filter: GetUsersFilter) {
        return await this.userAdapter.getUsers(filter, { page: filter.page, rowsPerPage: filter.rowsPerPage });
    }

    async deleteUser(user: UserEntity, id: string, status: boolean) {
        if (user["_id"] === id) throw new ForbiddenError();

        const userExists = await this.userAdapter.getById(id);
        if (!userExists) throw new NotFoundError();

        return await this.userAdapter.logicalDelete(id, status);
    }

    async getUserById(id: string) {
        let user = await this.userAdapter.getById(id);
        if (!user) throw new NotFoundError();
        const totalAssistances = await this.assistanceAdapter.getTotalAssistancesByUserId(id);

        return { user, totalAssistances };
    }

    async sendLocation(user: UserEntity, entry: sendLocationEntity) {
        const currentAssistance = user.role === Roles.user ?
            await this.assistanceAdapter.getByUserId(user["_id"]) :
            await this.assistanceAdapter.getByMechanicId(user["_id"]);
        if (!currentAssistance) throw new NotFoundError("El usuario no cuenta con una asistencia en curso");
        const destinationId = currentAssistance[user.role === Roles.user ? "mechanicId" : "userId"];
        const socketDestination = Object.values(context.users).find(user => user.userId === destinationId.toString());
        if (socketDestination) {
            user.role === Roles.user ? this.io.to(socketDestination.socketId).emit(events.current_location_user, {
                location: {
                    idUser: currentAssistance.userId,
                    latUser: entry.latitude,
                    lngUser: entry.longitude
                },
                idMechanic: destinationId,
                idAssistance: currentAssistance._id
            }) :
                this.io.to(socketDestination.socketId).emit(events.current_location_mechanic, {
                    location: {
                        idMechanic: currentAssistance.mechanicId,
                        latMechanic: entry.latitude,
                        lngMechanic: entry.longitude
                    },
                    idUser: currentAssistance.userId,
                    idAssistance: currentAssistance._id
                });
        }

        return {};
    }
}