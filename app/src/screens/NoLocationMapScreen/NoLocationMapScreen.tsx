import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withLayout } from 'hoc';
import { useMessages } from './NoLocationMapScreenMessages';
import { useStyles } from './NoLocationMapScreenStyles';
import { useTheme } from 'providers/Theme';
import { Text } from 'components/Text';
import { useLocation } from 'providers/Location';

export const NoLocationMapScreen = withLayout(() => {
  const { theme } = useTheme();
  const messages = useMessages();
  const styles = useStyles();
  const location = useLocation();

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.palette.primary.main} />
      </View>

      <View style={styles.contentContainer}>
        {location.enabled === false ? (
          <Text variant="subtitle" color="secondary" style={styles.message}>
            {messages.message}
          </Text>
        ) : (
          <ActivityIndicator size="large" color={theme.palette.primary.main} />
        )}
      </View>
    </View>
  );
});
