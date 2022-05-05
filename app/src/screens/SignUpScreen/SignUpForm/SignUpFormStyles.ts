import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    submitButton: {
      marginVertical: theme.spacing(2),
    },
    phoneFieldContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneField: {
      flex: 1,
    },
    phoneCode: {
      marginTop: 2,
      marginHorizontal: theme.spacing(1),
    },
  }),
);
