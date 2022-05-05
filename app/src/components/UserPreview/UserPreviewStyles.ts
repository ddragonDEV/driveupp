import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    photo: {
      height: 70,
      width: 70,
      borderRadius: 25,
      resizeMode: 'cover',
    },
    infoContainer: {
      paddingLeft: theme.spacing(2),
    },
  }),
);
