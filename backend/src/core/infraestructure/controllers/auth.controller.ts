import { JsonController, Post, Body, HeaderParam, Get, Req, Param, Redirect, Res } from "routing-controllers";
import { Service } from "typedi";

import { AuthInteractor } from '@application/auth.interactor';
import { CreateUserDTO } from "@domain/user/user.dto";
import { changePasswordDTO, LoginDTO, recoveryPasswordResetDTO, recoveyPasswordDTO } from "@domain/auth/auth.dto";
import { redirectByResponse } from "@bootstrap/Express/redirect.helper";

@Service()
@JsonController("/auth")
export class AuthController {
    constructor(private authInteractor: AuthInteractor) { };

    @Post("/register")
    async createUser(@Req() request: any, @Body() entry: CreateUserDTO) {
        return await this.authInteractor.registerUser(entry, request);
    }

    @Post("/login")
    async login(@Body() entry: LoginDTO) {
        return await this.authInteractor.login(entry);
    }

    @Post("/refresh-token")
    async refreshToken(@HeaderParam("Authorization", { required: true }) token: string) {
        token = token?.replace("Bearer ", "")?.trim();

        return await this.authInteractor.refreshToken(token);
    }

    @Post("/logout")
    async logout(@HeaderParam("Authorization", { required: true }) token: string) {
        token = token?.replace("Bearer ", "")?.trim();

        return await this.authInteractor.logout(token);
    }

    @Post("/change-password")
    async changePasswordlogin(@HeaderParam("Authorization", { required: true }) token: string,
        @Body() entry: changePasswordDTO) {
        token = token?.replace("Bearer ", "")?.trim();

        return await this.authInteractor.changePassword(token, entry.password);
    }

    @Get("/verify/:emailToken")
    async verifyAccount(@Res() response: any, @Param("emailToken") emailToken: string) {
        await this.authInteractor.verifyAccount(emailToken);
        await redirectByResponse(response, "verificated");

        return {};
    }

    @Post("/recoveryPassword/email")
    async requestRecoveryPassword(@Body() entry: recoveyPasswordDTO) {
        return await this.authInteractor.recoveryPasswordEmail(entry.email);
    }

    @Post("/recoveryPassword/reset")
    async resetRecoveryPassword(@Body() entry: recoveryPasswordResetDTO) {
        return await this.authInteractor.recoveryPasswordReset(entry);
    };
}