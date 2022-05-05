import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    switchActiveButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceActiveLabel: {
      lineHeight: 18.5,
      marginRight: theme.spacing(1),
    },
  }),
);
