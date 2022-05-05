import { images } from 'assets/images';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { useUserAssistance } from 'providers/UserAssistance';
import React from 'react';
import { Image, View } from 'react-native';
import { useStyles } from './AskForAssistanceContentStyles';
import { useMessages } from './AskForAssistanceMessages';

export const AskForAssistanceContent = () => {
  const styles = useStyles();
  const messages = useMessages();
  const assistance = useUserAssistance();

  return (
    <View style={styles.container}>
      <Text variant="subtitle" color="secondary" style={styles.needHelpText}>
        {messages.needHelp}
      </Text>
      <Button color="secondary" onPress={assistance.searchForHelp}>
        <Image
          source={images.advertisingWhite}
          style={styles.askForAssistaceIcon}
        />
        <Text variant="button">{messages.askForAssistance}</Text>
      </Button>
    </View>
  );
};
