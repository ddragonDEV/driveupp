import { MechanicLocationData, UserLocationData } from "./location.event.entity";

export class SearchHelpEntity {
    lat: number;
    lng: number;
}

export class MechanicConfirmHelpEntity {
    user: UserLocationData;
    mechanic: MechanicLocationData;
}
export interface MechanicConfirmations {
    [idUser: string]: [{
        user: UserLocationData;
        mechanic: MechanicLocationData;
        distance: number;
    }];
}
