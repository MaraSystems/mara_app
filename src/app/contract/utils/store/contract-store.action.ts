import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Contract, ContractRequest } from "../models/contract.model";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { SideEffects } from "src/app/general/utils/models/side.effects";

export enum ContractActionsType {
    CREATE_CONTRACT = "[CONTRACT] Create Contract",
    CREATE_CONTRACT_SUCCESS = "[CONTRACT] Create Contract Success",
    CREATE_CONTRACT_FAIL = "[CONTRACT] Create Contract Fail",

    UPDATE_CONTRACT = "[CONTRACT] Update Contract",
    UPDATE_CONTRACT_SUCCESS = "[CONTRACT] Update Contract Success",
    UPDATE_CONTRACT_FAIL = "[CONTRACT] Update Contract Fail",

    GET_CONTRACT = "[CONTRACT] Get Contract",
    GET_CONTRACT_SUCCESS = "[CONTRACT] Get Contract Success",
    GET_CONTRACT_FAIL = "[CONTRACT] Get Contract Fail",

    LIST_CONTRACTS = "[CONTRACT] List Contracts",
    LIST_CONTRACTS_SUCCESS = "[CONTRACT] List Contracts Success",
    LIST_CONTRACTS_FAIL = "[CONTRACT] List Contracts Fail"
}

export class CreateContractAction implements Action {
    readonly type = ContractActionsType.CREATE_CONTRACT;
    constructor(public payload: ContractRequest, public sideEffects = new SideEffects()){}
}

export class CreateContractActionSuccess implements Action {
    readonly type = ContractActionsType.CREATE_CONTRACT_SUCCESS;
    constructor(public payload: Contract){}
}

export class CreateContractActionFail implements Action {
    readonly type = ContractActionsType.CREATE_CONTRACT_FAIL;
    constructor(public payload: string){}
}

export class UpdateContractAction implements Action {
    readonly type = ContractActionsType.UPDATE_CONTRACT;
    constructor(public payload: Update<Contract>, public sideEffects = new SideEffects()){}
}

export class UpdateContractActionSuccess implements Action {
    readonly type = ContractActionsType.UPDATE_CONTRACT_SUCCESS;
    constructor(public payload: Update<Contract>){}
}

export class UpdateContractActionFail implements Action {
    readonly type = ContractActionsType.UPDATE_CONTRACT_FAIL;
    constructor(public payload: string){}
}

export class GetContractAction implements Action {
    readonly type = ContractActionsType.GET_CONTRACT;
    constructor(public payload: string){}
}

export class GetContractActionSuccess implements Action {
    readonly type = ContractActionsType.GET_CONTRACT_SUCCESS;
    constructor(public payload: Contract){}
}

export class GetContractActionFail implements Action {
    readonly type = ContractActionsType.GET_CONTRACT_FAIL;
    constructor(public payload: string){}
}

export class ListContractsAction implements Action {
    readonly type = ContractActionsType.LIST_CONTRACTS;
    constructor(public userId: string, public payload: ListOptions){}
}

export class ListContractsActionSuccess implements Action {
    readonly type = ContractActionsType.LIST_CONTRACTS_SUCCESS;
    constructor(public payload: Contract[]){}
}

export class ListContractsActionFail implements Action {
    readonly type = ContractActionsType.LIST_CONTRACTS_FAIL;
    constructor(public payload: string){}
}

export type ContractAction = 
CreateContractAction |
CreateContractActionSuccess |
CreateContractActionFail |
UpdateContractAction |
UpdateContractActionSuccess |
UpdateContractActionFail |
GetContractAction |
GetContractActionSuccess |
GetContractActionFail;