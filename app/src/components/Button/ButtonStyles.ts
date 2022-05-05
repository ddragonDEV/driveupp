import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

type Props = {
  color: 'primary' | 'secondary' | 'danger' | 'success' | 'background';
  variant: 'outlined' | 'filled';
  size: 'small' | 'medium' | 'big';
  disabled?: boolean;
};

export const useStyles = makeStyles(
  (theme, { variant, color, disabled, size }: Props) =>
    StyleSheet.create({
      button: {
        paddingVertical: theme.spacing(
          size === 'small' ? 1 : size === 'medium' ? 1.5 : 2,
        ),
        paddingHorizontal: theme.spacing(3),
        borderRadius: theme.radius(1),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...(variant === 'filled' ? theme.shadows[2] : {}),
        backgroundColor:
          variant === 'filled'
            ? disabled
              ? theme.palette.greys[500]
              : color === 'background'
              ? theme.palette.background[300]
              : theme.palette[color].main
            : '#00000000',
        borderColor: disabled
          ? theme.palette.greys[500]
          : color === 'background'
          ? theme.palette.background[300]
          : theme.palette[color].main,
        borderWidth: 2,
      },
      text: {
        color:
          variant === 'filled'
            ? theme.palette.text.button
            : disabled
            ? theme.palette.greys[500]
            : color === 'background'
            ? theme.palette.background[300]
            : theme.palette[color].main,
      },
    }),
);
