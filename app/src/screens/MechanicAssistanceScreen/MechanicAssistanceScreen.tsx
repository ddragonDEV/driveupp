import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withLayout } from 'hoc';
import { useStyles } from './MechanicAssistanceScreenStyles';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Map } from 'components/Map';
import { SignedInBottomTabNavigatorProps } from 'navigation/SignedInBottomTabNavigator';
import { ServiceActivatorContent } from './ServiceActivatorContent';
import { useMechanicAssistance } from 'providers/MechanicAssistance';
import { WaitingUserLocationContent } from './WaitingUserLocationContent';
import { InAssistanceContent } from './InAssistanceContent';
import { useTheme } from 'providers/Theme';

interface Props
  extends BottomTabScreenProps<SignedInBottomTabNavigatorProps, 'assistance'> {}

export const MechanicAssistanceScreen: FC<Props> = withLayout(() => {
  const { theme } = useTheme();
  const styles = useStyles();
  const assistance = useMechanicAssistance();

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map secondPoint={assistance.userLocation} />
      </View>

      <View style={styles.contentContainer}>
        {assistance.status === 'waiting' ? (
          <WaitingUserLocationContent />
        ) : assistance.status === 'loading' ? (
          <ActivityIndicator size="large" color={theme.palette.primary.main} />
        ) : assistance.status === 'helping' ? (
          <InAssistanceContent />
        ) : (
          <ServiceActivatorContent />
        )}
      </View>
    </View>
  );
});
