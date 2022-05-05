import { createContext } from 'react';
import { Advertisement } from './models/Advertisement';

export interface AdvertisingContextProps {
  advertisements: Advertisement[];
  visible: boolean;
}

export const AdvertisingContext = createContext<AdvertisingContextProps>(
  {} as AdvertisingContextProps,
);
