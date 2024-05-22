import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Bank } from "../models/bank.model";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { SideEffects } from "src/app/general/utils/models/side.effects";

export enum BankActionsType {
    CREATE_BANK = "[BANK] Create Bank",
    CREATE_BANK_SUCCESS = "[BANK] Create Bank Success",
    CREATE_BANK_FAIL = "[BANK] Create Bank Fail",

    UPDATE_BANK = "[BANK] Update Bank",
    UPDATE_BANK_SUCCESS = "[BANK] Update Bank Success",
    UPDATE_BANK_FAIL = "[BANK] Update Bank Fail",

    GET_BANK = "[BANK] Get Bank",
    GET_BANK_SUCCESS = "[BANK] Get Bank Success",
    GET_BANK_FAIL = "[BANK] Get Bank Fail",

    LIST_BANKS = "[BANK] List Banks",
    LIST_BANKS_SUCCESS = "[BANK] List Banks Success",
    LIST_BANKS_FAIL = "[BANK] List Banks Fail",

    DELETE_BANK = "[BANK] Delete Bank",
    DELETE_BANK_SUCCESS = "[BANK] Delete Bank Success",
    DELETE_BANK_FAIL = "[BANK] Delete Bank Fail",
}

export class CreateBankAction implements Action {
    readonly type = BankActionsType.CREATE_BANK;
    constructor(public payload: Bank, public sideEffects = new SideEffects()){}
}

export class CreateBankActionSuccess implements Action {
    readonly type = BankActionsType.CREATE_BANK_SUCCESS;
    constructor(public payload: Bank){}
}

export class CreateBankActionFail implements Action {
    readonly type = BankActionsType.CREATE_BANK_FAIL;
    constructor(public payload: string){}
}

export class UpdateBankAction implements Action {
    readonly type = BankActionsType.UPDATE_BANK;
    constructor(public payload: Update<Bank>, public sideEffects = new SideEffects()){}
}

export class UpdateBankActionSuccess implements Action {
    readonly type = BankActionsType.UPDATE_BANK_SUCCESS;
    constructor(public payload: Update<Bank>){}
}

export class UpdateBankActionFail implements Action {
    readonly type = BankActionsType.UPDATE_BANK_FAIL;
    constructor(public payload: string){}
}

export class GetBankAction implements Action {
    readonly type = BankActionsType.GET_BANK;
    constructor(public payload: string){}
}

export class GetBankActionSuccess implements Action {
    readonly type = BankActionsType.GET_BANK_SUCCESS;
    constructor(public payload: Bank){}
}

export class GetBankActionFail implements Action {
    readonly type = BankActionsType.GET_BANK_FAIL;
    constructor(public payload: string){}
}

export class ListBanksAction implements Action {
    readonly type = BankActionsType.LIST_BANKS;
    constructor(public payload: ListOptions){}
}

export class ListBanksActionSuccess implements Action {
    readonly type = BankActionsType.LIST_BANKS_SUCCESS;
    constructor(public payload: Bank[]){}
}

export class ListBanksActionFail implements Action {
    readonly type = BankActionsType.LIST_BANKS_FAIL;
    constructor(public payload: string){}
}

export class DeleteBankAction implements Action {
    readonly type = BankActionsType.DELETE_BANK;
    constructor(public payload: string){}
}

export class DeleteBankActionSuccess implements Action {
    readonly type = BankActionsType.DELETE_BANK_SUCCESS;
    constructor(public payload: Bank){}
}

export class DeleteBankActionFail implements Action {
    readonly type = BankActionsType.DELETE_BANK_FAIL;
    constructor(public payload: string){}
}

export type BankAction =
CreateBankAction |
CreateBankActionSuccess |
CreateBankActionFail |
UpdateBankAction |
UpdateBankActionSuccess |
UpdateBankActionFail |
GetBankAction |
GetBankActionSuccess |
GetBankActionFail |
ListBanksAction |
ListBanksActionSuccess |
ListBanksActionFail |
DeleteBankAction |
DeleteBankActionSuccess |
DeleteBankActionFail;