export enum AsistanceStatus {
    InProcess = "InProcess",
    Canceled = "Canceled",
    Completed = "Completed",
    Aborted = "Aborted",
}

export enum AssistanceFilterStatus {
    "" = "",
    InProcess = "InProcess",
    Canceled = "Canceled",
    Completed = "Completed",
    Aborted = "Aborted",
}

export class GetAssistancesFilter {
    status: string;
    name: string;
    page: number;
    rowsPerPage: number;
}

export class AssistanceEntity {
    _id: string;
    userId: string;
    mechanicId: string;
    destination: {
        lat: number;
        lng: number;
    };
    status: string;
    cancellation?: {
        userId?: string;
        userRole?: string;
    };
    destinationAddress?: {
        tourist: string;
        road: string;
        neighbourhood: string;
        city: string;
        postcode: string;
        country: string;
        country_code: string;
    };
    score?: {
        user: number;
        mechanic: number;
    };
}

export class AssistanceCreate {
    userId: string;
    mechanicId: string;
    destination: {
        lat: number;
        lng: number;
    };
    destinationAddress?: {
        tourism: string;
        road: string;
        neighbourhood: string;
        city: string;
        postcode: string;
        country: string;
        country_code: string;
    };
}

export class AssistanceEdit {
    score: {
        user: number;
        mechanic: number;
    };
}

