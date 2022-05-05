import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { validate } from 'rut.js';

@ValidatorConstraint({ name: "IsValidRUT" })
export class IsValidRUT implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return validate(value);
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "El RUT ingresado no es válido";
    }
}