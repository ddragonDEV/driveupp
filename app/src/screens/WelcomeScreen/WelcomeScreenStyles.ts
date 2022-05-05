import { Dimensions, StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

const window = Dimensions.get('window');

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(2),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 165,
      marginTop: theme.spacing(2),
    },
    logo: {
      width: 370,
      height: Math.min(370, window.width * 0.9),
      maxWidth: window.width * 0.9,
      resizeMode: 'contain',
      marginBottom: theme.spacing(6),
    },
    bikeImage: {
      height: 35,
      resizeMode: 'contain',
    },
    loginButton: {
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.white,
      borderColor: theme.palette.white,
    },
    loginButtonText: {
      color: theme.palette.background[300],
    },
  }),
);
