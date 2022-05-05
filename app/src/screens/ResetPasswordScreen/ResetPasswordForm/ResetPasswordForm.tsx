/* eslint-disable radix */
import React from 'react';
import { useMessages } from './ResetPasswordFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './ResetPasswordFormStyles';
import { useForm } from './hooks/useForm';
import { Text } from 'components/Text';

interface Props {
  initialValues: {
    email: string;
  };
}

export const ResetPasswordForm = ({ initialValues }: Props) => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm({ initialValues });

  return (
    <>
      <Text style={styles.email} color="secondary" variant="subtitle">
        {form.values.email}
      </Text>
      <TextField
        secureTextEntry={true}
        value={form.values.password}
        error={form.touched.password ? form.errors.password : undefined}
        onChangeText={(value) => form.setFieldValue('password', value)}
        label={messages.passwordLabel}
        placeholder={messages.passwordPlaceholder}
      />
      <TextField
        secureTextEntry={true}
        value={form.values.passwordConfirmation}
        error={
          form.touched.passwordConfirmation
            ? form.errors.passwordConfirmation
            : undefined
        }
        onChangeText={(value) =>
          form.setFieldValue('passwordConfirmation', value)
        }
        label={messages.passwordConfirmationLabel}
        placeholder={messages.passwordConfirmationPlaceholder}
      />
      <TextField
        value={form.values.pin.toString()}
        error={form.touched.pin ? form.errors.pin : undefined}
        onChangeText={(value) => form.setFieldValue('pin', parseInt(value))}
        label={messages.pinLabel}
        placeholder={messages.pinPlaceholder}
      />

      <Button
        size="big"
        color="primary"
        title={messages.resetPassword}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
