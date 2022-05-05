import { ConflictError } from "@bootstrap/Express/errors/confict-http-error";
import { UserAdapter } from "@domain/user/user.adapter";
import { UserCreate } from "@domain/user/user.entity";
import { EncryptionTools } from "../../shared/helpers/EncryptionTools";
import { Service, Inject } from "typedi";
import { Login, RecoveryPassEntity } from "@domain/auth/auth.entity";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "routing-controllers";
import { TokenTools } from "../../shared/helpers/TokenTools";
import { SessionAdapter } from "@domain/session/session.adapter";
import { AppEnv } from "@modules/env.module";
import { NodemailerAdapter } from "@domain/nodemailer/nodemailer.adapter";
import { buildBackendUrl } from '../../shared/helpers/buildBackendUrl';
import { TemporalEmailAdapter } from "@domain/temporalEmail/temporalEmail.adapter";
import { RandomValues } from "../../shared/helpers/RandomValuesGenerator";
import { SessionHistoryAdapter } from "@domain/sessionhistory/sessionhistory.adapter";

@Service()
export class AuthInteractor {
    constructor(
        @Inject("UserAdapter") private userAdapter: UserAdapter,
        @Inject("SessionAdapter") private sessionAdapter: SessionAdapter,
        @Inject("SessionHistoryAdapter") private sessionHistoryAdapter: SessionHistoryAdapter,
        @Inject("NodemailerAdapter") private nodemailerAdapter: NodemailerAdapter,
        @Inject("TemporalEmailAdapter") private temporalEmailAdapter: TemporalEmailAdapter
    ) { };

    async registerUser(user: UserCreate, request: any) {
        const userExists = await this.userAdapter.getUserByEmail(user.email);
        if (userExists) throw new ConflictError("Usuario creado anteriormente");

        user.password = EncryptionTools.encryptPassword(user.password);
        const newUser = await this.userAdapter.create(user);

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

    async login(entry: Login) {
        const [user, session] = await Promise.all([
            this.userAdapter.getUserByEmail(entry.email),
            this.sessionAdapter.getSessionByEmail(entry.email)
        ]);
        if (!user) throw new NotFoundError("Usuario no encontrado");
        if (!EncryptionTools.isSamePassword(entry.password, user.password))
            throw new UnauthorizedError("La contraseña introducida es incorrecta");
        if (user.deleted) throw new UnauthorizedError("El usuario ha sido dado de baja del sistema");
        if (!user.verifiedAccount) throw new UnauthorizedError("El usuario no ha verificado su email");
        if (session) await this.sessionAdapter.deleteAllSessionsByUserId(user["_id"]);

        const registeredSession = await this.sessionHistoryAdapter.getTodaySessionByUserId(user["_id"]);
        if (!registeredSession) await this.sessionHistoryAdapter.create({ userId: user["_id"], email: user.email, role: user.role });

        const dataUser = {
            user,
            token: await TokenTools.generateJWT({ _id: user["_id"], role: user.role }, AppEnv.EXPIRATION_TOKEN, AppEnv.SECRET_KEY)
        };

        await this.sessionAdapter.create({ userId: user["_id"], token: dataUser.token, email: user.email });
        return dataUser;
    }

    async refreshToken(token: string) {
        const payloadToken = TokenTools.verifyJWT(token, AppEnv.SECRET_KEY);
        const [user, session, registeredSession] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token),
            this.sessionHistoryAdapter.getTodaySessionByUserId(payloadToken._id)
        ]);
        if (!user) throw new NotFoundError("Usuario no encontrado");
        if (!session) throw new UnauthorizedError("La sesión no existe");
        if (!registeredSession) await this.sessionHistoryAdapter.create({
            userId: user["_id"], email: user.email, role: user.role
        });

        const dataUser = {
            user,
            token: await TokenTools.generateJWT({ _id: user["_id"], role: user.role }, AppEnv.EXPIRATION_TOKEN, AppEnv.SECRET_KEY)
        };

        await this.sessionAdapter.deleteSession(session["_id"]);
        await this.sessionAdapter.create({ userId: user["_id"], token: dataUser.token, email: user.email });

        return dataUser;
    }

    async logout(token: string) {
        const payloadToken = TokenTools.verifyJWT(token, AppEnv.SECRET_KEY);

        const [user, session] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token)
        ]);
        if (!user) throw new NotFoundError("Usuario no encontrado");
        if (!session) throw new UnauthorizedError("La sesión no existe");

        await this.sessionAdapter.deleteSession(session["_id"]);

        return {};
    }

    async changePassword(token: string, newPassword: string) {
        const payloadToken = TokenTools.verifyJWT(token, AppEnv.SECRET_KEY);

        const [user, session] = await Promise.all([
            this.userAdapter.getById(payloadToken._id),
            this.sessionAdapter.getSessionByToken(token)
        ]);
        if (!user) throw new NotFoundError("Usuario no encontrado");
        if (!session) throw new UnauthorizedError("La sesión no existe");
        if (EncryptionTools.isSamePassword(newPassword, user.password))
            throw new UnauthorizedError("La contraseña no puede ser la misma");

        await this.userAdapter.updatePassword(user["_id"], EncryptionTools.encryptPassword(newPassword));

        return {};
    };

    async verifyAccount(token: string) {
        token = TokenTools.transformPesosSymbolToDot(token);
        const { _id, type } = TokenTools.getPayloadJWT(token, AppEnv.SECRET_KEY);
        const user = await this.userAdapter.getById(_id);

        if (type !== "verifyAccount") throw new UnauthorizedError("El token no es válido");
        if (!user) throw new NotFoundError("Usuario no encontrado");
        if (user.verifiedAccount) throw new ForbiddenError("El usuario verificó su cuenta anteriormente");
        await this.userAdapter.verifyUser(_id);

        await this.nodemailerAdapter.welcome({ name: user.name, email: user.email });

        return { emailSentSuccesfully: true };
    }

    async recoveryPasswordEmail(email: string) {
        const user = await this.userAdapter.getUserByEmail(email);
        if (!user) throw new NotFoundError("Usuario no encontrado");

        const newEmailRegistered = await this.temporalEmailAdapter.register({
            userId: user["_id"],
            pin: RandomValues.numbersGenerator(6),
            type: "recoveryPassword"
        });

        this.nodemailerAdapter.recoveryPassword({
            email: user.email,
            pin: newEmailRegistered.pin
        });

        return { emailSentSuccesfully: true };
    }

    async recoveryPasswordReset(entry: RecoveryPassEntity) {
        const user = await this.userAdapter.getUserByEmail(entry.email);
        if (!user) throw new NotFoundError("Usuario no encontrado");

        const tmpEmailDB = await this.temporalEmailAdapter.getEmail(entry.email, entry.pin);
        if (!tmpEmailDB || !!tmpEmailDB && tmpEmailDB.type !== "recoveryPassword")
            throw new NotFoundError("Solicitud no encontrada. Es posible que haya caducado o el pin es incorrecto");
        if (EncryptionTools.isSamePassword(entry.password, user.password))
            throw new UnauthorizedError("La contraseña no puede ser la misma");

        await Promise.all([
            this.userAdapter.updatePassword(user["_id"], EncryptionTools.encryptPassword(entry.password)),
            this.sessionAdapter.deleteAllSessionsByUserId(user["_id"]),
            this.temporalEmailAdapter.deleteEmail(entry.email, entry.pin)
        ]);

        return {};
    }
}