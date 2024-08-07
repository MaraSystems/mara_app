import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { DeleteAttachmentActionFail, DeleteAttachmentActionSuccess, AttachmentActionsType, DownloadAttachmentActionFail, DownloadAttachmentActionSuccess, GetAttachmentActionFail, GetAttachmentActionSuccess, ListAttachmentsActionFail, ListAttachmentsActionSuccess, UploadAttachmentActionFail, UploadAttachmentActionSuccess } from "./attachment-store.action";
import { Attachment } from "../models/attachment.model";

export interface AttachmentState extends EntityState<Attachment> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const attachmentAdapter: EntityAdapter<Attachment> = createEntityAdapter<Attachment>({
    selectId: (attachment: Attachment) => attachment._id
});

export const defualtIssue: AttachmentState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = attachmentAdapter.getInitialState(defualtIssue);

export function attachmentReducer(state = initialState, action: Action): AttachmentState {
    switch (action.type) {
        case AttachmentActionsType.UPLOAD_ATTACHMENT:
            return { ...state, loading: true, loaded: false };

        case AttachmentActionsType.UPLOAD_ATTACHMENT_SUCCESS:
            const { payload: createPayload, id } = (action as UploadAttachmentActionSuccess);
            return id 
                ? attachmentAdapter.updateOne({ id, changes: createPayload }, { ...state, loading: false, loaded: true })
                : attachmentAdapter.addOne(createPayload, { ...state, loading: false, loaded: true });
            
        case AttachmentActionsType.UPLOAD_ATTACHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UploadAttachmentActionFail).payload
            }    

        case AttachmentActionsType.DOWNLOAD_ATTACHMENT:
            return { ...state, loading: true, loaded: false };

        case AttachmentActionsType.DOWNLOAD_ATTACHMENT_SUCCESS:
            const updatePayload = (action as DownloadAttachmentActionSuccess).payload;            
            return attachmentAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case AttachmentActionsType.DOWNLOAD_ATTACHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DownloadAttachmentActionFail).payload
            }   
            
        case AttachmentActionsType.GET_ATTACHMENT:
            return { ...state, loading: true, loaded: false };

        case AttachmentActionsType.GET_ATTACHMENT_SUCCESS:
            const { payload: getPayload } = (action as GetAttachmentActionSuccess);
            return attachmentAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case AttachmentActionsType.GET_ATTACHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetAttachmentActionFail).payload
            } 

        case AttachmentActionsType.LIST_ATTACHMENTS:
            return { ...state, loading: true, loaded: false };

        case AttachmentActionsType.LIST_ATTACHMENTS_SUCCESS:
            const { payload: listPayload } = (action as ListAttachmentsActionSuccess);
            return attachmentAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case AttachmentActionsType.LIST_ATTACHMENTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListAttachmentsActionFail).payload
            } 
    
        case AttachmentActionsType.DELETE_ATTACHMENT:
            return { ...state, loading: true, loaded: false };

        case AttachmentActionsType.DELETE_ATTACHMENT_SUCCESS:
            const { payload: deletePayload } = (action as DeleteAttachmentActionSuccess);
            return attachmentAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case AttachmentActionsType.DELETE_ATTACHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteAttachmentActionFail).payload
            } 
    
        default:
            return state;
    }
}