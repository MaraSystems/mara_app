import { Action } from "@ngrx/store";
import { User } from "../models/user";
import { Update } from "@ngrx/entity";
import { SideEffects } from "src/app/general/utils/models/side-effects";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { UpdateStr } from "@ngrx/entity/src/models";

export enum UserActionsType {
    CREATE_USER = "[USER] Create User",
    CREATE_USER_SUCCESS = "[USER] Create User Success",
    CREATE_USER_FAIL = "[USER] Create User Fail",

    UPDATE_PROFILE = "[USER] Update Profile",
    UPDATE_PROFILE_SUCCESS = "[USER] Update Profile Success",
    UPDATE_PROFILE_FAIL = "[USER] Update Profile Fail",

    GET_PROFILE = "[USER] Get Profile",
    GET_USER = "[USER] Get User",
    GET_USER_SUCCESS = "[USER] Get User Success",
    GET_USER_FAIL = "[USER] Get User Fail",

    LIST_USERS = "[USER] List Users",
    LIST_USERS_SUCCESS = "[USER] List Users Success",
    LIST_USERS_FAIL = "[USER] List Users Fail"
}

export class CreateUserAction implements Action {
    readonly type = UserActionsType.CREATE_USER;
    constructor(public payload: User, public sideEffects = new SideEffects()){}
}

export class CreateUserActionSuccess implements Action {
    readonly type = UserActionsType.CREATE_USER_SUCCESS;
    constructor(public payload: User){}
}

export class CreateUserActionFail implements Action {
    readonly type = UserActionsType.CREATE_USER_FAIL;
    constructor(public payload: string){}
}

export class UpdateProfileAction implements Action {
    readonly type = UserActionsType.UPDATE_PROFILE;
    constructor(public payload: Partial<User>, public sideEffects = new SideEffects()){}
}

export class UpdateProfileActionSuccess implements Action {
    readonly type = UserActionsType.UPDATE_PROFILE_SUCCESS;
    constructor(public payload: UpdateStr<User>){}
}

export class UpdateProfileActionFail implements Action {
    readonly type = UserActionsType.UPDATE_PROFILE_FAIL;
    constructor(public payload: string){}
}

export class GetProfileAction implements Action {
    readonly type = UserActionsType.GET_PROFILE;
    constructor(public auth = false){}
}

export class GetUserAction implements Action {
    readonly type = UserActionsType.GET_USER;
    constructor(public payload: string, public auth = false){}
}

export class GetUserActionSuccess implements Action {
    readonly type = UserActionsType.GET_USER_SUCCESS;
    constructor(public payload: User, public auth = false){}
}

export class GetUserActionFail implements Action {
    readonly type = UserActionsType.GET_USER_FAIL;
    constructor(public payload: string){}
}

export class ListUsersAction implements Action {
    readonly type = UserActionsType.LIST_USERS;
    constructor(public payload?: any, public options?: ListOptions){}
}

export class ListUsersActionSuccess implements Action {
    readonly type = UserActionsType.LIST_USERS_SUCCESS;
    constructor(public payload: User[], public query: any){}
}

export class ListUsersActionFail implements Action {
    readonly type = UserActionsType.LIST_USERS_FAIL;
    constructor(public payload: string){}
}

export type UserAction =
CreateUserAction |
CreateUserActionSuccess |
CreateUserActionFail |
UpdateProfileAction |
UpdateProfileActionSuccess |
UpdateProfileActionFail |
GetUserAction |
GetUserActionSuccess |
GetUserActionFail |
ListUsersAction |
ListUsersActionSuccess |
ListUsersActionFail;
