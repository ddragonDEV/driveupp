import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'providers/Theme';
import { useAuth } from 'providers/Auth';
import { SignedOutStackNavigator } from 'navigation/SignedOutStackNavigator';
import { SignedInBottomTabNavigator } from 'navigation/SignedInBottomTabNavigator';

export type MainStackNavigatorParams = {
  signedOut: undefined;
  signedIn: undefined;
};

const Stack = createNativeStackNavigator<MainStackNavigatorParams>();

export const navigationContainerRef =
  createNavigationContainerRef<MainStackNavigatorParams>();

export const MainStackNavigator = () => {
  const { theme } = useTheme();
  const auth = useAuth();

  if (auth.status === 'pending') {
    return null;
  }

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.background.main,
          },
          orientation: 'portrait_up',
        }}
      >
        {auth.status === 'out' ? (
          <>
            <Stack.Screen
              name="signedOut"
              component={SignedOutStackNavigator}
            />
          </>
        ) : (
          <Stack.Screen
            name="signedIn"
            component={SignedInBottomTabNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
