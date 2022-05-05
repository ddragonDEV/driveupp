export class UserLocationData {
    idUser: string;
    latUser: number;
    lngUser: number;
    fullName: string;
    photo: string;
    rating: number;
    address: {
        tourism: string;
        road: string;
        neighbourhood: string;
        city: string;
        postcode: string;
        country: string;
        country_code: string;
    };
}

export class MechanicLocationData {
    idMechanic: string;
    latMechanic: number;
    lngMechanic: number;
}

export class CurrentLocationUserData {
    location: UserLocationData;
    idMechanic: string;
    idAssistance: string;
}

export class CurrentLocationMechData {
    location: MechanicLocationData;
    idUser: string;
    idAssistance: string;
}