export enum Roles {
    user = "user",
    admin = "admin",
    mechanic = "mechanic"
}

export enum RoleFilter {
    user = "user",
    admin = "admin",
    mechanic = "mechanic",
    "" = ""
}

export class UserEntity {
    rut: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
    password: string;
    photo: string;
    role: string;
    verifiedAccount: Boolean;
    deleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    scoreCount: number;
    scorePoints: number;
    scoreAverage: number;
}

export class UserCreate {
    rut: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
    password: string;
    photo: string;
}
export class UserCreated {
    rut: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
}


export class UserEdit {
    email: string;
    name: string;
    lastName: string;
    phone: string;
    password?: string;
    photo?: string;
}


export class GetUsersFilter {
    role: string;
    name: string;
    page: number;
    rowsPerPage: number;
}

export class sendLocationEntity {
    latitude: number;
    longitude: number;
}