import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContractState, contractAdapter } from "./contract-store.reducer";
import { Contract } from "../models/contract.model";

export const clientSelector = createFeatureSelector<Readonly<ContractState>>('contracts');

export const selectAllContracts = createSelector(
    clientSelector,
    contractAdapter.getSelectors().selectAll
);

export const selectContractById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Contract
);