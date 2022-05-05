import { createContext, MutableRefObject } from 'react';
import { Location } from './models/Location';
import { LocationListener } from './models/LocationListener';

export type LocationContextProps = {
  locationRef: MutableRefObject<Location | undefined>;
  addListener: (listener: LocationListener) => void;
  removeListener: (listener: LocationListener) => void;
  enabled?: boolean;
};

export const LocationContext = createContext<LocationContextProps>(
  {} as LocationContextProps,
);
