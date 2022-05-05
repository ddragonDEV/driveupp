import { Authorized, Body, CurrentUser, JsonController, Post, Req } from "routing-controllers";
import { Service } from "typedi";

import { UserInteractor } from "@application/user.interactor";
import { CreateUserDTO, UserIdDTO, GetUserFilterDTO, UserLocationDTO, UpdateUserDTO, UserIdStatusDTO } from "@domain/user/user.dto";
import { Roles, UserEntity } from "@domain/user/user.entity";

@Service()
@JsonController("/user")
export class UserController {
    constructor(private authInteractor: UserInteractor) { };

    @Post("/update")
    @Authorized([Roles.user, Roles.mechanic, Roles.admin])
    async updateUser(@CurrentUser({ required: true }) user: UserEntity, @Body() entry: UpdateUserDTO) {
        return await this.authInteractor.updateUser(user, entry);
    }

    @Post("/mechanic")
    @Authorized([Roles.admin])
    async registerMechanic(@Req() request: any, @Body() user: CreateUserDTO) {
        return await this.authInteractor.createMechanic(request, user);
    }

    @Post("/disable")
    @Authorized([Roles.admin])
    async deleteUser(@CurrentUser({ required: true }) user: UserEntity, @Body() userToDelete: UserIdStatusDTO) {
        return await this.authInteractor.deleteUser(user, userToDelete._id, userToDelete.deleted);
    }

    @Post("/all")
    @Authorized([Roles.admin])
    async getUsers(@Body() filter: GetUserFilterDTO) {
        return await this.authInteractor.getUsersFilters(filter);
    }

    @Post("/get-by-id")
    @Authorized([Roles.user, Roles.mechanic, Roles.admin])
    async getUserById(@Body() data: UserIdDTO) {
        return await this.authInteractor.getUserById(data._id);
    }

    @Post("/current-assistance/send-location")
    @Authorized([Roles.user, Roles.mechanic])
    async sendLocation(@CurrentUser({ required: true }) user: UserEntity, @Body() data: UserLocationDTO) {
        return await this.authInteractor.sendLocation(user, data);
    }
}