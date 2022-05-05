import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withLayout } from 'hoc';
import { useMessages } from './NoPermissionMapScreenMessages';
import { useStyles } from './NoPermissionMapScreenStyles';
import { usePermissions } from 'providers/Permissions';
import { Button } from 'components/Button';
import { useModal } from 'providers/Modal';
import { openSettings } from 'react-native-permissions';
import { InfoModal } from 'components/InfoModal';
import { useTheme } from 'providers/Theme';
import { Text } from 'components/Text';

export const NoPermissionMapScreen = withLayout(() => {
  const { theme } = useTheme();
  const permissions = usePermissions();
  const modal = useModal();
  const messages = useMessages();
  const styles = useStyles();

  const askForLocationPermission = () => {
    if (permissions.location?.status === 'blocked') {
      modal.handleOpen({
        content: (
          <InfoModal
            title={messages.permissionModalTitle}
            buttonText={messages.openSettings}
            buttonOnPress={openSettings}
          />
        ),
      });
    } else {
      permissions.location?.request();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.palette.primary.main} />
      </View>

      <View style={styles.contentContainer}>
        <Text
          style={styles.permissionsMessage}
          variant="body2"
          color="secondary"
        >
          {messages.permissionsMessage}
        </Text>
        <Button
          color="primary"
          onPress={askForLocationPermission}
          style={styles.grantPermissionsButtonStyles}
          title={messages.grantPermissions}
        />
      </View>
    </View>
  );
});
