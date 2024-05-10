import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Share } from "../models/share.model";
import { ListOptions } from "src/app/general/utils/models/list-options";

export enum ShareActionsType {
    CREATE_SHARE = "[SHARE] Create Share",
    CREATE_SHARE_SUCCESS = "[SHARE] Create Share Success",
    CREATE_SHARE_FAIL = "[SHARE] Create Share Fail",

    UPDATE_SHARE = "[SHARE] Update Share",
    UPDATE_SHARE_SUCCESS = "[SHARE] Update Share Success",
    UPDATE_SHARE_FAIL = "[SHARE] Update Share Fail",

    GET_SHARE = "[SHARE] Get Share",
    GET_SHARE_SUCCESS = "[SHARE] Get Share Success",
    GET_SHARE_FAIL = "[SHARE] Get Share Fail",

    LIST_SHARES = "[SHARE] List Shares",
    LIST_SHARES_SUCCESS = "[SHARE] List Shares Success",
    LIST_SHARES_FAIL = "[SHARE] List Shares Fail",

    DELETE_SHARE = "[SHARE] Delete Share",
    DELETE_SHARE_SUCCESS = "[SHARE] Delete Share Success",
    DELETE_SHARE_FAIL = "[SHARE] Delete Share Fail",
}

export class CreateShareAction implements Action {
    readonly type = ShareActionsType.CREATE_SHARE;
    constructor(public payload: Share){}
}

export class CreateShareActionSuccess implements Action {
    readonly type = ShareActionsType.CREATE_SHARE_SUCCESS;
    constructor(public payload: Share){}
}

export class CreateShareActionFail implements Action {
    readonly type = ShareActionsType.CREATE_SHARE_FAIL;
    constructor(public payload: string){}
}


export class UpdateShareAction implements Action {
    readonly type = ShareActionsType.UPDATE_SHARE;
    constructor(public payload: Update<Partial<Share>>){}
}

export class UpdateShareActionSuccess implements Action {
    readonly type = ShareActionsType.UPDATE_SHARE_SUCCESS;
    constructor(public payload: Update<Share>){}
}

export class UpdateShareActionFail implements Action {
    readonly type = ShareActionsType.UPDATE_SHARE_FAIL;
    constructor(public payload: string){}
}

export class GetShareAction implements Action {
    readonly type = ShareActionsType.GET_SHARE;
    constructor(public payload: string){}
}

export class GetShareActionSuccess implements Action {
    readonly type = ShareActionsType.GET_SHARE_SUCCESS;
    constructor(public payload: Share){}
}

export class GetShareActionFail implements Action {
    readonly type = ShareActionsType.GET_SHARE_FAIL;
    constructor(public payload: string){}
}

export class ListSharesAction implements Action {
    readonly type = ShareActionsType.LIST_SHARES;
    constructor(public model: string, public modelId: string, public payload?: ListOptions){}
}

export class ListSharesActionSuccess implements Action {
    readonly type = ShareActionsType.LIST_SHARES_SUCCESS;
    constructor(public payload: Share[]){}
}

export class ListSharesActionFail implements Action {
    readonly type = ShareActionsType.LIST_SHARES_FAIL;
    constructor(public payload: string){}
}

export class DeleteShareAction implements Action {
    readonly type = ShareActionsType.DELETE_SHARE;
    constructor(public payload: string){}
}

export class DeleteShareActionSuccess implements Action {
    readonly type = ShareActionsType.DELETE_SHARE_SUCCESS;
    constructor(public payload: Share){}
}

export class DeleteShareActionFail implements Action {
    readonly type = ShareActionsType.DELETE_SHARE_FAIL;
    constructor(public payload: string){}
}

export type ShareAction = 
CreateShareAction |
CreateShareActionSuccess |
CreateShareActionFail |
GetShareAction |
GetShareActionSuccess |
GetShareActionFail |
ListSharesAction |
ListSharesActionSuccess |
ListSharesActionFail |
DeleteShareAction |
DeleteShareActionSuccess |
DeleteShareActionFail |
UpdateShareAction |
UpdateShareActionSuccess |
UpdateShareActionFail;