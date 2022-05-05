import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    loaderContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      paddingHorizontal: theme.spacing(2),
    },
    permissionsMessage: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    grantPermissionsButtonStyles: {
      alignSelf: 'center',
    },
  }),
);
