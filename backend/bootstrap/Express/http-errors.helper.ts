const httpErrors = {
    400: "Los datos enviados tienen errores",
    401: "El usuario o contraseña son incorrectos",
    403: "Operación no permitida para el usuario",
    404: "Recurso no encontrado",
    409: "Recurso creado con anterioridad",
    410: "Recurso borrado previamente",
    500: "Ha ocurrido un problema en el servidor"
};

export const httpErrorMessage = (httpCode: number): string => {
    return httpErrors[httpCode] || httpErrors[500];
};

export const getValidationErrors = (errors: {}[]): string[] | undefined => {
    const errorsAuxList: any[] = [];
    if (!!errors && Array.isArray(errors)) {
        errors.map((error) => {
            if (!!error["constraints"]) {
                errorsAuxList.push(Object.values(error["constraints"]));
            }
        });
    }

    return errorsAuxList.length > 0 ? errorsAuxList.flat() : undefined;
};