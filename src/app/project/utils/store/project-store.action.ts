import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Project } from "../models/project.model";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { SideEffects } from "src/app/shared/utils/models/side.effects";

export enum ProjectActionsType {
    CREATE_PROJECT = "[PROJECT] Create Project",
    CREATE_PROJECT_SUCCESS = "[PROJECT] Create Project Success",
    CREATE_PROJECT_FAIL = "[PROJECT] Create Project Fail",

    UPDATE_PROJECT = "[PROJECT] Update Project",
    UPDATE_PROJECT_SUCCESS = "[PROJECT] Update Project Success",
    UPDATE_PROJECT_FAIL = "[PROJECT] Update Project Fail",

    GET_PROJECT = "[PROJECT] Get Project",
    GET_PROJECT_SUCCESS = "[PROJECT] Get Project Success",
    GET_PROJECT_FAIL = "[PROJECT] Get Project Fail",

    LIST_PROJECTS = "[PROJECT] List Projects",
    LIST_PROJECTS_SUCCESS = "[PROJECT] List Projects Success",
    LIST_PROJECTS_FAIL = "[PROJECT] List Projects Fail",

    DELETE_PROJECT = "[PROJECT] Delete Project",
    DELETE_PROJECT_SUCCESS = "[PROJECT] Delete Project Success",
    DELETE_PROJECT_FAIL = "[PROJECT] Delete Project Fail",
}

export class CreateProjectAction implements Action {
    readonly type = ProjectActionsType.CREATE_PROJECT;
    constructor(public payload: Project){}
}

export class CreateProjectActionSuccess implements Action {
    readonly type = ProjectActionsType.CREATE_PROJECT_SUCCESS;
    constructor(public payload: Project){}
}

export class CreateProjectActionFail implements Action {
    readonly type = ProjectActionsType.CREATE_PROJECT_FAIL;
    constructor(public payload: string){}
}

export class UpdateProjectAction implements Action {
    readonly type = ProjectActionsType.UPDATE_PROJECT;
    constructor(public payload: Update<Project>, public sideEffect?: SideEffects){}
}

export class UpdateProjectActionSuccess implements Action {
    readonly type = ProjectActionsType.UPDATE_PROJECT_SUCCESS;
    constructor(public payload: Update<Project>){}
}

export class UpdateProjectActionFail implements Action {
    readonly type = ProjectActionsType.UPDATE_PROJECT_FAIL;
    constructor(public payload: string){}
}

export class GetProjectAction implements Action {
    readonly type = ProjectActionsType.GET_PROJECT;
    constructor(public payload: string){}
}

export class GetProjectActionSuccess implements Action {
    readonly type = ProjectActionsType.GET_PROJECT_SUCCESS;
    constructor(public payload: Project){}
}

export class GetProjectActionFail implements Action {
    readonly type = ProjectActionsType.GET_PROJECT_FAIL;
    constructor(public payload: string){}
}

export class ListProjectsAction implements Action {
    readonly type = ProjectActionsType.LIST_PROJECTS;
    constructor(public payload: ListPayload){}
}

export class ListProjectsActionSuccess implements Action {
    readonly type = ProjectActionsType.LIST_PROJECTS_SUCCESS;
    constructor(public payload: Project[]){}
}

export class ListProjectsActionFail implements Action {
    readonly type = ProjectActionsType.LIST_PROJECTS_FAIL;
    constructor(public payload: string){}
}

export class DeleteProjectAction implements Action {
    readonly type = ProjectActionsType.DELETE_PROJECT;
    constructor(public payload: string){}
}

export class DeleteProjectActionSuccess implements Action {
    readonly type = ProjectActionsType.DELETE_PROJECT_SUCCESS;
    constructor(public payload: Project){}
}

export class DeleteProjectActionFail implements Action {
    readonly type = ProjectActionsType.DELETE_PROJECT_FAIL;
    constructor(public payload: string){}
}

export type ProjectAction = 
CreateProjectAction |
CreateProjectActionSuccess |
CreateProjectActionFail |
UpdateProjectAction |
UpdateProjectActionSuccess |
UpdateProjectActionFail |
GetProjectAction |
GetProjectActionSuccess |
GetProjectActionFail |
ListProjectsAction |
ListProjectsActionSuccess |
ListProjectsActionFail |
DeleteProjectAction |
DeleteProjectActionSuccess |
DeleteProjectActionFail;