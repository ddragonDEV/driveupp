import { RateAssistanceModal } from 'components/RateAssistanceModal';
import React, { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { useMessages } from './MechanicAssistanceCompleteModalMessages';
import { useStyles } from './MechanicAssistanceCompleteModalStyles';

interface Props {
  assistanceId?: string;
}

export const MechanicAssistanceCompleteModal: FC<Props> = ({
  assistanceId,
}) => {
  const styles = useStyles();
  const messages = useMessages();
  const modal = useModal();

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title} color="secondary">
        {messages.title}
      </Text>

      <Text variant="body2" color="text">
        {messages.description}
      </Text>

      <View style={styles.buttonsContainer}>
        {assistanceId && (
          <Button
            title={messages.rate}
            color="primary"
            text={{ style: styles.acceptButtonText }}
            onPress={() => {
              modal.handleOpen({
                content: <RateAssistanceModal assistanceId={assistanceId} />,
              });
            }}
          />
        )}
        <Button
          style={styles.acceptButton}
          title={messages.accept}
          onPress={() => modal.handleHide()}
          text={{ style: styles.acceptButtonText }}
        />
      </View>
    </View>
  );
};
