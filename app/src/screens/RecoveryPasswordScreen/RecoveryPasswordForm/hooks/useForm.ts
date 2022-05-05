import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../RecoveryPasswordFormMessages';
import { useAuth } from 'providers/Auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';

interface Props {
  initialValues: {
    email: string;
  };
}

export const useForm = ({ initialValues }: Props) => {
  const auth = useAuth();
  const messages = useMessages();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        SignedOutStackNavigatorParams,
        'recoveryPassword'
      >
    >();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(messages.requiredError)
      .email(messages.emailError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const emailSent = await auth.handleRecoveryPassword(values);

      emailSent &&
        navigation.navigate('resetPassword', { email: values.email });
    },
  });

  return formik;
};
