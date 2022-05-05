import { useContext } from 'react';
import { AlertContext } from './alertContext';

export const useAlert = () => useContext(AlertContext);
