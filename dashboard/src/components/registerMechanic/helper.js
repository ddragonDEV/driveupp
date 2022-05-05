import { passwordRegex } from 'src/helpers/commonRegex';
import * as Yup from 'yup';

export const initialValues = {
    phone: "",
    rut: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
};


export const getValidationSchema = () =>
    Yup.object({
        phone: Yup
            .string()
            .min(12, "Teléfono inválido")
            .required("El teléfono es requerido"),
        email: Yup
            .string()
            .email('No es un email válido')
            .max(255)
            .required('El email es requerido'),
        rut: Yup
            .string()
            .max(255)
            .required('El rut es requerido'),
        name: Yup
            .string()
            .max(255)
            .required('El nombre es requerido'),
        lastName: Yup
            .string()
            .max(255)
            .required('El apellido es requerido'),
        password: Yup
            .string()
            .max(255)
            .min(8, "La contraseña debe tener al menos 8 digitos")
            .matches(passwordRegex, "La contraseña debe tener al menos una mayúscula, una minúscula, un caracter especial y 8 caracteres")
            .required('La contraseña es requerida')
    });