/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStyles } from './ServiceActivatorContentStyles';
import { useMessages } from './ServiceActivatorContentMessages';
import { useMechanicAssistance } from 'providers/MechanicAssistance';
import { Text } from 'components/Text';
import { useTheme } from 'providers/Theme';

export const ServiceActivatorContent = () => {
  const { theme } = useTheme();
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useMechanicAssistance();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          assistance.status === 'active'
            ? assistance.desactiveService()
            : assistance.activeService()
        }
        style={styles.switchActiveButton}
      >
        <View style={{ flex: 3 }} />
        <Text color="secondary" style={styles.serviceActiveLabel}>
          {messages.serviceActive}
        </Text>
        <View pointerEvents="none">
          <Switch
            trackColor={{
              false: theme.palette.greys[300],
              true: theme.palette.secondary[200],
            }}
            thumbColor={
              assistance.status === 'active'
                ? theme.palette.secondary.main
                : theme.palette.greys[100]
            }
            value={assistance.status === 'active'}
          />
        </View>
        {assistance.status === 'activing' && (
          <ActivityIndicator
            color={theme.palette.secondary.main}
            style={{ flex: 1 }}
          />
        )}
        <View style={{ flex: assistance.status === 'activing' ? 2 : 3 }} />
      </TouchableOpacity>
    </View>
  );
};
