import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Share } from "../models/share.model";
import { CreateShareActionFail, CreateShareActionSuccess, DeleteShareActionFail, DeleteShareActionSuccess, GetShareActionFail, GetShareActionSuccess, ListSharesActionFail, ListSharesActionSuccess, ShareActionsType, UpdateShareActionSuccess, UpdateShareActionFail } from "./share-store.action";

export interface ShareState extends EntityState<Share> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const shareAdapter: EntityAdapter<Share> = createEntityAdapter<Share>({
    selectId: (share: Share) => share._id
});

export const defualtIssue: ShareState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = shareAdapter.getInitialState(defualtIssue);

export function shareReducer(state = initialState, action: Action): ShareState {
    switch (action.type) {
        case ShareActionsType.CREATE_SHARE:
            return { ...state, loading: true, loaded: false };

        case ShareActionsType.CREATE_SHARE_SUCCESS:
            const createPayload = (action as CreateShareActionSuccess).payload;
            return shareAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case ShareActionsType.CREATE_SHARE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateShareActionFail).payload
            }    
            
        case ShareActionsType.GET_SHARE:
            return { ...state, loading: true, loaded: false };

        case ShareActionsType.GET_SHARE_SUCCESS:
            const { payload: getPayload } = (action as GetShareActionSuccess);            
            return shareAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case ShareActionsType.GET_SHARE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetShareActionFail).payload
            } 

        case ShareActionsType.LIST_SHARES:
            return { ...state, loading: true, loaded: false };

        case ShareActionsType.LIST_SHARES_SUCCESS:
            const { payload: listPayload } = (action as ListSharesActionSuccess);
            return shareAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case ShareActionsType.LIST_SHARES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListSharesActionFail).payload
            } 
        
        case ShareActionsType.DELETE_SHARE:
            return { ...state, loading: true, loaded: false };

        case ShareActionsType.DELETE_SHARE_SUCCESS:
            const { payload: deletePayload } = (action as DeleteShareActionSuccess);
            return shareAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case ShareActionsType.DELETE_SHARE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteShareActionFail).payload
            } 

        case ShareActionsType.UPDATE_SHARE:
            return { ...state, loading: true, loaded: false };

        case ShareActionsType.UPDATE_SHARE_SUCCESS:
            const { payload: updatePayload } = (action as UpdateShareActionSuccess);
            return shareAdapter.updateOne(updatePayload , { ...state, loading: false, loaded: true })   
            
        case ShareActionsType.UPDATE_SHARE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateShareActionFail).payload
            } 
    
        
        default:
            return state;
    }
}