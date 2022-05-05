import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsPositive, Matches, MinLength } from "class-validator";
import { passwordRegex } from "../../../shared/helpers/commonRegex";
import { LoginDtoMessages } from "./auth.dto.messages";

export class LoginDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.emailRequired })
    @IsEmail({ message: LoginDtoMessages.emailInvalid })
    email: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.passwordRequired })
    @MinLength(8, { message: LoginDtoMessages.passwordMinLength })
    password: string;
}


export class changePasswordDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.passwordRequired })
    @Matches(passwordRegex, { message: LoginDtoMessages.passwordInvalidPattern })
    @MinLength(8, { message: LoginDtoMessages.passwordMinLength })
    password: string;
}

export class recoveyPasswordDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.emailRequired })
    @IsEmail({ message: LoginDtoMessages.emailInvalid })
    email: string;
}

export class recoveryPasswordResetDTO {
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.emailRequired })
    @IsEmail({ message: LoginDtoMessages.emailInvalid })
    email: string;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: LoginDtoMessages.passwordRequired })
    @Matches(passwordRegex, { message: LoginDtoMessages.passwordInvalidPattern })
    @MinLength(8, { message: LoginDtoMessages.passwordMinLength })
    password: string;

    @IsNotEmpty({ message: LoginDtoMessages.pinRequired })
    @IsPositive({ message: LoginDtoMessages.pinPositiveNumber })
    pin: number;
}