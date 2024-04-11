import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectDeliverableState, projectDeliverableAdapter } from "./project-deliverable-store.reducer";
import { ProjectDeliverable } from "../models/project-deliverable.model";

export const clientSelector = createFeatureSelector<Readonly<ProjectDeliverableState>>('projectDeliverables');

export const selectAllProjectDeliverables = (id: string) => createSelector(
    clientSelector,
    state => projectDeliverableAdapter.getSelectors().selectAll(state).filter(deliverable => deliverable.projectId === id)
);

export const selectProjectDeliverableById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as ProjectDeliverable
);