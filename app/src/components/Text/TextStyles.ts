import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  variant:
    | 'title'
    | 'title2'
    | 'subtitle'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button';
  color:
    | 'text'
    | 'text2'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'button';
}

export const useStyles = makeStyles((theme, { color, variant }: Props) =>
  StyleSheet.create({
    text: {
      color:
        color === 'button'
          ? theme.palette.text.button
          : color === 'text'
          ? theme.palette.text.primary
          : color === 'text2'
          ? theme.palette.text.secondary
          : theme.palette[color].main,
      ...theme.text[variant],
    },
  }),
);
