/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from './CancelingAssistanceContentStyles';
import { useMessages } from './CancelingAssistanceContentMessages';
import { Text } from 'components/Text';
import { useTheme } from 'providers/Theme';

export const CancelingAssistanceContent = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const messages = useMessages();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Text color="danger" style={styles.cancelingText}>
        {messages.canceling}
      </Text>
      <ActivityIndicator color={theme.palette.danger.main} />
      <View style={{ flex: 1 }} />
    </View>
  );
};
