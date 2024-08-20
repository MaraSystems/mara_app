import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ShareState, shareAdapter } from "./share-store.reducer";
import { ShareType } from "../models/share-type";
import { Share } from "../models/share";

export const clientSelector = createFeatureSelector<Readonly<ShareState>>('shares');

export const selectSharesByModelId = (model: ShareType, id: string) => createSelector(
    clientSelector,
    state => {
        const shares = Object.values(state.entities) as Share[];                
        return shares.filter(share => (share.model === model && share.modelId === id));
    }
);
export const selectShareById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Share
);