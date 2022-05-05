"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLocationEntity = exports.GetUsersFilter = exports.UserEdit = exports.UserCreated = exports.UserCreate = exports.UserEntity = exports.RoleFilter = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["user"] = "user";
    Roles["admin"] = "admin";
    Roles["mechanic"] = "mechanic";
})(Roles = exports.Roles || (exports.Roles = {}));
var RoleFilter;
(function (RoleFilter) {
    RoleFilter["user"] = "user";
    RoleFilter["admin"] = "admin";
    RoleFilter["mechanic"] = "mechanic";
    RoleFilter[""] = "";
})(RoleFilter = exports.RoleFilter || (exports.RoleFilter = {}));
class UserEntity {
}
exports.UserEntity = UserEntity;
class UserCreate {
}
exports.UserCreate = UserCreate;
class UserCreated {
}
exports.UserCreated = UserCreated;
class UserEdit {
}
exports.UserEdit = UserEdit;
class GetUsersFilter {
}
exports.GetUsersFilter = GetUsersFilter;
class sendLocationEntity {
}
exports.sendLocationEntity = sendLocationEntity;
