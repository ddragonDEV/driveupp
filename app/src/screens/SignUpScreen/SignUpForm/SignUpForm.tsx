import React from 'react';
import { useMessages } from './SignUpFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './SignUpFormStyles';
import { useForm } from './hooks/useForm';
import { View } from 'react-native';
import { Text } from 'components/Text';

export const SignUpForm = () => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm();

  return (
    <>
      <TextField
        autoCapitalize="words"
        value={form.values.name}
        error={form.touched.name ? form.errors.name : undefined}
        onChangeText={(value) => form.setFieldValue('name', value)}
        label={messages.nameLabel}
        placeholder={messages.namePlaceholder}
      />
      <TextField
        autoCapitalize="words"
        value={form.values.lastName}
        error={form.touched.lastName ? form.errors.lastName : undefined}
        onChangeText={(value) => form.setFieldValue('lastName', value)}
        label={messages.lastNameLabel}
        placeholder={messages.lastNamePlaceholder}
      />
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
        keyboardType="numeric"
        value={form.values.rut}
        error={form.touched.rut ? form.errors.rut : undefined}
        onChangeText={(value) => form.setFieldValue('rut', value, false)}
        label={messages.rutLabel}
        placeholder={messages.rutPlaceholder}
      />
      <View style={styles.phoneFieldContainer}>
        <Text style={styles.phoneCode} variant="title" color="text2">
          +56
        </Text>
        <TextField
          containerProps={{
            style: styles.phoneField,
          }}
          keyboardType="phone-pad"
          value={form.values.phone.substring(3)}
          error={form.touched.phone ? form.errors.phone : undefined}
          onChangeText={(value) =>
            form.setFieldValue('phone', `+56${value.replace(/\D/g, '')}`)
          }
          label={messages.phoneLabel}
          placeholder={messages.phonePlaceholder}
        />
      </View>
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

      <Button
        size="big"
        color="primary"
        title={messages.signUp}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
