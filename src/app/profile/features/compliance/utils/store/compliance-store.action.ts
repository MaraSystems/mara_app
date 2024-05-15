import { Compliance } from "src/app/client/utils/models/compliance";
import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { SideEffects } from "src/app/general/utils/models/side.effects";


export enum ComplianceActionsType {
    CREATE_COMPLIANCE = "[COMPLIANCE] Create Compliance",
    CREATE_COMPLIANCE_SUCCESS = "[COMPLIANCE] Create Compliance Success",
    CREATE_COMPLIANCE_FAIL = "[COMPLIANCE] Create Compliance Fail",

    GET_COMPLIANCE = "[COMPLIANCE] Get Compliance",
    GET_COMPLIANCE_SUCCESS = "[COMPLIANCE] Get Compliance Success",
    GET_COMPLIANCE_FAIL = "[COMPLIANCE] Get Compliance Fail",

    LIST_COMPLIANCE = "[COMPLIANCE] List Compliance",
    LIST_COMPLIANCE_SUCCESS = "[COMPLIANCE] List Compliance Success",
    LIST_COMPLIANCE_FAIL = "[COMPLIANCE] List Compliance Fail",

    UPDATE_COMPLIANCE = "[COMPLIANCE] Update Compliance",
    UPDATE_COMPLIANCE_SUCCESS = "[COMPLIANCE] Update Compliance Success",
    UPDATE_COMPLIANCE_FAIL = "[COMPLIANCE] Update Compliance Fail",
}

export class CreateComplianceAction implements Action {
    readonly type = ComplianceActionsType.CREATE_COMPLIANCE;
    constructor(public payload: Compliance, public sideEffects = new SideEffects()){}
}

export class CreateComplianceActionSuccess implements Action {
    readonly type = ComplianceActionsType.CREATE_COMPLIANCE_SUCCESS;
    constructor(public payload: Compliance){}
}

export class CreateComplianceActionFail implements Action {
    readonly type = ComplianceActionsType.CREATE_COMPLIANCE_FAIL;
    constructor(public payload: string){}
}

export class UpdateComplianceAction implements Action {
    readonly type = ComplianceActionsType.UPDATE_COMPLIANCE;
    constructor(public payload: Update<Compliance>, public sideEffects = new SideEffects()){}
}

export class UpdateComplianceActionSuccess implements Action {
    readonly type = ComplianceActionsType.UPDATE_COMPLIANCE_SUCCESS;
    constructor(public payload: Update<Compliance>){}
}

export class UpdateComplianceActionFail implements Action {
    readonly type = ComplianceActionsType.UPDATE_COMPLIANCE_FAIL;
    constructor(public payload: string){}
}

export class GetComplianceAction implements Action {
    readonly type = ComplianceActionsType.GET_COMPLIANCE;
    constructor(public payload: string){}
}

export class GetComplianceActionSuccess implements Action {
    readonly type = ComplianceActionsType.GET_COMPLIANCE_SUCCESS;
    constructor(public payload: Compliance){}
}

export class GetComplianceActionFail implements Action {
    readonly type = ComplianceActionsType.GET_COMPLIANCE_FAIL;
    constructor(public payload: string){}
}

export class ListComplianceAction implements Action {
    readonly type = ComplianceActionsType.LIST_COMPLIANCE;
    constructor(public payload: string){}
}

export class ListComplianceActionSuccess implements Action {
    readonly type = ComplianceActionsType.LIST_COMPLIANCE_SUCCESS;
    constructor(public payload: Compliance[]){}
}

export class ListComplianceActionFail implements Action {
    readonly type = ComplianceActionsType.LIST_COMPLIANCE_FAIL;
    constructor(public payload: string){}
}

export type ComplianceAction = 
CreateComplianceAction |
CreateComplianceActionSuccess |
CreateComplianceActionFail |
UpdateComplianceAction |
UpdateComplianceActionSuccess |
UpdateComplianceActionFail |
GetComplianceAction |
GetComplianceActionSuccess |
GetComplianceActionFail |
ListComplianceAction |
ListComplianceActionSuccess |
ListComplianceActionFail;