import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    scrollView: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: theme.spacing(1),
      paddingTop: insets.top + theme.spacing(2),
      paddingBottom: insets.bottom + theme.spacing(2),
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    menuItem: {
      margin: theme.spacing(1),
    },
  });
});
