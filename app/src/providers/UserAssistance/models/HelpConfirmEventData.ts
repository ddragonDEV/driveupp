export type HelpConfirmEventData = {
  distance: number;
  idAssistance: string;
  mechanic: {
    fullName: string;
    idMechanic: string;
    latMechanic: number;
    lngMechanic: number;
    photo: string;
    rating: number;
    socketId: string;
  };
  user: {
    address: {
      city: string;
      country: string;
      country_code: string;
      postcode: string;
    };
    fullName: string;
    idUser: string;
    latUser: number;
    lngUser: number;
    photo: string;
    rating: number;
  };
};
