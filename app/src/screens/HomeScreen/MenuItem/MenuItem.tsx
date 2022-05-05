import { Text } from 'components/Text';
import React, { FC } from 'react';
import {
  Image,
  ImageURISource,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useStyles } from './MenuItemStyles';

interface Props extends TouchableOpacityProps {
  label: string;
  icon: ImageURISource;
}

export const MenuItem: FC<Props> = ({ label, icon, style, ...props }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      {...props}
    >
      <Image source={icon} style={styles.icon} />
      <Text variant="body2" color="primary">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
