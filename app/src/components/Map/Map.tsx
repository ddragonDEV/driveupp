/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, FC } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useStyles } from './MapStyles';
import { Location } from 'providers/Location/models/Location';
import { FloatingActionIconButton } from 'components/FloatingActionIconButton';
import { Image, View } from 'react-native';
import { useTheme } from 'providers/Theme';
import { useAuth } from 'providers/Auth';
import { config } from 'config';
import { Follow } from './Follow';
import { images } from 'assets/images';
import { useLocation } from 'providers/Location';
import { hexToRgba } from 'helpers/colors';

interface Props {
  secondPoint?: Location;
}

export const Map: FC<Props> = ({ secondPoint }) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const auth = useAuth();
  const { addListener: addLocationListener } = useLocation();
  const [location, setLocation] = useState<Location>();
  const mapRef = useRef<MapView>();
  const innerLocationRef = useRef<Location>();
  const [follow, setFollow] = useState<Follow>('user');

  useEffect(() => {
    addLocationListener(setLocation);
  }, []);

  useEffect(() => {
    follow === 'secondPoint' &&
      mapRef.current?.animateCamera({
        center: secondPoint,
      });
  }, [follow, secondPoint]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(el: MapView) => {
          if (el) {
            mapRef.current = el;
          }
        }}
        style={styles.map}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          innerLocationRef.current = event.nativeEvent.coordinate;

          follow === 'user' &&
            mapRef.current?.animateCamera({
              center: innerLocationRef.current,
            });
        }}
        showsMyLocationButton={false}
        minZoomLevel={16}
        onTouchStart={() => setFollow(undefined)}
      >
        {secondPoint && (
          <>
            <Marker
              coordinate={secondPoint}
              onPress={() => setFollow('secondPoint')}
            >
              <Image
                style={styles.markerImage}
                source={
                  auth.user?.role === 'mechanic' ? images.bike : images.mechanic
                }
              />
            </Marker>

            <MapViewDirections
              resetOnChange={false}
              strokeWidth={8}
              strokeColor={hexToRgba(theme.palette.primary.main, 0.8)}
              origin={
                auth.user?.role === 'mechanic'
                  ? location || innerLocationRef.current
                  : secondPoint
              }
              mode="DRIVING"
              destination={
                auth.user?.role === 'mechanic'
                  ? secondPoint
                  : location || innerLocationRef.current
              }
              apikey={config.googleMapsApiKey}
            />
          </>
        )}
      </MapView>

      <FloatingActionIconButton
        color="primary"
        iconName="location-searching"
        variant="filled"
        position="br"
        onPress={() => {
          setFollow('user');

          if (innerLocationRef.current) {
            mapRef.current?.animateCamera({
              center: innerLocationRef.current,
            });
          }
        }}
      />
    </View>
  );
};
