import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Project } from "../models/project.model";
import { CreateProjectActionFail, CreateProjectActionSuccess, GetProjectActionSuccess, ListProjectsActionFail, ListProjectsActionSuccess, ProjectActionsType, UpdateProjectActionFail, UpdateProjectActionSuccess } from "./project-store.action";

export interface ProjectState extends EntityState<Project> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const projectAdapter: EntityAdapter<Project> = createEntityAdapter<Project>({
    selectId: (project: Project) => project._id
});

export const defualtIssue: ProjectState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = projectAdapter.getInitialState(defualtIssue);

export function projectReducer(state = initialState, action: Action): ProjectState {
    switch (action.type) {
        case ProjectActionsType.CREATE_PROJECT:
            return { ...state, loading: true, loaded: false };

        case ProjectActionsType.CREATE_PROJECT_SUCCESS:
            const createPayload = (action as CreateProjectActionSuccess).payload;
            return projectAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case ProjectActionsType.CREATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateProjectActionFail).payload
            }    

        case ProjectActionsType.UPDATE_PROJECT:
            return { ...state, loading: true, loaded: false };

        case ProjectActionsType.UPDATE_PROJECT_SUCCESS:
            const updatePayload = (action as UpdateProjectActionSuccess).payload;            
            return projectAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case ProjectActionsType.UPDATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProjectActionFail).payload
            }   
            
        case ProjectActionsType.GET_PROJECT:
            return { ...state, loading: true, loaded: false };

        case ProjectActionsType.GET_PROJECT_SUCCESS:
            const { payload: getPayload } = (action as GetProjectActionSuccess);
            return projectAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case ProjectActionsType.GET_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProjectActionFail).payload
            } 

        case ProjectActionsType.LIST_PROJECTS:
            return { ...state, loading: true, loaded: false };

        case ProjectActionsType.LIST_PROJECTS_SUCCESS:
            const { payload: listPayload } = (action as ListProjectsActionSuccess);
            return projectAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case ProjectActionsType.LIST_PROJECTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListProjectsActionFail).payload
            } 
    
        
        default:
            return state;
    }
}