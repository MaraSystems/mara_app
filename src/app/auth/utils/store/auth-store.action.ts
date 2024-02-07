import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { Client } from "src/app/client/utils/models/client";
import { Login } from "../models/login.model";

export enum AuthActionsType {
    GET_PASSWORD_AUTH = "[AUTH] Get Password Auth",
    GET_PASSWORD_AUTH_SUCCESS = "[AUTH] Get Password Auth Success",
    GET_PASSWORD_AUTH_FAIL = "[AUTH] Get Password Auth Fail",

    LOGIN_AUTH = "[AUTH] Login Auth",
    LOGIN_AUTH_SUCCESS = "[AUTH] Login Auth Success",
    LOGIN_AUTH_FAIL = "[AUTH] Login Auth Fail",

    LOGOUT_AUTH = "[AUTH] Logout Auth",
    LOGOUT_AUTH_SUCCESS = "[AUTH] Logout Auth Success",
    LOGOUT_AUTH_FAIL = "[AUTH] Logout Auth Fail"
}


export class GetPasswordAuthAction implements Action {
    readonly type = AuthActionsType.GET_PASSWORD_AUTH;
    constructor(public payload: string){}
}

export class GetPasswordAuthActionSuccess implements Action {
    readonly type = AuthActionsType.GET_PASSWORD_AUTH_SUCCESS;
    constructor(public payload: string){}
}

export class GetPasswordAuthActionFail implements Action {
    readonly type = AuthActionsType.GET_PASSWORD_AUTH_FAIL;
    constructor(public payload: string){}
}

export class LoginAuthAction implements Action {
    readonly type = AuthActionsType.LOGIN_AUTH;
    constructor(public payload: Login){}
}

export class LoginAuthActionSuccess implements Action {
    readonly type = AuthActionsType.LOGIN_AUTH_SUCCESS;
    constructor(public payload: Auth){}
}

export class LoginAuthActionFail implements Action {
    readonly type = AuthActionsType.LOGIN_AUTH_FAIL;
    constructor(public payload: string){}
}

export class LogoutAuthAction implements Action {
    readonly type = AuthActionsType.LOGOUT_AUTH;
}

export class LogoutAuthActionSuccess implements Action {
    readonly type = AuthActionsType.LOGOUT_AUTH_SUCCESS;
}

export class LogoutAuthActionFail implements Action {
    readonly type = AuthActionsType.LOGOUT_AUTH_FAIL;
    constructor(public payload: string){}
}

export type IssuesAction = 
GetPasswordAuthAction |
GetPasswordAuthActionSuccess |
GetPasswordAuthActionFail |
LoginAuthAction |
LoginAuthActionSuccess |
LoginAuthActionFail;