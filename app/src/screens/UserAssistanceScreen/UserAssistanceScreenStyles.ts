import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mapContainer: {
      flex: 3,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  }),
);
