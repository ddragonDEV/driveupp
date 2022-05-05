import { hexToRgba } from 'helpers/colors';
import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(2),
      paddingTop: insets.top + theme.spacing(1),
      backgroundColor: theme.palette.background.main,
    },
    backButton: {
      width: 35,
      height: 35,
      borderWidth: 2,
      borderRadius: theme.radius(0.5),
      borderColor: hexToRgba(theme.palette.text.primary, 0.3),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing(2),
    },
    backArrow: {
      color: theme.palette.text.primary,
      marginLeft: 6,
    },
    title: {
      fontWeight: '500',
      fontSize: 28,
    },
  });
});
