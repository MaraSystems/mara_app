import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContractDeliverableState, contractDeliverableAdapter } from "./contract-deliverable-store.reducer";
import { ContractDeliverable } from "../models/contract-deliverable.model";

export const clientSelector = createFeatureSelector<Readonly<ContractDeliverableState>>('contract_deliverables');

export const selectAllContractDeliverables = createSelector(
    clientSelector,
    contractDeliverableAdapter.getSelectors().selectAll
);

export const selectContractDeliverableById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as ContractDeliverable
);