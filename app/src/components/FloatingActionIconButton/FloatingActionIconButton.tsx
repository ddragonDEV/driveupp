import React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStyles } from './FloatingActionIconButtonStyles';

interface Props {
  iconName: string;
  position: 'br' | 'bl' | 'tl' | 'tr';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  variant?: 'outlined' | 'filled';
  onPress: () => void;
  disabled?: boolean;
}

export const FloatingActionIconButton = (props: Props) => {
  const {
    position,
    iconName,
    onPress,
    color = 'primary',
    variant = 'filled',
    disabled = false,
  } = props;

  const styles = useStyles({ variant, color, position, disabled });

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        disabled={disabled}
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#00000020', false, 30)}
      >
        <View style={styles.fab}>
          <Icon size={26} name={iconName} style={styles.icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
