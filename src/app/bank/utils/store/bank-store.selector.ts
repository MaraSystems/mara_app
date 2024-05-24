import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BankState, bankAdapter } from "./bank-store.reducer";
import { Bank } from "../models/bank.model";

export const clientSelector = createFeatureSelector<Readonly<BankState>>('banks');

export const selectAllClientBanks = (userId: string) => createSelector(
    clientSelector,
    state => Object.values(bankAdapter.getSelectors().selectAll(state)).filter((bank) => bank.userId === userId) as Bank[]
);

export const selectClientDefaultBank = (userId: string) => createSelector(
    clientSelector,
    state => Object.values(bankAdapter.getSelectors().selectAll(state)).find((bank) => (bank.userId === userId && bank.default === true)) as Bank
);

export const selectBankById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Bank
);