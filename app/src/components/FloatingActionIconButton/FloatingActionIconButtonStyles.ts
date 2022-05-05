import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  position: 'br' | 'bl' | 'tl' | 'tr';
  color: 'primary' | 'secondary' | 'danger' | 'success';
  variant: 'outlined' | 'filled';
  disabled: boolean;
}

export const useStyles = makeStyles(
  (theme, { position, color, variant, disabled }: Props) =>
    StyleSheet.create({
      container: {
        position: 'absolute',
        top: position.includes('t') ? theme.spacing(2) : undefined,
        bottom: position.includes('b') ? theme.spacing(2) : undefined,
        left: position.includes('l') ? theme.spacing(2) : undefined,
        right: position.includes('r') ? theme.spacing(2) : undefined,
      },
      fab: {
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          variant === 'outlined'
            ? theme.palette.background.main
            : disabled
            ? theme.palette.greys.main
            : theme.palette[color].main,
        borderColor: disabled
          ? theme.palette.greys.main
          : theme.palette[color].main,
        borderWidth: 2,
        ...theme.shadows[4],
      },
      icon: {
        color:
          variant === 'filled'
            ? theme.palette.text.button
            : disabled
            ? theme.palette.greys.main
            : theme.palette[color].main,
      },
    }),
);
