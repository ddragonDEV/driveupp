import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../ResetPasswordFormMessages';
import { useAuth } from 'providers/Auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResetPasswordData } from 'providers/Auth/models/ResetPasswordData';
import { SignedOutStackNavigatorParams } from 'navigation/SignedOutStackNavigator';

interface Props {
  initialValues: {
    email: string;
  };
}

export const useForm = ({ initialValues: _initialValues }: Props) => {
  const auth = useAuth();
  const messages = useMessages();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<SignedOutStackNavigatorParams, 'resetPassword'>
    >();

  const initialValues: ResetPasswordData = {
    ..._initialValues,
    password: '',
    passwordConfirmation: '',
    pin: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
    password: yup
      .string()
      .required(messages.requiredError)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!¿@(.)$=%^/&¡*-]).{8,}$/,
        messages.passwordError,
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], messages.matchError)
      .required(messages.requiredError),
    pin: yup
      .number()
      .min(100000, messages.pinError)
      .max(999999, messages.pinError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const done = await auth.handleResetPassword(values);

      done &&
        navigation.reset({
          index: 1,
          routes: [
            { name: 'welcome' },
            { name: 'login', params: { email: formik.values.email } },
          ],
        });
    },
  });

  return formik;
};
