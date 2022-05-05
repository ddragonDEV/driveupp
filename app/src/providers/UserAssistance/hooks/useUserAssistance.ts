import { useContext } from 'react';
import { UserAssistanceContext } from '../UserAssistanceContext';

export const useUserAssistance = () => useContext(UserAssistanceContext);
