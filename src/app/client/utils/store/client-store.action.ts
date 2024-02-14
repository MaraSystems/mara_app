import { Action } from "@ngrx/store";
import { Client } from "../models/client";
import { NewClient } from "../models/new-client";
import { Update } from "@ngrx/entity";
import { Kin } from "../models/kin";

export enum ClientActionsType {
    REGISTER_CLIENT = "[CLIENT] Register Client",
    REGISTER_CLIENT_SUCCESS = "[CLIENT] Register Client Success",
    REGISTER_CLIENT_FAIL = "[CLIENT] Register Client Fail",

    UPDATE_CLIENT = "[CLIENT] Update Client",
    UPDATE_CLIENT_SUCCESS = "[CLIENT] Update Client Success",
    UPDATE_CLIENT_FAIL = "[CLIENT] Update Client Fail",

    GET_CLIENT = "[CLIENT] Get Client",
    GET_CLIENT_SUCCESS = "[CLIENT] Get Client Success",
    GET_CLIENT_FAIL = "[CLIENT] Get Client Fail",

    LIST_CLIENTS = "[CLIENT] List Clients",
    LIST_CLIENTS_SUCCESS = "[CLIENT] List Clients Success",
    LIST_CLIENTS_FAIL = "[CLIENT] List Clients Fail"
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

export class UpdateClientAction implements Action {
    readonly type = ClientActionsType.UPDATE_CLIENT;
    constructor(public payload: Update<Client>){}
}

export class UpdateClientActionSuccess implements Action {
    readonly type = ClientActionsType.UPDATE_CLIENT_SUCCESS;
    constructor(public payload: Update<Client>){}
}

export class UpdateClientActionFail implements Action {
    readonly type = ClientActionsType.UPDATE_CLIENT_FAIL;
    constructor(public payload: string){}
}

export class GetClientAction implements Action {
    readonly type = ClientActionsType.GET_CLIENT;
    constructor(public payload: string, public auth = false){}
}

export class GetClientActionSuccess implements Action {
    readonly type = ClientActionsType.GET_CLIENT_SUCCESS;
    constructor(public payload: Client, public auth = false){}
}

export class GetClientActionFail implements Action {
    readonly type = ClientActionsType.GET_CLIENT_FAIL;
    constructor(public payload: string){}
}

export class ListClientsAction implements Action {
    readonly type = ClientActionsType.LIST_CLIENTS;
}

export class ListClientsActionSuccess implements Action {
    readonly type = ClientActionsType.LIST_CLIENTS_SUCCESS;
    constructor(public payload: Client[]){}
}

export class ListClientsActionFail implements Action {
    readonly type = ClientActionsType.LIST_CLIENTS_FAIL;
    constructor(public payload: string){}
}

export type ClientAction = 
RegisterClientAction |
RegisterClientActionSuccess |
RegisterClientActionFail |
UpdateClientAction |
UpdateClientActionSuccess |
UpdateClientActionFail |
GetClientAction |
GetClientActionSuccess |
GetClientActionFail;