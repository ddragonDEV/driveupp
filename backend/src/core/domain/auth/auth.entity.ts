export interface Login {
    email: string;
    password: string;
}

export interface RecoveryPassEntity {
    email: string;
    password: string;
    pin: number;
}