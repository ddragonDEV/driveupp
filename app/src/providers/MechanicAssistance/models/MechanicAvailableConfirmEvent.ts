export type MechanicAvailableConfirmEventData = {
  user: {
    idUser: string;
    latUser: number;
    lngUser: number;
  };
  mechanic: {
    idMechanic: string;
    latMechanic: number;
    lngMechanic: number;
  };
};
