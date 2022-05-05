import { useContext } from 'react';
import { InformationContext } from './informationContext';

export const useInformation = () => useContext(InformationContext);
