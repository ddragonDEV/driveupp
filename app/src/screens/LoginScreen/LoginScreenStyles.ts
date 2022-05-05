import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing(1),
      paddingTop: theme.spacing(2),
      paddingBottom: insets.bottom + theme.spacing(4),
      justifyContent: 'center',
    },
    haveAccountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing(1),
    },
    signUpButton: {
      marginLeft: theme.spacing(1),
    },
    signUpText: {
      fontWeight: 'bold',
    },
    recoveryPasswordButton: {
      marginTop: theme.spacing(3),
      alignSelf: 'center',
    },
    recoveryPasswordText: {
      fontWeight: 'bold',
    },
  });
});
