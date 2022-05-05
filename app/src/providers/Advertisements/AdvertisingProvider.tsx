/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import { useRequest } from 'hooks/useRequest';
import React, { useEffect, useState } from 'react';
import {
  AdvertisingContext,
  AdvertisingContextProps,
} from './AdvertisingContext';
import { getAdvertisements as _getAdvertisements } from 'config/api/backend/requests/advertising';
import { Advertisement } from './models/Advertisement';

export const AdvertisingProvider: React.FC = ({ children }) => {
  const getAdvertisements = useRequest(_getAdvertisements);
  const [visible, setVisible] = useState<boolean>(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const advertisements = await getAdvertisements({});

        if (advertisements) {
          setAdvertisements(advertisements);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => setVisible((visible) => !visible),
      visible ? 15000 : 60000,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  const contextValue: AdvertisingContextProps = {
    advertisements,
    visible,
  };

  return (
    <AdvertisingContext.Provider value={contextValue}>
      {children}
    </AdvertisingContext.Provider>
  );
};
