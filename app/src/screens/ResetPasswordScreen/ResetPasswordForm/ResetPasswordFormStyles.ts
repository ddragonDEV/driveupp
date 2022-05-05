import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    submitButton: {
      marginVertical: theme.spacing(2),
    },
    email: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }),
);
