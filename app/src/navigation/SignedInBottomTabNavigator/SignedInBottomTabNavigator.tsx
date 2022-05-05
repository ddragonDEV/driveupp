import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStyles } from './SignedInBottomTabNavigatorStyles';
import { getTabBarIcon, getTabBarLabel } from './helpers';
import { usePermissions } from 'providers/Permissions';
import { NoPermissionMapScreen } from 'screens/NoPermissionMapScreen';
import { useAuth } from 'providers/Auth';
import { MechanicAssistanceScreen } from 'screens/MechanicAssistanceScreen';
import { UserAssistanceScreen } from 'screens/UserAssistanceScreen';
import { useLocation } from 'providers/Location';
import { NoLocationMapScreen } from 'screens/NoLocationMapScreen';
import { ProfileStackNavigator } from 'navigation/ProfileStackNavigator';

export type SignedInBottomTabNavigatorProps = {
  assistance: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<SignedInBottomTabNavigatorProps>();

export const SignedInBottomTabNavigator = () => {
  const styles = useStyles();
  const permissions = usePermissions();
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        tabBarLabel: ({ color }) => getTabBarLabel(route.name, color),
        tabBarActiveTintColor: styles.active.color,
        tabBarInactiveTintColor: styles.inactive.color,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name="assistance"
        component={
          permissions.location?.status === 'granted'
            ? location.enabled
              ? auth.user.role === 'mechanic'
                ? MechanicAssistanceScreen
                : UserAssistanceScreen
              : NoLocationMapScreen
            : NoPermissionMapScreen
        }
      />
      <Tab.Screen name="profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
