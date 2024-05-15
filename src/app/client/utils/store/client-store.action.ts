import { Action } from "@ngrx/store";
import { Client } from "../models/client";
import { Update } from "@ngrx/entity";
import { Kin } from "../models/kin";
import { SideEffects } from "src/app/general/utils/models/side.effects";
import { ListOptions } from "src/app/general/utils/models/list-options";

export enum ClientActionsType {
    CREATE_CLIENT = "[CLIENT] Create Client",
    CREATE_CLIENT_SUCCESS = "[CLIENT] Create Client Success",
    CREATE_CLIENT_FAIL = "[CLIENT] Create Client Fail",

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

export class CreateClientAction implements Action {
    readonly type = ClientActionsType.CREATE_CLIENT;
    constructor(public payload: Client, public sideEffects = new SideEffects()){}
}

export class CreateClientActionSuccess implements Action {
    readonly type = ClientActionsType.CREATE_CLIENT_SUCCESS;
    constructor(public payload: Client){}
}

export class CreateClientActionFail implements Action {
    readonly type = ClientActionsType.CREATE_CLIENT_FAIL;
    constructor(public payload: string){}
}

export class UpdateClientAction implements Action {
    readonly type = ClientActionsType.UPDATE_CLIENT;
    constructor(public payload: Update<Client>, public sideEffects = new SideEffects()){}
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
    constructor(public payload?: any, public aggregation?: any, public options?: ListOptions){}
}

export class ListClientsActionSuccess implements Action {
    readonly type = ClientActionsType.LIST_CLIENTS_SUCCESS;
    constructor(public payload: Client[], public query: any){}
}

export class ListClientsActionFail implements Action {
    readonly type = ClientActionsType.LIST_CLIENTS_FAIL;
    constructor(public payload: string){}
}

export type ClientAction = 
CreateClientAction |
CreateClientActionSuccess |
CreateClientActionFail |
UpdateClientAction |
UpdateClientActionSuccess |
UpdateClientActionFail |
GetClientAction |
GetClientActionSuccess |
GetClientActionFail |
ListClientsAction |
ListClientsActionSuccess |
ListClientsActionFail;