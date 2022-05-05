/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from './InAssistanceContentStyles';
import { Text } from 'components/Text';
import { useUserAssistance } from 'providers/UserAssistance';
import { Button } from 'components/Button';
import { useMessages } from './InAssistanceContentMessages';
import { useTheme } from 'providers/Theme';

export const InAssistanceContent = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useUserAssistance();

  return (
    <View style={styles.container}>
      {assistance.mechanicLocation ? (
        <Text variant="title" color="secondary">
          {assistance.mechanicLocation &&
            `${assistance.mechanicLocation.distance.value} ${assistance.mechanicLocation.distance.unit}`}
        </Text>
      ) : (
        <View style={styles.waitingContainer}>
          <View style={{ flex: 1 }} />
          <Text color="secondary" style={styles.waitingText}>
            {messages.waitingMechanicLocation}
          </Text>
          <ActivityIndicator color={theme.palette.secondary.main} />
          <View style={{ flex: 1 }} />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <Button
          title={messages.complete}
          color="primary"
          style={styles.button}
          onPress={assistance.completeAssistance}
        />
        <Button
          color="danger"
          title={messages.cancel}
          style={styles.button}
          onPress={assistance.cancelAssistance}
        />
      </View>
    </View>
  );
};
