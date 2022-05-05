import { Exclude, Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { passwordRegex, urlRegex } from "../../../shared/helpers/commonRegex";
import { IsValidRUT } from "../../../../bootstrap/Express/validators/isValidRUT.validator";
import { deleteUserDTOMessages, getUsersFilterDtoMessages, userDtoMessages, userLocationDTOMessages } from './user.dto.messages';
import { RoleFilter } from "./user.entity";


export class CreateUserDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.rutRequired })
    @Validate(IsValidRUT, { message: userDtoMessages.rutInvalid })
    rut: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.emailRequired })
    @IsEmail({ message: userDtoMessages.emailInvalid })
    email: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.nameRequired })
    @MinLength(3, { message: userDtoMessages.nameLength })
    @MaxLength(30, { message: userDtoMessages.nameLength })
    name: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.lastNameRequired })
    @MinLength(3, { message: userDtoMessages.lastNameLength })
    @MaxLength(30, { message: userDtoMessages.lastNameLength })
    lastName: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.phoneRequired })
    @IsNumberString({ message: userDtoMessages.phoneInvalid })
    @MaxLength(14, { message: userDtoMessages.phoneLength })
    phone: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.passwordRequired })
    @Matches(passwordRegex, { message: userDtoMessages.passwordInvalidPattern })
    @MinLength(8, { message: userDtoMessages.passwordMinLength })
    password: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @Matches(urlRegex, { message: userDtoMessages.photoInvalidPattern })
    photo: string;

    @Exclude()
    role: string;

    @Exclude()
    verifiedAccount: Boolean;

    @Exclude()
    deleted: Boolean;
    @Exclude()
    scoreAverage: Number;
    @Exclude()
    scoreCount: Number;
    @Exclude()
    scorePoints: Number;
}

export class UpdateUserDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.emailRequired })
    @IsEmail({ message: userDtoMessages.emailInvalid })
    email: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.nameRequired })
    @MinLength(3, { message: userDtoMessages.nameLength })
    @MaxLength(30, { message: userDtoMessages.nameLength })
    name: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.lastNameRequired })
    @MinLength(3, { message: userDtoMessages.lastNameLength })
    @MaxLength(30, { message: userDtoMessages.lastNameLength })
    lastName: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.phoneRequired })
    @IsNumberString({ message: userDtoMessages.phoneInvalid })
    @MaxLength(14, { message: userDtoMessages.phoneLength })
    phone: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: userDtoMessages.passwordRequired })
    @Matches(passwordRegex, { message: userDtoMessages.passwordInvalidPattern })
    @MinLength(8, { message: userDtoMessages.passwordMinLength })
    password: string;

    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @Matches(urlRegex, { message: userDtoMessages.photoInvalidPattern })
    photo: string;

    @Exclude()
    rut: string;
    @Exclude()
    role: string;
    @Exclude()
    verifiedAccount: Boolean;
    @Exclude()
    deleted: Boolean;
    @Exclude()
    scoreAverage: Number;
    @Exclude()
    scoreCount: Number;
    @Exclude()
    scorePoints: Number;
}

export class GetUserFilterDTO {
    @IsEnum(RoleFilter, { message: getUsersFilterDtoMessages.roleInvalid })
    role: string;
    name: string;
    page: number;
    rowsPerPage: number;
}

export class UserIdDTO {
    @IsNotEmpty({ message: deleteUserDTOMessages.idRequired })
    @IsMongoId({ message: deleteUserDTOMessages.idInvalid })
    _id: string;
}

export class UserIdStatusDTO {
    @IsNotEmpty({ message: deleteUserDTOMessages.idRequired })
    @IsMongoId({ message: deleteUserDTOMessages.idInvalid })
    _id: string;

    @IsNotEmpty({ message: "El estatus  del usuario es requerido" })
    @IsBoolean({ message: "El campo es un booleano" })
    deleted: boolean;
}

export class UserLocationDTO {
    @IsNotEmpty({ message: userLocationDTOMessages.latRequired })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: userLocationDTOMessages.latIsNumber })
    latitude: number;

    @IsNotEmpty({ message: userLocationDTOMessages.lngRequired })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: userLocationDTOMessages.lngIsNumber })
    longitude: number;
}