import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    markerImage: {
      height: 30,
      width: 35,
      resizeMode: 'contain',
    },
  });
