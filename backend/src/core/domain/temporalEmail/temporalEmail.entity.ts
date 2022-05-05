export class TemporalEmailEntity {
    token?: String;
    pin?: Number;
    userId: String;
    type: String;
    expirationDate: Date;
}

export class CreateTemporalEmail {
    token?: String;
    pin: Number;
    userId: String;
    type: String;
}