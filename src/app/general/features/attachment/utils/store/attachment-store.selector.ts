import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttachmentState } from "./attachment-store.reducer";
import { Attachment } from "../models/attachment";

export const clientSelector = createFeatureSelector<Readonly<AttachmentState>>('attachments');

export const selectAttachmentsByModelId = (model: string, id: string) => createSelector(
    clientSelector,
    state => {
        const attachments = Object.values(state.entities) as Attachment[];                
        return attachments.filter(attachment => (attachment.model === model && attachment.modelId === id));
    }
);

export const selectAttachmentById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Attachment
);