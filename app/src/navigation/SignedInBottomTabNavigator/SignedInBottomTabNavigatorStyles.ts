import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    sceneContainer: {
      backgroundColor: theme.palette.background[100],
    },
    tabBar: {
      backgroundColor: theme.palette.background.light,
      elevation: 0,
      borderWidth: 0,
      minHeight: 57,
      paddingVertical: 10,
    },
    tabLabel: {
      fontSize: 12,
      marginBottom: 5,
    },
    active: {
      color: theme.palette.primary.main,
    },
    inactive: {
      color: theme.palette.primary[200],
    },
  }),
);
