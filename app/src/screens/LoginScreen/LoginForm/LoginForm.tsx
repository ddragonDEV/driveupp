/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, MutableRefObject, useEffect } from 'react';
import { useMessages } from './LoginFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './LoginFormStyles';
import { useForm } from './hooks/useForm';
import { LoginData } from 'providers/Auth/models/LoginData';
import { FormikContextType } from 'formik';

interface Props {
  formRef?: MutableRefObject<FormikContextType<LoginData> | undefined>;
  initialValues?: {
    email?: string;
  };
}

export const LoginForm: FC<Props> = ({ formRef, initialValues }) => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm({ initialValues });

  useEffect(() => {
    if (formRef) {
      formRef.current = form;
    }
  }, [form]);

  return (
    <>
      <TextField
        autoCapitalize="none"
        keyboardType="email-address"
        value={form.values.email}
        error={form.touched.email ? form.errors.email : undefined}
        onChangeText={(value) => form.setFieldValue('email', value)}
        label={messages.emailLabel}
        placeholder={messages.emailPlaceholder}
      />
      <TextField
        secureTextEntry={true}
        value={form.values.password}
        error={form.touched.password ? form.errors.password : undefined}
        onChangeText={(value) => form.setFieldValue('password', value)}
        label={messages.passwordLabel}
        placeholder={messages.passwordPlaceholder}
      />

      <Button
        size="big"
        color="primary"
        title={messages.login}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
