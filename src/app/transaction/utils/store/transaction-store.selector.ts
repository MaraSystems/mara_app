import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransactionState, transactionAdapter } from "./transaction-store.reducer";
import { Transaction } from "../models/transaction.model";

export const clientSelector = createFeatureSelector<Readonly<TransactionState>>('transactions');

export const selectAllTransactions = createSelector(
    clientSelector,
    transactionAdapter.getSelectors().selectAll
);

export const selectTransactionById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Transaction
);