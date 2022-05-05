import { hexToRgba } from 'helpers/colors';
import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    label: {
      marginLeft: theme.radius(1) * 0.5,
    },
    input: {
      ...theme.text.body2,
      color: theme.palette.text.primary,
      marginTop: theme.spacing(1),
      borderColor: hexToRgba(theme.palette.primary.main, 0.1),
      borderWidth: 3,
      paddingVertical: theme.spacing(2),
      paddingHorizontal: theme.spacing(3),
      borderRadius: theme.radius(1),
      backgroundColor: theme.palette.background.light,
    },
    inputDisabled: {
      color: theme.palette.greys[500],
      backgroundColor: hexToRgba(theme.palette.greys[500], 0.1),
    },
    withError: {
      color: theme.palette.danger.main,
    },
    focused: {
      borderColor: hexToRgba(theme.palette.text.primary, 0.2),
    },
    disabled: {
      color: theme.palette.greys[500],
    },
    placeholder: {
      color: theme.palette.greys[500],
    },
    error: {
      marginLeft: theme.radius(1) * 0.5,
      marginBottom: theme.spacing(0.5),
    },
  }),
);
