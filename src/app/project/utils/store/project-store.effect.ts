import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { ProjectAccessService } from "../access/project-access.service";
import { CreateProjectAction, CreateProjectActionFail, CreateProjectActionSuccess, DeleteProjectAction, DeleteProjectActionFail, DeleteProjectActionSuccess, GetProjectAction, GetProjectActionFail, GetProjectActionSuccess, ListProjectsAction, ListProjectsActionFail, ListProjectsActionSuccess, ProjectActionsType, UpdateProjectAction, UpdateProjectActionFail, UpdateProjectActionSuccess } from "./project-store.action";
import { Project } from "../models/project.model";
import { SetPopup } from "src/app/shared/features/popup/utils/store/popup.action";

@Injectable()
export class ProjectStoreEffect {
    constructor(
        private actions$: Actions,
        private projectAccessService: ProjectAccessService,
        private store: Store,
        private router: Router,
    ){}

    createProject$ = createEffect(() => this.actions$.pipe(
        ofType<CreateProjectAction>(ProjectActionsType.CREATE_PROJECT),
        mergeMap((action: CreateProjectAction) => 
            this.projectAccessService.createProject(action.payload).pipe(
                map((response: DataResponse<Project>) => {
                    this.store.dispatch(new AddToast({ description: 'Project Creation' }));
                    this.router.navigateByUrl('/projects');
                    return new CreateProjectActionSuccess(response.data);
                }),
                catchError(err => of(new CreateProjectActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Project Creation' }));
                    })
                ))
            )
        )
    ));

    updateProject$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateProjectAction>(ProjectActionsType.UPDATE_PROJECT),
        mergeMap((action: UpdateProjectAction) => 
            this.projectAccessService.updateProject(action.payload).pipe(
                map((response: DataResponse<Project>) => {     
                    const { sideEffect }  = (action as UpdateProjectAction);
                    if (sideEffect?.toastFlag) {
                        this.store.dispatch(new AddToast({ description: 'Project Updated' }));
                    }
                    this.store.dispatch(new SetPopup({ tag: sideEffect?.modal as string, action: 'close' }));                    
                    return new UpdateProjectActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateProjectActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'User update', isError: true }));
                    })
                ))
            )
        )
    ));

    getProject$ = createEffect(() => this.actions$.pipe(
        ofType<GetProjectAction>(ProjectActionsType.GET_PROJECT),
        mergeMap((action: GetProjectAction) => 
            this.projectAccessService.getProject(action.payload).pipe(
                map((response: DataResponse<Project>) => {                                        
                    return new GetProjectActionSuccess(response.data);
                }),
                catchError(err => of(new GetProjectActionFail(err))
            )
        )
    )));

    listProjects$ = createEffect(() => this.actions$.pipe(
        ofType<ListProjectsAction>(ProjectActionsType.LIST_PROJECTS),
        mergeMap((action: ListProjectsAction) => 
            this.projectAccessService.listProjects(action.payload).pipe(
                map((response: DataResponse<[Project]>) => {                    
                    return new ListProjectsActionSuccess(response.data);
                }),
                catchError(err => of(new ListProjectsActionFail(err))
            )
        )
    )));

    deleteProject$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteProjectAction>(ProjectActionsType.DELETE_PROJECT),
        mergeMap((action: DeleteProjectAction) => 
            this.projectAccessService.deleteProject(action.payload).pipe(
                map((response: DataResponse<Project>) => {         
                    this.store.dispatch(new AddToast({ description: 'Project Deleted' }));
                    this.router.navigateByUrl('/projects');           
                    return new DeleteProjectActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteProjectActionFail(err))
            )
        )
    )));
}