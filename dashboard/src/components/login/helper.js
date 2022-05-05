import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup
        .string()
        .email('Email inválido')
        .max(255, "El email no puede sobrepasar los 255 caracteres")
        .trim()
        .required('El email es requerido'),
    password: Yup
        .string()
        .trim()
        .max(255, "La contraseña no puede sobrepasar los 255 caracteres")
        .required('La contraseña es requerida')
});
