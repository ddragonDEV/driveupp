export class SessionEntity {
    userId: String;
    email: String;
    token: String;
    expirationDate: Date;
}

export class SessionCreate {
    userId: String;
    email: String;
    token: String;
}

export class SessionEdit {
    userId: String;
    email: String;
    token: String;
}
