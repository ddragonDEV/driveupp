export class SessionHistoryEntity {
    _id: string;
    userId: string;
    email: string;
    date: Date;
}

export class SessionHistoryCreate {
    userId: string;
    email: string;
    role: string;
}

export class SessionHistoryEdit {
    title: string;
}
