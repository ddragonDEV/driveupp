import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    star: {
      marginHorizontal: theme.spacing(0.5),
      color: theme.palette.primary.main
    },
  }),
);
