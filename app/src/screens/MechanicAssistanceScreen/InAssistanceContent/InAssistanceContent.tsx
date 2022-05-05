/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from './InAssistanceContentStyles';
import { Text } from 'components/Text';
import { useMechanicAssistance } from 'providers/MechanicAssistance';
import { Button } from 'components/Button';
import { useMessages } from './InAssistanceContentMessages';
import { useTheme } from 'providers/Theme';

export const InAssistanceContent = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useMechanicAssistance();

  return (
    <View style={styles.container}>
      {assistance.userLocation ? (
        <Text variant="title" color="secondary">
          {assistance.userLocation &&
            `${assistance.userLocation.distance.value} ${assistance.userLocation.distance.unit}`}
        </Text>
      ) : (
        <View style={styles.waitingContainer}>
          <View style={{ flex: 1 }} />
          <Text color="secondary" style={styles.waitingText}>
            {messages.waitingUserLocation}
          </Text>
          <ActivityIndicator color={theme.palette.secondary.main} />
          <View style={{ flex: 1 }} />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <Button
          color="danger"
          title={messages.cancel}
          onPress={assistance.cancelAssistance}
        />
      </View>
    </View>
  );
};
