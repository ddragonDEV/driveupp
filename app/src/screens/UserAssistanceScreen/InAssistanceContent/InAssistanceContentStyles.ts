import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      marginTop: theme.spacing(2),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      marginHorizontal: theme.spacing(1),
    },
    waitingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: theme.spacing(1),
    },
    waitingText: {
      lineHeight: 18.5,
      marginRight: theme.spacing(2),
    },
  }),
);
