import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { DocumentData } from "../../models/document-data";
import { DeleteDocumentActionFail, DeleteDocumentActionSuccess, DocumentActionsType, DownloadDocumentActionFail, DownloadDocumentActionSuccess, GetDocumentActionFail, GetDocumentActionSuccess, ListDocumentsActionFail, ListDocumentsActionSuccess, UploadDocumentActionFail, UploadDocumentActionSuccess } from "./document-store.action";

export interface DocumentState extends EntityState<DocumentData> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const documentAdapter: EntityAdapter<DocumentData> = createEntityAdapter<DocumentData>({
    selectId: (document: DocumentData) => document._id
});

export const defualtIssue: DocumentState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = documentAdapter.getInitialState(defualtIssue);

export function documentReducer(state = initialState, action: Action): DocumentState {
    switch (action.type) {
        case DocumentActionsType.UPLOAD_DOCUMENT:
            return { ...state, loading: true, loaded: false };

        case DocumentActionsType.UPLOAD_DOCUMENT_SUCCESS:
            const { payload: createPayload, id } = (action as UploadDocumentActionSuccess);
            return id 
                ? documentAdapter.updateOne({ id, changes: createPayload }, { ...state, loading: false, loaded: true })
                : documentAdapter.addOne(createPayload, { ...state, loading: false, loaded: true });
            
        case DocumentActionsType.UPLOAD_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UploadDocumentActionFail).payload
            }    

        case DocumentActionsType.DOWNLOAD_DOCUMENT:
            return { ...state, loading: true, loaded: false };

        case DocumentActionsType.DOWNLOAD_DOCUMENT_SUCCESS:
            const updatePayload = (action as DownloadDocumentActionSuccess).payload;            
            return documentAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case DocumentActionsType.DOWNLOAD_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DownloadDocumentActionFail).payload
            }   
            
        case DocumentActionsType.GET_DOCUMENT:
            return { ...state, loading: true, loaded: false };

        case DocumentActionsType.GET_DOCUMENT_SUCCESS:
            const { payload: getPayload } = (action as GetDocumentActionSuccess);
            return documentAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case DocumentActionsType.GET_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetDocumentActionFail).payload
            } 

        case DocumentActionsType.LIST_DOCUMENTS:
            return { ...state, loading: true, loaded: false };

        case DocumentActionsType.LIST_DOCUMENTS_SUCCESS:
            const { payload: listPayload } = (action as ListDocumentsActionSuccess);
            return documentAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case DocumentActionsType.LIST_DOCUMENTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListDocumentsActionFail).payload
            } 
    
        case DocumentActionsType.DELETE_DOCUMENT:
            return { ...state, loading: true, loaded: false };

        case DocumentActionsType.DELETE_DOCUMENT_SUCCESS:
            const { payload: deletePayload } = (action as DeleteDocumentActionSuccess);
            return documentAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case DocumentActionsType.DELETE_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteDocumentActionFail).payload
            } 
    
        default:
            return state;
    }
}