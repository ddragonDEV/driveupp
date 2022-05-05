/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { PermissionsContext } from './PermissionsContext';
import { FC, useState, useEffect } from 'react';
import { getInitialLocationState } from './helpers';
import { AppState } from 'react-native';
import { Permission } from './models/Permission';

export const PermissionsProvider: FC = ({ children }) => {
  const [location, setLocation] = useState<Permission>();

  useEffect(() => {
    setLocation(getInitialLocationState(setLocation));
  }, []);

  useEffect(() => {
    if (location) {
      const { remove: removeAppStateOnChangeEventListener } =
        AppState.addEventListener('change', (state) => {
          state === 'active' && location?.check();
        });

      return () => removeAppStateOnChangeEventListener();
    }
  }, [!!location]);

  useEffect(() => {
    if (location?.status === 'unavailable') {
      location.check();
    }
  }, [location]);

  const contextValue = {
    location,
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};
