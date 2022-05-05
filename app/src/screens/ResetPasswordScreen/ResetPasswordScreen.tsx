import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import React, { FC } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { ResetPasswordForm } from './ResetPasswordForm';
import { useMessages } from './ResetPasswordMessages';
import { useStyles } from './ResetPasswordScreenStyles';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';

interface Props
  extends NativeStackScreenProps<
    SignedOutStackNavigatorParams,
    'resetPassword'
  > {}

export const ResetPasswordScreen: FC<Props> = ({ route: { params } }) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.container}>
          <Text color="secondary" style={styles.description}>
            {messages.description}
          </Text>

          <ResetPasswordForm initialValues={params} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
