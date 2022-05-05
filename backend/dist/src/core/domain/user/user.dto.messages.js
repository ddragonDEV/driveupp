"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLocationDTOMessages = exports.deleteUserDTOMessages = exports.getUsersFilterDtoMessages = exports.userDtoMessages = void 0;
exports.userDtoMessages = {
    rutRequired: "El campo rut es obligatorio",
    rutInvalid: "No es un RUT válido",
    emailRequired: "El email es requerido",
    emailInvalid: "No es un email válido",
    nameRequired: "El nombre del usuario es requerido",
    nameLength: "El nombre debe tener mínimo 3 caracteres y máximo 30",
    lastNameRequired: "El apellido del usuario es requerido",
    lastNameLength: "El apellido debe tener mínimo 3 caracteres y máximo 30",
    phoneRequired: "El teléfono es requerido",
    phoneInvalid: "El teléfono es inválido",
    photoRequired: "La imagen del usuario es requerida",
    photoInvalidPattern: "La url enviada como fotografía del usuario no es válida",
    phoneLength: "El teléfono debe estar formado por 12 dígitos",
    passwordInvalidPattern: "La contraseña debe tener al menos una mayúscula, una minúscula, un caracter especial y un número",
    passwordMinLength: "La contraseña debe tener mínimo 8 dígitos",
    passwordRequired: "La contraseña es requerida"
};
exports.getUsersFilterDtoMessages = {
    roleInvalid: "El rol no es válido"
};
exports.deleteUserDTOMessages = {
    idRequired: "El id es requerido",
    idInvalid: "El id no es válido"
};
exports.userLocationDTOMessages = {
    latRequired: "La latitud es requerida",
    latIsNumber: "La latitud es un número",
    lngRequired: "La longitud es requerida",
    lngIsNumber: "La longitud es un número",
};
