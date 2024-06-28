import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContractState, contractAdapter } from "./contract-store.reducer";
import { Contract } from "../models/contract.model";

export const clientSelector = createFeatureSelector<Readonly<ContractState>>('contracts');

export const selectAllClientContracts = (userId: string) => createSelector(
    clientSelector,
    state => contractAdapter.getSelectors().selectAll(state).filter(contract => (contract.clientId === userId) || (contract.contractorId === userId))
);

export const selectContractById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Contract
);