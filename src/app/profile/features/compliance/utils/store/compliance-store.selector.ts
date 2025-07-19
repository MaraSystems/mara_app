import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ComplianceState } from "./compliance-store.reducer";
import { Compliance } from "src/app/users/utils/models/compliance";

export const complianceSelector = createFeatureSelector<Readonly<ComplianceState>>('compliances');

export const selectCompliancesByUserId = (userId: string) => createSelector(
    complianceSelector,
    state => Object.values(state.entities).filter(entity => entity?.userId === userId) as Compliance[]
);

export const selectComplianceById = (id: string) => createSelector(
    complianceSelector,
    state => state.entities[id] as Compliance
);
