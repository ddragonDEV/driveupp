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
    imagePicker: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    checkBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    checkBox: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  }),
);
