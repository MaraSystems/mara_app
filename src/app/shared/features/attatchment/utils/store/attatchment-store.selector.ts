import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttatchmentState } from "./attatchment-store.reducer";
import { Attatchment } from "../models/attatchment.model";

export const clientSelector = createFeatureSelector<Readonly<AttatchmentState>>('attatchments');

export const selectAttatchmentsByModelId = (model: string, id: string) => createSelector(
    clientSelector,
    state => {
        const attatchments = Object.values(state.entities) as Attatchment[];                
        return attatchments.filter(attatchment => (attatchment.model === model && attatchment.modelId === id));
    }
);

export const selectAttatchmentById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Attatchment
);