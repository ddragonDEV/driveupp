import { createContext } from 'react';
import { Status } from './models/Status';
import { UserLocation } from './models/UserLocation';

export type MechanicAssistanceContextProps = {
  status: Status;
  userLocation?: UserLocation;
  activeService: () => void;
  desactiveService: () => void;
  cancelAssistance: () => void;
};

export const MechanicAssistanceContext =
  createContext<MechanicAssistanceContextProps>(
    {} as MechanicAssistanceContextProps,
  );
