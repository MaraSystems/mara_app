import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { ContractDeliverable } from "../models/contract-deliverable.model";
import { ListPayload } from "src/app/shared/utils/models/list-payload";

export enum ContractDeliverableActionsType {
    CREATE_CONTRACT_DELIVERABLE = "[CONTRACT_DELIVERABLE] Create Contract Deliverable",
    CREATE_CONTRACT_DELIVERABLE_SUCCESS = "[CONTRACT_DELIVERABLE] Create Contract Deliverable Success",
    CREATE_CONTRACT_DELIVERABLE_FAIL = "[CONTRACT_DELIVERABLE] Create Contract Deliverable Fail",

    UPDATE_CONTRACT_DELIVERABLE = "[CONTRACT_DELIVERABLE] Update Contract Deliverable",
    UPDATE_CONTRACT_DELIVERABLE_SUCCESS = "[CONTRACT_DELIVERABLE] Update Contract Deliverable Success",
    UPDATE_CONTRACT_DELIVERABLE_FAIL = "[CONTRACT_DELIVERABLE] Update Contract Deliverable Fail",

    GET_CONTRACT_DELIVERABLE = "[CONTRACT_DELIVERABLE] Get Contract Deliverable",
    GET_CONTRACT_DELIVERABLE_SUCCESS = "[CONTRACT_DELIVERABLE] Get Contract Deliverable Success",
    GET_CONTRACT_DELIVERABLE_FAIL = "[CONTRACT_DELIVERABLE] Get Contract Deliverable Fail",

    LIST_CONTRACT_DELIVERABLES = "[CONTRACT_DELIVERABLE] List Contract Deliverables",
    LIST_CONTRACT_DELIVERABLES_SUCCESS = "[CONTRACT_DELIVERABLE] List Contract Deliverables Success",
    LIST_CONTRACT_DELIVERABLES_FAIL = "[CONTRACT_DELIVERABLE] List Contract Deliverables Fail"
}

export class CreateContractDeliverableAction implements Action {
    readonly type = ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE;
    constructor(public payload: ContractDeliverable){}
}

export class CreateContractDeliverableActionSuccess implements Action {
    readonly type = ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE_SUCCESS;
    constructor(public payload: ContractDeliverable){}
}

export class CreateContractDeliverableActionFail implements Action {
    readonly type = ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class UpdateContractDeliverableAction implements Action {
    readonly type = ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE;
    constructor(public payload: Update<ContractDeliverable>, public contractId: string){}
}

export class UpdateContractDeliverableActionSuccess implements Action {
    readonly type = ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE_SUCCESS;
    constructor(public payload: Update<ContractDeliverable>){}
}

export class UpdateContractDeliverableActionFail implements Action {
    readonly type = ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class GetContractDeliverableAction implements Action {
    readonly type = ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE;
    constructor(public payload: string){}
}

export class GetContractDeliverableActionSuccess implements Action {
    readonly type = ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE_SUCCESS;
    constructor(public payload: ContractDeliverable){}
}

export class GetContractDeliverableActionFail implements Action {
    readonly type = ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class ListContractDeliverablesAction implements Action {
    readonly type = ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES;
    constructor(public payload: ListPayload, public contractId: string){}
}

export class ListContractDeliverablesActionSuccess implements Action {
    readonly type = ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES_SUCCESS;
    constructor(public payload: ContractDeliverable[]){}
}

export class ListContractDeliverablesActionFail implements Action {
    readonly type = ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES_FAIL;
    constructor(public payload: string){}
}

export type ContractDeliverableAction = 
CreateContractDeliverableAction |
CreateContractDeliverableActionSuccess |
CreateContractDeliverableActionFail |
UpdateContractDeliverableAction |
UpdateContractDeliverableActionSuccess |
UpdateContractDeliverableActionFail |
GetContractDeliverableAction |
GetContractDeliverableActionSuccess |
GetContractDeliverableActionFail;