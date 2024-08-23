import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Revision } from "../models/revision";
import { CreateRevisionActionFail, CreateRevisionActionSuccess, GetRevisionActionSuccess, ListRevisionsActionFail, ListRevisionsActionSuccess, RevisionActionsType, UpdateRevisionActionFail, UpdateRevisionActionSuccess } from "./revision-store.action";

export interface RevisionState extends EntityState<Revision> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const revisionAdapter: EntityAdapter<Revision> = createEntityAdapter<Revision>({
    selectId: (revision: Revision) => revision._id
});

export const defualtIssue: RevisionState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = revisionAdapter.getInitialState(defualtIssue);

export function revisionReducer(state = initialState, action: Action): RevisionState {
    switch (action.type) {
        case RevisionActionsType.CREATE_REVISION:
            return { ...state, loading: true, loaded: false };

        case RevisionActionsType.CREATE_REVISION_SUCCESS:
            const createPayload = (action as CreateRevisionActionSuccess).payload;
            return revisionAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case RevisionActionsType.CREATE_REVISION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateRevisionActionFail).payload
            }    

        case RevisionActionsType.UPDATE_REVISION:
            return { ...state, loading: true, loaded: false };

        case RevisionActionsType.UPDATE_REVISION_SUCCESS:
            const updatePayload = (action as UpdateRevisionActionSuccess).payload;            
            return revisionAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case RevisionActionsType.UPDATE_REVISION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateRevisionActionFail).payload
            }   
            
        case RevisionActionsType.GET_REVISION:
            return { ...state, loading: true, loaded: false };

        case RevisionActionsType.GET_REVISION_SUCCESS:
            const { payload: getPayload } = (action as GetRevisionActionSuccess);
            return revisionAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case RevisionActionsType.GET_REVISION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateRevisionActionFail).payload
            } 

        case RevisionActionsType.LIST_REVISIONS:
            return { ...state, loading: true, loaded: false };

        case RevisionActionsType.LIST_REVISIONS_SUCCESS:
            const { payload: listPayload } = (action as ListRevisionsActionSuccess);
            return revisionAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case RevisionActionsType.LIST_REVISIONS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListRevisionsActionFail).payload
            } 
    
        
        default:
            return state;
    }
}