import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'providers/Theme';
import { ProfileScreen } from 'screens/ProfileScreen';
import { EditProfileScreen } from 'screens/EditProfileScreen';

export type ProfileStackNavigatorParams = {
  info: undefined;
  edit: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackNavigatorParams>();

export const ProfileStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.background.main,
        },
        orientation: 'portrait_up',
      }}
    >
      <Stack.Screen name="info" component={ProfileScreen} />
      <Stack.Screen name="edit" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
