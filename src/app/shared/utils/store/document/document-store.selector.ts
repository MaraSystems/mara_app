import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentState, documentAdapter } from "./document-store.reducer";
import { DocumentData } from "../../models/document-data";

export const clientSelector = createFeatureSelector<Readonly<DocumentState>>('documents');

export const selectDocumentByModelId = (model: string, id: string) => createSelector(
    clientSelector,
    state => {
        const documents = Object.values(state.entities) as DocumentData[];        
        return documents.filter(document => (document.model === model && document.modelId === id));
    }
);

export const selectDocumentById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as DocumentData
);