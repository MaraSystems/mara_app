import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { ProjectDeliverableAccessService } from "../access/project-deliverable-access.service";
import { CreateProjectDeliverableAction, CreateProjectDeliverableActionFail, CreateProjectDeliverableActionSuccess, GetProjectDeliverableAction, GetProjectDeliverableActionFail, GetProjectDeliverableActionSuccess, ListProjectDeliverablesAction, ListProjectDeliverablesActionFail, ListProjectDeliverablesActionSuccess, ProjectDeliverableActionsType, UpdateProjectDeliverableAction, UpdateProjectDeliverableActionFail, UpdateProjectDeliverableActionSuccess } from "./project-deliverable-store.action";
import { ProjectDeliverable } from "../models/project-deliverable.model";
import { RouterService } from "src/app/router/utils/router.service";

@Injectable()
export class ProjectDeliverableStoreEffect {
    constructor(
        private actions$: Actions,
        private projectDeliverableAccessService: ProjectDeliverableAccessService,
        private store: Store,
        private routerService: RouterService
    ){}

    createProjectDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<CreateProjectDeliverableAction>(ProjectDeliverableActionsType.CREATE_PROJECT_DELIVERABLE),
        mergeMap((action: CreateProjectDeliverableAction) => 
            this.projectDeliverableAccessService.createProjectDeliverable(action.payload).pipe(
                map((response: DataResponse<ProjectDeliverable>) => {
                    this.store.dispatch(new AddToast({ description: 'Project Deliverable Creation' }));
                    this.routerService.navigate(`/projects/${action.payload.projectId}/deliverables`);
                    return new CreateProjectDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new CreateProjectDeliverableActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Project Deliverable Creation' }));
                    })
                ))
            )
        )
    ));

    updateProjectDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateProjectDeliverableAction>(ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE),
        mergeMap((action: UpdateProjectDeliverableAction) => 
            this.projectDeliverableAccessService.updateProjectDeliverable(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast({ description: 'User update' }));
                    this.routerService.navigate(`/projects/${action.projectId}/deliverables/${action.payload.id}`);
                }),
                map((response: DataResponse<ProjectDeliverable>) => {                    
                    return new UpdateProjectDeliverableActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateProjectDeliverableActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'User update', isError: true }));
                    })
                ))
            )
        )
    ));

    getProjectDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<GetProjectDeliverableAction>(ProjectDeliverableActionsType.GET_PROJECT_DELIVERABLE),
        mergeMap((action: GetProjectDeliverableAction) => 
            this.projectDeliverableAccessService.getProjectDeliverable(action.payload).pipe(
                map((response: DataResponse<ProjectDeliverable>) => {                    
                    return new GetProjectDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new GetProjectDeliverableActionFail(err))
            )
        )
    )));

    listProjectDeliverables$ = createEffect(() => this.actions$.pipe(
        ofType<ListProjectDeliverablesAction>(ProjectDeliverableActionsType.LIST_PROJECT_DELIVERABLES),
        mergeMap((action: ListProjectDeliverablesAction) => 
            this.projectDeliverableAccessService.listProjectDeliverables(action.projectId).pipe(
                map((response: DataResponse<[ProjectDeliverable]>) => {                                        
                    return new ListProjectDeliverablesActionSuccess(response.data);
                }),
                catchError(err => of(new ListProjectDeliverablesActionFail(err))
            )
        )
    )));
}