import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../LoginFormMessages';
import { useAuth } from 'providers/Auth';

interface Props {
  initialValues?: {
    email?: string;
  };
}

export const useForm = ({ initialValues: _initialValues }: Props) => {
  const auth = useAuth();
  const messages = useMessages();

  const initialValues = {
    email: _initialValues?.email || '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(messages.requiredError)
      .email(messages.emailError),
    password: yup.string().required(messages.requiredError),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => auth.handleLogin(values),
  });

  return formik;
};
