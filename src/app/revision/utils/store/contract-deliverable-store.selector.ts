import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContractDeliverableState, contractDeliverableAdapter } from "./contract-deliverable-store.reducer";
import { ContractDeliverable } from "../models/contract-deliverable.model";

export const contractDeliverableSelector = createFeatureSelector<Readonly<ContractDeliverableState>>('contractDeliverables');

export const selectAllContractDeliverables = (id: string) => createSelector(
    contractDeliverableSelector,
    state => {        
        return contractDeliverableAdapter.getSelectors().selectAll(state).filter(deliverable => deliverable.contractId === id);
    }
);

export const selectContractDeliverableById = (id: string) => createSelector(
    contractDeliverableSelector,
    state => state.entities[id] as ContractDeliverable
);
