import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: 'hidden',
      backgroundColor: theme.palette.background.light,
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.shadows[1],
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    noImageIcon: {
      color: theme.palette.primary.main,
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContainer: {
      backgroundColor: theme.palette.background.dark,
      borderRadius: 32,
      width: '90%',
      maxHeight: '90%',
      ...theme.shadows[2],
      padding: theme.spacing(3),
    },
    takePhotoModal: {
      marginBottom: theme.spacing(2),
    },
  }),
);
