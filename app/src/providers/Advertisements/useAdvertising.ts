import { useContext } from 'react';
import { AdvertisingContext } from './AdvertisingContext';

export const useAdvertising = () => useContext(AdvertisingContext);
