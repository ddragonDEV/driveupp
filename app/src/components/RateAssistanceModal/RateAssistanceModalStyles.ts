import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
      textTransform: 'none',
      textAlign: 'center',
    },
    buttonsContainer: {
      marginTop: theme.spacing(3),
    },
  }),
);
