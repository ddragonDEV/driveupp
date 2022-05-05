import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import React, { FC, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginForm } from './LoginForm';
import { useMessages } from './LoginScreenMessages';
import { useStyles } from './LoginScreenStyles';
import { FormikContextType } from 'formik';
import { LoginData } from 'providers/Auth/models/LoginData';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';

interface Props
  extends NativeStackScreenProps<SignedOutStackNavigatorParams, 'login'> {}

export const LoginScreen: FC<Props> = ({ navigation, route: { params } }) => {
  const messages = useMessages();
  const styles = useStyles();
  const formRef = useRef<FormikContextType<LoginData>>();

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <LoginForm formRef={formRef} initialValues={params} />

          <View style={styles.haveAccountContainer}>
            <Text color="text2">{messages.dontHaveAccount}</Text>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() =>
                navigation.reset({
                  index: 1,
                  routes: [{ name: 'welcome' }, { name: 'signUp' }],
                })
              }
            >
              <Text style={styles.signUpText}>{messages.signUp}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.recoveryPasswordButton}
            onPress={() =>
              navigation.navigate('recoveryPassword', {
                email: formRef.current?.values.email ?? '',
              })
            }
          >
            <Text
              variant="subtitle2"
              color="secondary"
              style={styles.recoveryPasswordText}
            >
              {messages.forgotPassword}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
