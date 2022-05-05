import { createContext } from 'react';
import { MechanicLocation } from './models/MechanicLocation';
import { Status } from './models/Status';

export type UserAssistanceContextProps = {
  mechanicLocation?: MechanicLocation;
  status: Status;
  searchForHelp: () => void;
  completeAssistance: () => void;
  cancelAssistance: () => void;
};

export const UserAssistanceContext = createContext<UserAssistanceContextProps>(
  {} as UserAssistanceContextProps,
);
