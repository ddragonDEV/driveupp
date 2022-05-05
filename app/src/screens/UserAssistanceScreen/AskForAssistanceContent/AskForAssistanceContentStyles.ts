import { makeStyles, themes } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    askForAssistaceIcon: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      marginRight: theme.spacing(2),
    },
    needHelpText: {
      marginBottom: theme.spacing(3),
    },
  }),
);
