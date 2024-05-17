import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Transaction } from "../models/transaction.model";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { SideEffects } from "src/app/general/utils/models/side.effects";

export enum TransactionActionsType {
    UPDATE_TRANSACTION = "[TRANSACTION] Update Transaction",
    UPDATE_TRANSACTION_SUCCESS = "[TRANSACTION] Update Transaction Success",
    UPDATE_TRANSACTION_FAIL = "[TRANSACTION] Update Transaction Fail",

    GET_TRANSACTION = "[TRANSACTION] Get Transaction",
    GET_TRANSACTION_SUCCESS = "[TRANSACTION] Get Transaction Success",
    GET_TRANSACTION_FAIL = "[TRANSACTION] Get Transaction Fail",

    LIST_TRANSACTIONS = "[TRANSACTION] List Transactions",
    LIST_TRANSACTIONS_SUCCESS = "[TRANSACTION] List Transactions Success",
    LIST_TRANSACTIONS_FAIL = "[TRANSACTION] List Transactions Fail",

    DELETE_TRANSACTION = "[TRANSACTION] Delete Transaction",
    DELETE_TRANSACTION_SUCCESS = "[TRANSACTION] Delete Transaction Success",
    DELETE_TRANSACTION_FAIL = "[TRANSACTION] Delete Transaction Fail",
}

export class UpdateTransactionAction implements Action {
    readonly type = TransactionActionsType.UPDATE_TRANSACTION;
    constructor(public payload: Update<Transaction>, public sideEffects = new SideEffects()){}
}

export class UpdateTransactionActionSuccess implements Action {
    readonly type = TransactionActionsType.UPDATE_TRANSACTION_SUCCESS;
    constructor(public payload: Update<Transaction>){}
}

export class UpdateTransactionActionFail implements Action {
    readonly type = TransactionActionsType.UPDATE_TRANSACTION_FAIL;
    constructor(public payload: string){}
}

export class GetTransactionAction implements Action {
    readonly type = TransactionActionsType.GET_TRANSACTION;
    constructor(public payload: string){}
}

export class GetTransactionActionSuccess implements Action {
    readonly type = TransactionActionsType.GET_TRANSACTION_SUCCESS;
    constructor(public payload: Transaction){}
}

export class GetTransactionActionFail implements Action {
    readonly type = TransactionActionsType.GET_TRANSACTION_FAIL;
    constructor(public payload: string){}
}

export class ListTransactionsAction implements Action {
    readonly type = TransactionActionsType.LIST_TRANSACTIONS;
    constructor(public payload: ListOptions){}
}

export class ListTransactionsActionSuccess implements Action {
    readonly type = TransactionActionsType.LIST_TRANSACTIONS_SUCCESS;
    constructor(public payload: Transaction[]){}
}

export class ListTransactionsActionFail implements Action {
    readonly type = TransactionActionsType.LIST_TRANSACTIONS_FAIL;
    constructor(public payload: string){}
}

export class DeleteTransactionAction implements Action {
    readonly type = TransactionActionsType.DELETE_TRANSACTION;
    constructor(public payload: string){}
}

export class DeleteTransactionActionSuccess implements Action {
    readonly type = TransactionActionsType.DELETE_TRANSACTION_SUCCESS;
    constructor(public payload: Transaction){}
}

export class DeleteTransactionActionFail implements Action {
    readonly type = TransactionActionsType.DELETE_TRANSACTION_FAIL;
    constructor(public payload: string){}
}

export type TransactionAction =
UpdateTransactionAction |
UpdateTransactionActionSuccess |
UpdateTransactionActionFail |
GetTransactionAction |
GetTransactionActionSuccess |
GetTransactionActionFail |
ListTransactionsAction |
ListTransactionsActionSuccess |
ListTransactionsActionFail |
DeleteTransactionAction |
DeleteTransactionActionSuccess |
DeleteTransactionActionFail;