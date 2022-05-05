import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import React, { FC } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { MainStackNavigatorParams } from 'navigation/MainStackNavigator';
import { RecoveryPasswordForm } from './RecoveryPasswordForm';
import { useMessages } from './RecoveryPasswordScreenMessages';
import { useStyles } from './RecoveryPasswordScreenStyles';

interface Props
  extends NativeStackScreenProps<
    MainStackNavigatorParams,
    'recoveryPassword'
  > {}

export const RecoveryPasswordScreen: FC<Props> = ({ route: { params } }) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <Text color="text2" style={styles.description}>
            {messages.description}
          </Text>

          <RecoveryPasswordForm initialValues={params} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
