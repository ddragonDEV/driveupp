import Geolocation from 'react-native-geolocation-service';
import BackgroundService, {
  BackgroundTaskOptions,
} from 'react-native-background-actions';
import { sendLocation } from 'config/api/backend/requests/assistance';
import { getItem, setItem } from 'helpers/localStorage';

const startSendingLocation = async () => {
  const locationWatcher: Geolocation.SuccessCallback = async (position) => {
    try {
      await sendLocation({ data: position.coords });
    } catch (code) {
      console.log('send location error', code);

      code === 404 && console.log('not assistance');
    }
  };

  Geolocation.getCurrentPosition(
    locationWatcher,
    (error) => console.log('geolocation error', error),
    { enableHighAccuracy: true },
  );

  await new Promise(async (_resolve) => {
    const locationWatcherId = Geolocation.watchPosition(
      locationWatcher,
      (error) => console.log('geolocation error', error),
      { enableHighAccuracy: true },
    );

    setItem('locationWatcherId', locationWatcherId);
  });
};

export const startBackgroundService = () => {
  const options: BackgroundTaskOptions = {
    taskName: 'locationListener',
    taskTitle: 'Asistencia en progreso',
    taskDesc: 'Hay una asistencia en progreso. Toca para mas detalles.',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
  };

  if (!BackgroundService.isRunning()) {
    BackgroundService.start(startSendingLocation, options);
  }
};

export const stopBackgroundService = async () => {
  if (BackgroundService.isRunning()) {
    BackgroundService.stop();
  }

  const locationWatcherId = await getItem<number>('locationWatcherId');

  locationWatcherId && Geolocation.clearWatch(locationWatcherId);
};
