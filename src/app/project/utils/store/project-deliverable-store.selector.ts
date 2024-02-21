import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectDeliverableState, projectDeliverableAdapter } from "./project-deliverable-store.reducer";
import { ProjectDeliverable } from "../models/project-deliverable.model";

export const clientSelector = createFeatureSelector<Readonly<ProjectDeliverableState>>('project_deliverables');

export const selectAllProjectDeliverables = createSelector(
    clientSelector,
    projectDeliverableAdapter.getSelectors().selectAll
);

export const selectProjectDeliverableById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as ProjectDeliverable
);