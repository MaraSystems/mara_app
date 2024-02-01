import { Action } from "@ngrx/store";
import { Client } from "../models/client";
import { NewClient } from "../models/new-client";

export enum ClientActionsType {
    REGISTER_CLIENT = "[CLIENT] Register Client",
    REGISTER_CLIENT_SUCCESS = "[CLIENT] Register Client Success",
    REGISTER_CLIENT_FAIL = "[CLIENT] Register Client Fail",
}

export class RegisterClientAction implements Action {
    readonly type = ClientActionsType.REGISTER_CLIENT;
    constructor(public payload: NewClient){}
}

export class RegisterClientActionSuccess implements Action {
    readonly type = ClientActionsType.REGISTER_CLIENT_SUCCESS;
    constructor(public payload: Client){}
}

export class RegisterClientActionFail implements Action {
    readonly type = ClientActionsType.REGISTER_CLIENT_FAIL;
    constructor(public payload: string){}
}

export type IssuesAction = 
RegisterClientAction |
RegisterClientActionSuccess |
RegisterClientActionFail;