import React from 'react';
import { Text as TextRN, TextProps } from 'react-native';
import { useStyles } from './TextStyles';

export interface Props extends TextProps {
  variant?:
    | 'title'
    | 'title2'
    | 'subtitle'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button';
  color?:
    | 'text'
    | 'text2'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'button';
}

export const Text: React.FC<Props> = ({
  children,
  variant = 'body',
  color,
  style,
  ...props
}) => {
  const styles = useStyles({
    variant,
    color: color || (variant === 'button' ? 'button' : 'text'),
  });

  return (
    <TextRN style={[styles.text, style]} {...props}>
      {children}
    </TextRN>
  );
};
