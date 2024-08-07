import { Action } from "@ngrx/store";
import { DashboardWidget } from "../models/dashboard-widget";
import { Transaction } from "src/app/transaction/utils/models/transaction.model";
import { SideEffects } from "src/app/general/utils/models/side.effects";
import { Update } from "@ngrx/entity";
import { WalletTransaction } from "../models/wallet-transaction.model";

export enum DashboardActionsType {
    GET_WALLET = "[DASHBOARD] Get Wallet",
    GET_WALLET_SUCCESS = "[DASHBOARD] Get Wallet Success",
    GET_WALLET_FAIL = "[DASHBOARD] Get Wallet Fail",

    UPDATE_WALLET = "[DASHBOARD] Update Wallet",
    UPDATE_WALLET_SUCCESS = "[DASHBOARD] Update Wallet Success",
    UPDATE_WALLET_FAIL = "[DASHBOARD] Update Wallet Fail",
}

export class GetWalletAction implements Action {
    readonly type = DashboardActionsType.GET_WALLET;
    constructor(public payload: string){}
}

export class GetWalletActionSuccess implements Action {
    readonly type = DashboardActionsType.GET_WALLET_SUCCESS;
    constructor(public payload: DashboardWidget<number>){}
}

export class GetWalletActionFail implements Action {
    readonly type = DashboardActionsType.GET_WALLET_FAIL;
    constructor(public payload: string){}
}

export class UpdateWalletAction implements Action {
    readonly type = DashboardActionsType.UPDATE_WALLET;
    constructor(public payload: WalletTransaction, public sideEffects = new SideEffects()){}
}

export class UpdateWalletActionSuccess implements Action {
    readonly type = DashboardActionsType.UPDATE_WALLET_SUCCESS;
    constructor(public payload: Update<DashboardWidget<number>>){}
}

export class UpdateWalletActionFail implements Action {
    readonly type = DashboardActionsType.UPDATE_WALLET_FAIL;
    constructor(public payload: string){}
}

export type DashboardAction =
GetWalletAction |
GetWalletActionSuccess |
GetWalletActionFail |
UpdateWalletAction |
UpdateWalletActionSuccess |
UpdateWalletActionFail;