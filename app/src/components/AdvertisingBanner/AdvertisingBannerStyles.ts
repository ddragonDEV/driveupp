import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = makeStyles((theme) => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      borderRadius: theme.radius(1.5),
      position: 'absolute',
      alignSelf: 'center',
      top: insets.top + 25,
      height: 130,
      width: 250,
      backgroundColor: theme.palette.white,
      ...theme.shadows[1],
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
      overflow: 'hidden',
    },
    carousel: {
      width: '100%',
      height: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
});
