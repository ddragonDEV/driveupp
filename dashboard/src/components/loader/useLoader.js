import { useContext } from 'react';
import { LoaderContext } from './loaderContext';

export const useLoader = () => useContext(LoaderContext);
