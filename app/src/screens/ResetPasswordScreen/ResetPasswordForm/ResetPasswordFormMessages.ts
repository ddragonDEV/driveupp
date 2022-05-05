import { defineMessages } from 'providers/Language';

export const useMessages = defineMessages({
  resetPassword: {
    en: 'Reset password',
    es: 'Restablecer contraseña',
  },
  emailLabel: {
    en: 'E-mail',
    es: 'Correo electronico',
  },
  emailPlaceholder: {
    en: 'Enter your e-mail',
    es: 'Escribe tu correo electrónico',
  },
  passwordLabel: {
    en: 'Password',
    es: 'Contraseña',
  },
  passwordPlaceholder: {
    en: 'Enter a password',
    es: 'Escribe una contraseña',
  },
  passwordConfirmationLabel: {
    en: 'Password confirmation',
    es: 'Confirmación de contraseña',
  },
  passwordConfirmationPlaceholder: {
    en: 'Enter the password again',
    es: 'Ingresa la contraseña nuevamente',
  },
  pinLabel: {
    en: 'PIN',
    es: 'PIN',
  },
  pinPlaceholder: {
    en: 'Enter the PIN we sent you',
    es: 'Escribe el PIN que te enviamos',
  },
  requiredError: {
    en: 'Is required',
    es: 'Es requerido',
  },
  emailError: {
    en: 'Invalid e-mail',
    es: 'Correo electrónico inválido',
  },
  passwordError: {
    en: 'Must contain 1 uppercase, 1 lowercase, 1 number, a special character and a minimum of 8 characters',
    es: 'Debe contener 1 mayúscula, 1 minúscula, 1 number,, un carácter especial y un mínimo de 8 caracteres',
  },
  matchError: {
    en: "Passwords don't match",
    es: 'Las contraseñas no coinciden',
  },
  pinError: {
    en: 'Must contain 6 digits',
    es: 'Debe contener 6 dígitos',
  },
});
