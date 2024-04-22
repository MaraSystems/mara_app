import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { DeleteAttatchmentActionFail, DeleteAttatchmentActionSuccess, AttatchmentActionsType, DownloadAttatchmentActionFail, DownloadAttatchmentActionSuccess, GetAttatchmentActionFail, GetAttatchmentActionSuccess, ListAttatchmentsActionFail, ListAttatchmentsActionSuccess, UploadAttatchmentActionFail, UploadAttatchmentActionSuccess } from "./attatchment-store.action";
import { Attatchment } from "../models/attatchment.model";

export interface AttatchmentState extends EntityState<Attatchment> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const attatchmentAdapter: EntityAdapter<Attatchment> = createEntityAdapter<Attatchment>({
    selectId: (attatchment: Attatchment) => attatchment._id
});

export const defualtIssue: AttatchmentState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = attatchmentAdapter.getInitialState(defualtIssue);

export function attatchmentReducer(state = initialState, action: Action): AttatchmentState {
    switch (action.type) {
        case AttatchmentActionsType.UPLOAD_ATTATCHMENT:
            return { ...state, loading: true, loaded: false };

        case AttatchmentActionsType.UPLOAD_ATTATCHMENT_SUCCESS:
            const { payload: createPayload, id } = (action as UploadAttatchmentActionSuccess);
            return id 
                ? attatchmentAdapter.updateOne({ id, changes: createPayload }, { ...state, loading: false, loaded: true })
                : attatchmentAdapter.addOne(createPayload, { ...state, loading: false, loaded: true });
            
        case AttatchmentActionsType.UPLOAD_ATTATCHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UploadAttatchmentActionFail).payload
            }    

        case AttatchmentActionsType.DOWNLOAD_ATTATCHMENT:
            return { ...state, loading: true, loaded: false };

        case AttatchmentActionsType.DOWNLOAD_ATTATCHMENT_SUCCESS:
            const updatePayload = (action as DownloadAttatchmentActionSuccess).payload;            
            return attatchmentAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case AttatchmentActionsType.DOWNLOAD_ATTATCHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DownloadAttatchmentActionFail).payload
            }   
            
        case AttatchmentActionsType.GET_ATTATCHMENT:
            return { ...state, loading: true, loaded: false };

        case AttatchmentActionsType.GET_ATTATCHMENT_SUCCESS:
            const { payload: getPayload } = (action as GetAttatchmentActionSuccess);
            return attatchmentAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case AttatchmentActionsType.GET_ATTATCHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetAttatchmentActionFail).payload
            } 

        case AttatchmentActionsType.LIST_ATTATCHMENTS:
            return { ...state, loading: true, loaded: false };

        case AttatchmentActionsType.LIST_ATTATCHMENTS_SUCCESS:
            const { payload: listPayload } = (action as ListAttatchmentsActionSuccess);
            return attatchmentAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case AttatchmentActionsType.LIST_ATTATCHMENTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListAttatchmentsActionFail).payload
            } 
    
        case AttatchmentActionsType.DELETE_ATTATCHMENT:
            return { ...state, loading: true, loaded: false };

        case AttatchmentActionsType.DELETE_ATTATCHMENT_SUCCESS:
            const { payload: deletePayload } = (action as DeleteAttatchmentActionSuccess);
            return attatchmentAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case AttatchmentActionsType.DELETE_ATTATCHMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteAttatchmentActionFail).payload
            } 
    
        default:
            return state;
    }
}