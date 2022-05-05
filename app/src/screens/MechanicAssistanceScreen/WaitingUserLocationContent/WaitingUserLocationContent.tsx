/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from './WaitingUserLocationContentStyles';
import { useMessages } from './WaitingUserLocationContentMessages';
import { Text } from 'components/Text';
import { useTheme } from 'providers/Theme';

export const WaitingUserLocationContent = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const messages = useMessages();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Text color="secondary" style={styles.waitingText}>
        {messages.waitingUserLocation}
      </Text>
      <ActivityIndicator color={theme.palette.secondary.main} />
      <View style={{ flex: 1 }} />
    </View>
  );
};
