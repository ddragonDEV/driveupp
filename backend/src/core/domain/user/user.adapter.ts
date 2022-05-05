import { BaseAdapter } from "@bootstrap/Mongo/utilities/BaseAdapter";
import { Pagination } from "@bootstrap/Mongo/utilities/MongoosePagination";
import { GetUsersFilter, UserCreate, UserEdit, UserEntity } from "./user.entity";

export interface UserAdapter extends BaseAdapter<UserCreate, UserEdit, UserEntity> {
    createMechanic(entry: UserCreate): Promise<UserEntity>;
    getUserByEmail(email: string): Promise<UserEntity>;
    updatePassword(id: string, password: string): Promise<UserEntity>;
    verifyUser(id: string): Promise<UserEntity>;
    getUsers(filter: GetUsersFilter, pagination: Pagination): Promise<any>;
    countUsers(): Promise<any>;
    logicalDelete(id: string, status: boolean): Promise<UserEntity>;
}