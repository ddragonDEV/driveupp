import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles(() =>
  StyleSheet.create({
    layout: {
      flex: 1,
    },
  }),
);
