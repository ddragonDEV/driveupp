import { UserPreview } from 'components/UserPreview';
import { Distance } from 'providers/Location/models/Distance';
import { Mechanic } from 'providers/UserAssistance/models/Mechanic';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useMessages } from './MechanicCanHelpModalMessages';
import { useStyles } from './MechanicCanHelpStyles';

interface Props {
  onAccept: () => void;
  onReject: () => void;
  distance: Distance;
  mechanic: Mechanic;
}

export const MechanicCanHelpModal: FC<Props> = ({
  onAccept,
  onReject,
  distance,
  mechanic,
}) => {
  const styles = useStyles();
  const messages = useMessages();
  const modal = useModal();

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title} color="secondary">
        {messages.title}
      </Text>

      <UserPreview {...mechanic} />

      <View style={styles.distanceContainer}>
        <Text variant="title2" color="secondary" style={styles.distanceLabel}>
          {messages.distance}
        </Text>
        <Text variant="title2" color="secondary">
          {distance.value} {distance.unit}
        </Text>
      </View>

      <Text variant="body2" color="text">
        {messages.question}
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          title={messages.accept}
          color="primary"
          onPress={() => {
            onAccept();
            modal.handleHide();
          }}
        />
        <Button
          title={messages.reject}
          style={styles.rejectButton}
          text={{ style: styles.rejectButtonText }}
          onPress={() => {
            onReject();
            modal.handleHide();
          }}
        />
      </View>
    </View>
  );
};
