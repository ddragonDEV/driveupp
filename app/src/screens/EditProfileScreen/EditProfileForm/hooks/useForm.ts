import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMessages } from '../EditProfileFormMessages';
import { useAuth } from 'providers/Auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackNavigatorParams } from 'navigation/ProfileStackNavigator';
import { uploadFile as _uploadFile } from 'config/api/cloudinary/requests/files';
import { useRequest } from 'hooks/useRequest';

export const useForm = () => {
  const auth = useAuth();
  const messages = useMessages();
  const uploadFile = useRequest(_uploadFile);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ProfileStackNavigatorParams, 'edit'>
    >();

  const initialValues = {
    localPhoto: false,
    photo: { uri: auth.user?.photo },
    name: auth.user!.name,
    lastName: auth.user!.lastName,
    email: auth.user!.email,
    phone: auth.user!.phone,
    updatePassword: false,
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object({
    localPhoto: yup.boolean(),
    photo: yup
      .object()
      .shape({ uri: yup.string(), type: yup.string(), fileName: yup.string() })
      .nullable(),
    name: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    lastName: yup
      .string()
      .min(3, messages.min3Error)
      .max(30, messages.max30Error)
      .required(messages.requiredError),
    email: yup
      .string()
      .email(messages.emailError)
      .required(messages.requiredError),
    phone: yup
      .string()
      .min(4, messages.requiredError)
      .matches(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/, messages.phoneError),
    updatePassword: yup.boolean(),
    password: yup.string().when('updatePassword', {
      is: true,
      then: yup
        .string()
        .required(messages.requiredError)
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!¿@(.)$=%^/&¡*-]).{8,}$/,
          messages.passwordError,
        ),
      otherwise: yup.string().nullable(),
    }),
    passwordConfirmation: yup.string().when('updatePassword', {
      is: true,
      then: yup
        .string()
        .oneOf([yup.ref('password')], messages.matchError)
        .required(messages.requiredError),
      otherwise: yup.string().nullable(),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let photoUrl = values.photo.uri;

      if (values.localPhoto) {
        let cloudinaryPhotoUrl = await uploadFile({ data: values.photo });

        if (!cloudinaryPhotoUrl) {
          return;
        }

        photoUrl = cloudinaryPhotoUrl;
      }

      console.log(auth.user?.rut);

      const done = await auth.handleEditProfile({
        email: values.email,
        name: values.name,
        lastName: values.lastName,
        phone: values.phone,
        rut: auth.user!.rut,
        password: values.updatePassword ? values.password : undefined,
        photo: photoUrl,
      });

      if (done) {
        navigation.goBack();
      }
    },
  });

  return formik;
};
