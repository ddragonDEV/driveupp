import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useModal } from '../../providers/Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { PunctuationInput } from './PunctuationInput';
import { useMessages } from './RateAssistanceModalMessages';
import { useStyles } from './RateAssistanceModalStyles';
import { rateAssistance as _rateAssistance } from 'config/api/backend/requests/assistance';
import { useRequest } from 'hooks/useRequest';

interface Props {
  assistanceId: string;
}

export const RateAssistanceModal: FC<Props> = ({ assistanceId }) => {
  const styles = useStyles();
  const messages = useMessages();
  const modal = useModal();
  const rateAssistance = useRequest(_rateAssistance);
  const [value, setValue] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text variant="button" style={styles.title} color="secondary">
        {messages.title}
      </Text>

      <PunctuationInput value={value} setValue={setValue} />

      <View style={styles.buttonsContainer}>
        <Button
          variant={value === 0 ? 'outlined' : 'filled'}
          disabled={value === 0}
          title={messages.accept}
          color="primary"
          onPress={async () => {
            const done = await rateAssistance({
              data: { assistanceId, punctuation: value },
            });

            done && modal.handleHide();
          }}
        />
      </View>
    </View>
  );
};
