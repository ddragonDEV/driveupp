import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';
import React, { FC } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { EditProfileForm } from './EditProfileForm';
import { useStyles } from './EditProfileScreenStyles';

interface Props
  extends NativeStackScreenProps<SignedOutStackNavigatorParams, 'login'> {}

export const EditProfileScreen: FC<Props> = () => {
  const styles = useStyles();

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <ScrollView>
        <View style={styles.container}>
          <EditProfileForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
