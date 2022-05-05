/* eslint-disable react-hooks/rules-of-hooks */
import { Text } from 'components/Text';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SignedInBottomTabNavigatorProps } from '.';
import { useMessages } from './SignedInBottomTabNavigatorMessages';
import { useStyles } from './SignedInBottomTabNavigatorStyles';

export const getTabBarIcon = (
  route: keyof SignedInBottomTabNavigatorProps,
  color: string,
) => {
  const icons: Record<keyof SignedInBottomTabNavigatorProps, string> = {
    assistance: 'location-on',
    profile: 'person',
  };

  return <Icon name={icons[route]} size={25} color={color} />;
};

export const getTabBarLabel = (
  route: keyof SignedInBottomTabNavigatorProps,
  color: string,
) => {
  const style = useStyles();
  const messages = useMessages();

  return (
    <Text variant="body2" style={{ color, ...style.tabLabel }}>
      {messages[route]}
    </Text>
  );
};
