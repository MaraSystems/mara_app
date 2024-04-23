import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { ProjectDeliverable } from "../models/project-deliverable.model";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { SideEffects } from "src/app/shared/utils/models/side.effects";

export enum ProjectDeliverableActionsType {
    CREATE_PROJECT_DELIVERABLE = "[PROJECT_DELIVERABLE] Create ProjectDeliverable",
    CREATE_PROJECT_DELIVERABLE_SUCCESS = "[PROJECT_DELIVERABLE] Create ProjectDeliverable Success",
    CREATE_PROJECT_DELIVERABLE_FAIL = "[PROJECT_DELIVERABLE] Create ProjectDeliverable Fail",

    UPDATE_PROJECT_DELIVERABLE = "[PROJECT_DELIVERABLE] Update ProjectDeliverable",
    UPDATE_PROJECT_DELIVERABLE_SUCCESS = "[PROJECT_DELIVERABLE] Update ProjectDeliverable Success",
    UPDATE_PROJECT_DELIVERABLE_FAIL = "[PROJECT_DELIVERABLE] Update ProjectDeliverable Fail",

    GET_PROJECT_DELIVERABLE = "[PROJECT_DELIVERABLE] Get ProjectDeliverable",
    GET_PROJECT_DELIVERABLE_SUCCESS = "[PROJECT_DELIVERABLE] Get ProjectDeliverable Success",
    GET_PROJECT_DELIVERABLE_FAIL = "[PROJECT_DELIVERABLE] Get ProjectDeliverable Fail",

    DELETE_PROJECT_DELIVERABLE = "[PROJECT_DELIVERABLE] Delete ProjectDeliverable",
    DELETE_PROJECT_DELIVERABLE_SUCCESS = "[PROJECT_DELIVERABLE] Delete ProjectDeliverable Success",
    DELETE_PROJECT_DELIVERABLE_FAIL = "[PROJECT_DELIVERABLE] Delete ProjectDeliverable Fail",

    LIST_PROJECT_DELIVERABLES = "[PROJECT_DELIVERABLE] List ProjectDeliverables",
    LIST_PROJECT_DELIVERABLES_SUCCESS = "[PROJECT_DELIVERABLE] List ProjectDeliverables Success",
    LIST_PROJECT_DELIVERABLES_FAIL = "[PROJECT_DELIVERABLE] List ProjectDeliverables Fail"
}

export class CreateProjectDeliverableAction implements Action {
    readonly type = ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE;
    constructor(public payload: ProjectDeliverable){}
}

export class CreateProjectDeliverableActionSuccess implements Action {
    readonly type = ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE_SUCCESS;
    constructor(public payload: ProjectDeliverable){}
}

export class CreateProjectDeliverableActionFail implements Action {
    readonly type = ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class UpdateProjectDeliverableAction implements Action {
    readonly type = ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE;
    constructor(public payload: Update<ProjectDeliverable>, public sideEffects = new SideEffects()){}
}

export class UpdateProjectDeliverableActionSuccess implements Action {
    readonly type = ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE_SUCCESS;
    constructor(public payload: Update<ProjectDeliverable>){}
}

export class UpdateProjectDeliverableActionFail implements Action {
    readonly type = ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class GetProjectDeliverableAction implements Action {
    readonly type = ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE;
    constructor(public payload: string){}
}

export class GetProjectDeliverableActionSuccess implements Action {
    readonly type = ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE_SUCCESS;
    constructor(public payload: ProjectDeliverable){}
}

export class GetProjectDeliverableActionFail implements Action {
    readonly type = ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export class ListProjectDeliverablesAction implements Action {
    readonly type = ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES;
    constructor(public projectId: string, public payload?: ListPayload){}
}

export class ListProjectDeliverablesActionSuccess implements Action {
    readonly type = ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES_SUCCESS;
    constructor(public payload: ProjectDeliverable[]){}
}

export class ListProjectDeliverablesActionFail implements Action {
    readonly type = ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES_FAIL;
    constructor(public payload: string){}
}


export class DeleteProjectDeliverableAction implements Action {
    readonly type = ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE;
    constructor(public payload: string){}
}

export class DeleteProjectDeliverableActionSuccess implements Action {
    readonly type = ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE_SUCCESS;
    constructor(public payload: ProjectDeliverable){}
}

export class DeleteProjectDeliverableActionFail implements Action {
    readonly type = ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE_FAIL;
    constructor(public payload: string){}
}

export type ProjectDeliverableAction = 
CreateProjectDeliverableAction |
CreateProjectDeliverableActionSuccess |
CreateProjectDeliverableActionFail |
UpdateProjectDeliverableAction |
UpdateProjectDeliverableActionSuccess |
UpdateProjectDeliverableActionFail |
GetProjectDeliverableAction |
GetProjectDeliverableActionSuccess |
GetProjectDeliverableActionFail |
DeleteProjectDeliverableAction |
DeleteProjectDeliverableActionSuccess |
DeleteProjectDeliverableActionFail;