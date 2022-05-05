import Geolocation from 'react-native-geolocation-service';
import { Location } from 'providers/Location/models/Location';
import { useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>();
  const [watchingId, setWatchingId] = useState<number>();

  const refreshLocation = () =>
    Geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => console.log('geolocation error', error),
      { enableHighAccuracy: true },
    );

  const watchPosition = () =>
    setWatchingId(
      Geolocation.watchPosition(
        (position) => setLocation(position.coords),
        (error) => console.log('geolocation error', error),
        { enableHighAccuracy: true, distanceFilter: 100 },
      ),
    );

  const stopWatchingPosition = () => {
    watchingId && Geolocation.clearWatch(watchingId);
    setWatchingId(undefined);
  };

  return {
    location,
    refreshLocation,
    watchPosition,
    stopWatchingPosition,
    watching: typeof watchingId === 'number',
  };
};
