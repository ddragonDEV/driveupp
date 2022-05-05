import bcryptjs from "bcryptjs";

export class EncryptionTools {
    static encryptPassword(password) {
        return bcryptjs.hashSync(password, bcryptjs.genSaltSync());
    }

    static isSamePassword(password1, password2) {
        return bcryptjs.compareSync(password1, password2);
    }
}
