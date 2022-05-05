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
    description: {
      marginBottom: theme.spacing(4),
    },
  });
});
