import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing(1),
      paddingTop: theme.spacing(2),
      paddingBottom: insets.bottom + theme.spacing(4),
    },
    haveAccountContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing(1),
    },
    loginButton: {
      marginLeft: theme.spacing(1),
    },
    loginText: {
      fontWeight: 'bold',
    },
  });
});
