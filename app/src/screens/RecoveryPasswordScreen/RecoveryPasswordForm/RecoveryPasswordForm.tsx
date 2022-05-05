import React, { FC } from 'react';
import { useMessages } from './RecoveryPasswordFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './RecoveryPasswordFormStyles';
import { useForm } from './hooks/useForm';

interface Props {
  initialValues: {
    email: string;
  };
}

export const RecoveryPasswordForm: FC<Props> = ({ initialValues }) => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm({ initialValues });

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

      <Button
        size="big"
        color="primary"
        title={messages.recovery}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
