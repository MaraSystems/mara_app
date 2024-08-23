import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Revision } from "../models/revision";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { SideEffects } from "src/app/general/utils/models/side-effects";

export enum RevisionActionsType {
    CREATE_REVISION = "[REVISION] Create Revision",
    CREATE_REVISION_SUCCESS = "[REVISION] Create Revision Success",
    CREATE_REVISION_FAIL = "[REVISION] Create Revision Fail",

    UPDATE_REVISION = "[REVISION] Update Revision",
    UPDATE_REVISION_SUCCESS = "[REVISION] Update Revision Success",
    UPDATE_REVISION_FAIL = "[REVISION] Update Revision Fail",

    GET_REVISION = "[REVISION] Get Revision",
    GET_REVISION_SUCCESS = "[REVISION] Get Revision Success",
    GET_REVISION_FAIL = "[REVISION] Get Revision Fail",

    LIST_REVISIONS = "[REVISION] List Revisions",
    LIST_REVISIONS_SUCCESS = "[REVISION] List Revisions Success",
    LIST_REVISIONS_FAIL = "[REVISION] List Revisions Fail"
}

export class CreateRevisionAction implements Action {
    readonly type = RevisionActionsType.CREATE_REVISION;
    constructor(public payload: Partial<Revision>, public sideEffects = new SideEffects()){}
}

export class CreateRevisionActionSuccess implements Action {
    readonly type = RevisionActionsType.CREATE_REVISION_SUCCESS;
    constructor(public payload: Revision){}
}

export class CreateRevisionActionFail implements Action {
    readonly type = RevisionActionsType.CREATE_REVISION_FAIL;
    constructor(public payload: string){}
}

export class UpdateRevisionAction implements Action {
    readonly type = RevisionActionsType.UPDATE_REVISION;
    constructor(public payload: Update<Revision>,  public sideEffects = new SideEffects()){}
}

export class UpdateRevisionActionSuccess implements Action {
    readonly type = RevisionActionsType.UPDATE_REVISION_SUCCESS;
    constructor(public payload: Update<Revision>){}
}

export class UpdateRevisionActionFail implements Action {
    readonly type = RevisionActionsType.UPDATE_REVISION_FAIL;
    constructor(public payload: string){}
}

export class GetRevisionAction implements Action {
    readonly type = RevisionActionsType.GET_REVISION;
    constructor(public payload: string){}
}

export class GetRevisionActionSuccess implements Action {
    readonly type = RevisionActionsType.GET_REVISION_SUCCESS;
    constructor(public payload: Revision){}
}

export class GetRevisionActionFail implements Action {
    readonly type = RevisionActionsType.GET_REVISION_FAIL;
    constructor(public payload: string){}
}

export class ListRevisionsAction implements Action {
    readonly type = RevisionActionsType.LIST_REVISIONS;
    constructor(public contractId: string, public payload?: ListOptions){}
}

export class ListRevisionsActionSuccess implements Action {
    readonly type = RevisionActionsType.LIST_REVISIONS_SUCCESS;
    constructor(public payload: Revision[]){}
}

export class ListRevisionsActionFail implements Action {
    readonly type = RevisionActionsType.LIST_REVISIONS_FAIL;
    constructor(public payload: string){}
}

export type RevisionAction = 
CreateRevisionAction |
CreateRevisionActionSuccess |
CreateRevisionActionFail |
UpdateRevisionAction |
UpdateRevisionActionSuccess |
UpdateRevisionActionFail |
GetRevisionAction |
GetRevisionActionSuccess |
GetRevisionActionFail;