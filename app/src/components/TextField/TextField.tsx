import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';
import { Text } from 'components/Text';
import { useStyles } from './TextFieldStyles';

interface Props extends TextInputProps {
  label: string;
  error?: string;
  disabled?: boolean;
  labelProps?: TextProps;
  errorProps?: TextProps;
  containerProps?: ViewProps;
}

export const TextField: React.FC<Props> = ({
  label,
  error,
  style,
  labelProps,
  errorProps,
  containerProps,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const styles = useStyles();

  return (
    <View {...containerProps}>
      <Text
        variant="body"
        color={error ? 'danger' : 'text2'}
        {...labelProps}
        style={[labelProps?.style, styles.label, disabled && styles.disabled]}
      >
        {label}
      </Text>
      <TextInput
        onBlur={(event) => {
          setFocused(false);
          props.onBlur && props.onBlur(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          props.onFocus && props.onFocus(event);
        }}
        style={[
          styles.input,
          focused && styles.focused,
          style,
          !!error && styles.withError,
          disabled && styles.inputDisabled,
        ]}
        placeholderTextColor={
          disabled ? styles.disabled.color : styles.placeholder.color
        }
        editable={!disabled}
        {...props}
      />
      <Text
        variant="body2"
        color="danger"
        {...errorProps}
        style={[errorProps?.style, styles.error]}
      >
        {error}
      </Text>
    </View>
  );
};
