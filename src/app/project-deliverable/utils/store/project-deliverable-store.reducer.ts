import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { ProjectDeliverable } from "../models/project-deliverable";
import { CreateProjectDeliverableActionFail, CreateProjectDeliverableActionSuccess, DeleteProjectDeliverableActionFail, DeleteProjectDeliverableActionSuccess, GetProjectDeliverableActionFail, GetProjectDeliverableActionSuccess, ListProjectDeliverablesActionFail, ListProjectDeliverablesActionSuccess, ProjectDeliverableActionsType, UpdateProjectDeliverableActionFail, UpdateProjectDeliverableActionSuccess } from "./project-deliverable-store.action";

export interface ProjectDeliverableState extends EntityState<ProjectDeliverable> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const projectDeliverableAdapter: EntityAdapter<ProjectDeliverable> = createEntityAdapter<ProjectDeliverable>({
    selectId: (projectDeliverable: ProjectDeliverable) => projectDeliverable._id
});

export const defualtIssue: ProjectDeliverableState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = projectDeliverableAdapter.getInitialState(defualtIssue);

export function projectDeliverableReducer(state = initialState, action: Action): ProjectDeliverableState {
    switch (action.type) {
        case ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE_SUCCESS:
            const createPayload = (action as CreateProjectDeliverableActionSuccess).payload;
            return projectDeliverableAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateProjectDeliverableActionFail).payload
            }    

        case ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE_SUCCESS:
            const updatePayload = (action as UpdateProjectDeliverableActionSuccess).payload;            
            return projectDeliverableAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProjectDeliverableActionFail).payload
            }   
            
        case ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE_SUCCESS:
            const { payload: getPayload } = (action as GetProjectDeliverableActionSuccess);
            return projectDeliverableAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetProjectDeliverableActionFail).payload
            } 

        case ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES:
            return { ...state, loading: true, loaded: false };

        case ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES_SUCCESS:
            const { payload: listPayload } = (action as ListProjectDeliverablesActionSuccess);
            return projectDeliverableAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListProjectDeliverablesActionFail).payload
            } 
    
        case ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE_SUCCESS:
            const { payload: deletePayload } = (action as DeleteProjectDeliverableActionSuccess);
            return projectDeliverableAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteProjectDeliverableActionFail).payload
            } 
    
        default:
            return state;
    }
}