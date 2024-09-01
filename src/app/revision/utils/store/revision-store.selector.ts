import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RevisionState, revisionAdapter } from "./revision-store.reducer";
import { Revision } from "../models/revision";
import { RevisionType } from "../models/revision.type";

export const contractDeliverableSelector = createFeatureSelector<Readonly<RevisionState>>('revisions');

export const selectAllRevisionsByModelId = (model: RevisionType, modelId: string) => createSelector(
    contractDeliverableSelector,
    state => {        
        return revisionAdapter.getSelectors().selectAll(state).filter(revision => (revision.modelId === modelId && revision.model === model));
    }
);

export const selectRevisionById = (id: string) => createSelector(
    contractDeliverableSelector,
    state => state.entities[id] as Revision
);
