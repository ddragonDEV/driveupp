import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      padding: theme.spacing(2),
      paddingTop: insets.top + theme.spacing(2),
      paddingBottom: insets.bottom + theme.spacing(2),
    },
    imageContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: 'hidden',
      backgroundColor: theme.palette.background.light,
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: theme.spacing(2),
    },
    punctuationContainer: {
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    noImageIcon: {
      color: theme.palette.primary.main,
    },
    field: {
      marginTop: theme.spacing(2),
    },
    label: {
      fontWeight: 'bold',
    },
  });
});
