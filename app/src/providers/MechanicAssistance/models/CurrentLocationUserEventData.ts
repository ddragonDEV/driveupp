export type CurrentLocationUserEventData = {
  idAssistance: string;
  idMechanic: string;
  location: {
    idUser: string;
    latUser: number;
    lngUser: number;
  };
};
