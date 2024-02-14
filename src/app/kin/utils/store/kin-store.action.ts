import { Kin } from "src/app/client/utils/models/kin";
import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";


export enum KinActionsType {
    CREATE_KIN = "[KIN] Create Kin",
    CREATE_KIN_SUCCESS = "[KIN] Create Kin Success",
    CREATE_KIN_FAIL = "[KIN] Create Kin Fail",

    GET_KIN = "[KIN] Get Kin",
    GET_KIN_SUCCESS = "[KIN] Get Kin Success",
    GET_KIN_FAIL = "[KIN] Get Kin Fail",

    UPDATE_KIN = "[KIN] Update Kin",
    UPDATE_KIN_SUCCESS = "[KIN] Update Kin Success",
    UPDATE_KIN_FAIL = "[KIN] Update Kin Fail",
}

export class CreateKinAction implements Action {
    readonly type = KinActionsType.CREATE_KIN;
    constructor(public payload: Kin){}
}

export class CreateKinActionSuccess implements Action {
    readonly type = KinActionsType.CREATE_KIN_SUCCESS;
    constructor(public payload: Kin){}
}

export class CreateKinActionFail implements Action {
    readonly type = KinActionsType.CREATE_KIN_FAIL;
    constructor(public payload: string){}
}

export class UpdateKinAction implements Action {
    readonly type = KinActionsType.UPDATE_KIN;
    constructor(public payload: Update<Kin>){}
}

export class UpdateKinActionSuccess implements Action {
    readonly type = KinActionsType.UPDATE_KIN_SUCCESS;
    constructor(public payload: Update<Kin>){}
}

export class UpdateKinActionFail implements Action {
    readonly type = KinActionsType.UPDATE_KIN_FAIL;
    constructor(public payload: string){}
}

export class GetKinAction implements Action {
    readonly type = KinActionsType.GET_KIN;
    constructor(public payload: string){}
}

export class GetKinActionSuccess implements Action {
    readonly type = KinActionsType.GET_KIN_SUCCESS;
    constructor(public payload: Kin){}
}

export class GetKinActionFail implements Action {
    readonly type = KinActionsType.GET_KIN_FAIL;
    constructor(public payload: string){}
}

export type KinAction = 
CreateKinAction |
CreateKinActionSuccess |
CreateKinActionFail |
UpdateKinAction |
UpdateKinActionSuccess |
UpdateKinActionFail |
GetKinAction |
GetKinActionSuccess |
GetKinActionFail;