import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { useMessages } from './EditProfileFormMessages';
import { TextField } from 'components/TextField';
import { Button } from 'components/Button';
import { useStyles } from './EditProfileFormStyles';
import { useForm } from './hooks/useForm';
import { View } from 'react-native';
import { Text } from 'components/Text';
import { ImagePicker } from 'components/ImagePicker';

export const EditProfileForm = () => {
  const messages = useMessages();
  const styles = useStyles();

  const form = useForm();

  return (
    <>
      <View style={styles.imagePicker}>
        <ImagePicker
          value={form.values.photo}
          setValue={(value) => {
            form.setFieldValue('localPhoto', true);
            form.setFieldValue('photo', value);
          }}
        />
      </View>
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

      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={form.values.updatePassword}
          onValueChange={(value: boolean) =>
            form.setFieldValue('updatePassword', value)
          }
          style={styles.checkBox}
        />
        <Text color="text2">{messages.updatePasswordLabel}</Text>
      </View>

      <TextField
        disabled={!form.values.updatePassword}
        secureTextEntry={true}
        value={form.values.password}
        error={form.touched.password ? form.errors.password : undefined}
        onChangeText={(value) => form.setFieldValue('password', value)}
        label={messages.passwordLabel}
        placeholder={messages.passwordPlaceholder}
      />
      <TextField
        disabled={!form.values.updatePassword}
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
        title={messages.save}
        style={styles.submitButton}
        onPress={form.submitForm}
      />
    </>
  );
};
