import { defineMessages } from 'providers/Language';

const wrongDataMessageObject = {
  en: 'Wrong e-mail or password',
  es: 'Correo electrónico o contraseña incorrecta',
};

export const useLoginMessages = defineMessages({
  400: wrongDataMessageObject,
  401: wrongDataMessageObject,
  404: wrongDataMessageObject,
  430: {
    en: "You haven't confirmed your e-mail",
    es: 'No has confirmado tu correo electrónico',
  },
});

export const useSignUpMessages = defineMessages({
  409: {
    en: 'Previously registered e-mail',
    es: 'Correo electrónico registrado anteriormente',
  },
  emailSent: {
    en: 'We have sent you a confirmation e-mail, please, open it and follow the instructions.',
    es: 'Le hemos enviado un correo electrónico de confirmación, por favor, ábralo y siga las instrucciones.',
  },
  accept: {
    en: 'Accept',
    es: 'Aceptar',
  },
});

export const useResetPasswordMessages = defineMessages({
  404: {
    en: 'Incorrect or expired pin',
    es: 'PIN incorrecto o caducado',
  },
  401: {
    en: 'The password is the same as before',
    es: 'La contraseña es la misma que antes',
  },
  success: {
    en: 'The password has been changed successfully',
    es: 'La contraseña ha sido cambiada satisfactoriamente',
  },
  accept: {
    en: 'Accept',
    es: 'Aceptar',
  },
});

export const useRecoveryPasswordMessages = defineMessages({
  404: {
    en: 'This e-mail is not registered yet',
    es: 'Este correo electrónico no está registrado aún',
  },
});
