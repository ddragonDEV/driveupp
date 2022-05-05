/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSocket } from 'providers/Socket';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { Status } from './models/Status';
import {
  MechanicAssistanceContext,
  MechanicAssistanceContextProps,
} from './MechanicAssistanceContext';
import { getItem, removeItem, setItem } from 'helpers/localStorage';
import { MechanicAvailableEventData } from './models/MechanicAvailableEventData';
import { useLocation } from 'providers/Location';
import { getDistance } from 'providers/Location/helpers';
import { MechanicAvailableConfirmEventData } from './models/MechanicAvailableConfirmEvent';
import { useAuth } from 'providers/Auth';
import { useModal } from 'providers/Modal';
import { UserNeedsHelpModal } from 'components/UserNeedsHelpModal';
import { CurrentLocationUserEventData } from './models/CurrentLocationUserEventData';
import { LocationListener } from 'providers/Location/models/LocationListener';
import { UserLocation } from './models/UserLocation';
import { MechanicAssistanceCompleteModal } from 'components/MechanicAssistanceCompleteModal';
import { useLocationMessages } from 'providers/Location/LocationMessages';
import { Assistance } from './models/Assistance';
import { CancelAssistanceEventData } from './models/CancelAssistanceEventData';
import { getCurrentAssistance } from 'config/api/backend/requests/assistance';
import { startBackgroundService, stopBackgroundService } from './helpers';
import { User } from './models/User';

export const MechanicAssistanceProvider: FC = ({ children }) => {
  const { locationRef, ...location } = useLocation();
  const locationMessages = useLocationMessages();
  const auth = useAuth();
  const socket = useSocket();
  const modal = useModal();
  const [status, setStatus] = useState<Status>('inactive');
  const assistanceRef = useRef<Assistance>();
  const [userLocation, setUserLocation] = useState<UserLocation>();

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');

        const assistance = await getCurrentAssistance();

        if (assistance) {
          socket.connect();
          assistanceRef.current = assistance;

          if (locationRef.current) {
            setUserLocation({
              ...assistance.userLocation,
              distance: getDistance(
                locationRef.current,
                assistance.userLocation,
                locationMessages,
              ),
            });
          }

          setStatus('helping');
        } else {
          throw null;
        }
      } catch {
        const defaultActive = await getItem<true>('mechanic_default_active');

        defaultActive ? activeService() : setStatus('inactive');
      }
    })();
  }, [location.enabled]);

  useEffect(() => {
    if (status === 'helping' && socket.status === 'connected') {
      socket.instance.on(
        'current_location_user',
        (data: CurrentLocationUserEventData) => {
          if (!locationRef.current) {
            return;
          }

          const location = {
            latitude: data.location.latUser,
            longitude: data.location.lngUser,
          };

          setUserLocation({
            ...location,
            distance: getDistance(
              locationRef.current,
              location,
              locationMessages,
            ),
          });
        },
      );

      socket.instance.on('request_completed_confirm', () => {
        modal.handleOpen({
          content: (
            <MechanicAssistanceCompleteModal
              assistanceId={assistanceRef.current?.idAssistance}
            />
          ),
        });

        setStatus('active');
        setUserLocation(undefined);
        assistanceRef.current = undefined;
      });

      socket.instance.on('request_cancelled_user', () => {
        setStatus('active');
        setUserLocation(undefined);
        assistanceRef.current = undefined;
      });
    }

    return () => {
      socket.instance.off('current_location_user');
      socket.instance.off('request_cancelled_user');
      socket.instance.off('request_completed_confirm');
    };
  }, [status, location.enabled, socket.status]);

  useEffect(() => {
    if (status === 'waiting') {
      socket.instance.on(
        'current_location_user',
        (data: CurrentLocationUserEventData) => {
          if (!locationRef.current) {
            return;
          }

          const location = {
            latitude: data.location.latUser,
            longitude: data.location.lngUser,
          };

          assistanceRef.current = {
            idAssistance: data.idAssistance,
            idUser: data.location.idUser,
            idMechanic: data.idMechanic,
          };

          setStatus('helping');
          setUserLocation({
            ...location,
            distance: getDistance(
              location,
              locationRef.current,
              locationMessages,
            ),
          });
        },
      );

      socket.instance.on('request_cancelled_user', () => {
        setStatus('active');
      });
    }

    return () => {
      socket.instance.off('current_location_user');
      socket.instance.off('request_cancelled_user');
    };
  }, [status, location.enabled]);

  useEffect(() => {
    if (status === 'helping' && socket.status === 'connected') {
      const locationListener = startUpdatingDistance();

      return () => {
        location.removeListener(locationListener);
      };
    }
  }, [status, socket.status, location.enabled]);

  useEffect(() => {
    status === 'helping' ? startBackgroundService() : stopBackgroundService();
  }, [status]);

  useEffect(() => {
    if (status === 'active') {
      socket.instance.on(
        'mechanic_available',
        (userData: MechanicAvailableEventData) => {
          const user: User = {
            name: userData.fullName,
            photoUrl: userData.photo,
            rating: userData.rating,
          };

          if (locationRef.current) {
            const distance = getDistance(
              locationRef.current,
              {
                latitude: userData.latUser,
                longitude: userData.lngUser,
              },
              locationMessages,
            );

            modal.handleOpen({
              content: (
                <UserNeedsHelpModal
                  user={user}
                  distance={distance}
                  onAccept={() => confirmAvailability(userData)}
                />
              ),
            });
          }
        },
      );
    }

    return () => {
      socket.instance.off('mechanic_available');
    };
  }, [status, location.enabled]);

  useEffect(() => {
    socket.status === 'connected' &&
      status === 'activing' &&
      setStatus('active');
  }, [socket.status]);

  const startUpdatingDistance = () => {
    const locationListener: LocationListener = (location) => {
      setUserLocation((userLocation) =>
        userLocation
          ? {
              ...userLocation,
              distance: getDistance(userLocation, location, locationMessages),
            }
          : undefined,
      );
    };

    location.addListener(locationListener);

    return locationListener;
  };

  const confirmAvailability = (userData: MechanicAvailableEventData) => {
    if (!auth.user || !locationRef.current) {
      return;
    }

    const data: MechanicAvailableConfirmEventData = {
      user: userData,
      mechanic: {
        idMechanic: auth.user._id,
        latMechanic: locationRef.current.latitude,
        lngMechanic: locationRef.current.longitude,
      },
    };

    socket.instance.emit('mechanic_available_confirm', data);
    setStatus('waiting');
  };

  const cancelAssistance = () => {
    if (assistanceRef.current) {
      const data: CancelAssistanceEventData = assistanceRef.current;

      socket.instance.emit('request_cancelled_mechanic', data);

      setStatus('inactive');
      setUserLocation(undefined);
      assistanceRef.current = undefined;
    }
  };

  const activeService = () => {
    if (['inactive', 'loading'].includes(status)) {
      socket.connect();
      setStatus('activing');
      setItem('mechanic_default_active', true);
    }
  };

  const desactiveService = () => {
    socket.disconnect();
    setStatus('inactive');
    removeItem('mechanic_default_active');
  };

  const contextValue: MechanicAssistanceContextProps = {
    status,
    activeService,
    desactiveService,
    userLocation,
    cancelAssistance,
  };

  return (
    <MechanicAssistanceContext.Provider value={contextValue}>
      {children}
    </MechanicAssistanceContext.Provider>
  );
};
