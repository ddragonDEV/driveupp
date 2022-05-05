import { defineMessages } from 'providers/Language';

export const useMessages = defineMessages({
  save: {
    en: 'Save changes',
    es: 'Guardar cambios',
  },
  nameLabel: {
    en: 'Name',
    es: 'Nombre',
  },
  namePlaceholder: {
    en: 'Enter your name',
    es: 'Escribe tu nombre',
  },
  lastNameLabel: {
    en: 'Last name',
    es: 'Apellido',
  },
  lastNamePlaceholder: {
    en: 'Enter your last name',
    es: 'Escribe tu apellido',
  },
  emailLabel: {
    en: 'E-mail',
    es: 'Correo electronico',
  },
  emailPlaceholder: {
    en: 'Enter your e-mail',
    es: 'Escribe tu correo electrónico',
  },
  rutLabel: {
    en: 'RUT',
    es: 'Registro único tributario',
  },
  rutPlaceholder: {
    en: 'Enter your rut',
    es: 'Escribe tu RUT',
  },
  phoneLabel: {
    en: 'Phone',
    es: 'Numero telefónico',
  },
  phonePlaceholder: {
    en: 'Enter your phone',
    es: 'Escribe tu número telefónico',
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
  updatePasswordLabel: {
    en: 'Update password',
    es: 'Actualizar contraseña',
  },
  requiredError: {
    en: 'Is required',
    es: 'Es requerido',
  },
  emailError: {
    en: 'Invalid e-mail',
    es: 'Correo electrónico inválido',
  },
  rutError: {
    en: 'Invalid RUT',
    es: 'RUT inválido',
  },
  phoneError: {
    en: 'Invalid phone number',
    es: 'Número telefónico inválido',
  },
  passwordError: {
    en: 'Must contain 1 uppercase, 1 lowercase, 1 number, a special character and a minimum of 8 characters',
    es: 'Debe contener 1 mayúscula, 1 minúscula, 1 number,, un carácter especial y un mínimo de 8 caracteres',
  },
  matchError: {
    en: "Passwords don't match",
    es: 'Las contraseñas no coinciden',
  },
  min3Error: {
    en: 'Must contain at least 3 characters',
    es: 'Debe contener al menos 3 caracteres',
  },
  max30Error: {
    en: 'Must contain a maximun of 30 characters',
    es: 'Debe contener un máximo de 30 caracteres',
  },
});
