import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    waitingText: {
      lineHeight: 18.5,
      marginRight: theme.spacing(2),
    },
  }),
);
