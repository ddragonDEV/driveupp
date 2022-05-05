import React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'providers/Theme';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { CustomHeader } from './CustomHeader';
import { LoginScreen } from 'screens/LoginScreen';
import { RecoveryPasswordScreen } from 'screens/RecoveryPasswordScreen';
import { ResetPasswordScreen } from 'screens/ResetPasswordScreen';
import { SignUpScreen } from 'screens/SignUpScreen';

export type SignedOutStackNavigatorParams = {
  welcome: undefined;
  signUp: undefined;
  login?: {
    email?: string;
  };
  recoveryPassword: {
    email: string;
  };
  resetPassword: {
    email: string;
  };
};

const Stack = createNativeStackNavigator<SignedOutStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<SignedOutStackNavigatorParams>();

export const SignedOutStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: CustomHeader,
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
        orientation: 'portrait_up',
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="recoveryPassword"
        component={RecoveryPasswordScreen}
      />
      <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};
