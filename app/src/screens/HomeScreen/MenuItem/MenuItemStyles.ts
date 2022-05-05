import { makeStyles } from 'providers/Theme';
import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(2),
      alignItems: 'center',
      backgroundColor: theme.palette.white,
      width: Math.min(170, window.width / 2 - theme.spacing(3)),
      height: Math.min(170, window.width / 2 - theme.spacing(3)),
      minHeight: 145,
      minWidth: 145,
      borderRadius: theme.radius(1.5),
      ...theme.shadows[1],
    },
    icon: {
      height: 100,
      width: 120,
      resizeMode: 'contain',
    },
  }),
);
