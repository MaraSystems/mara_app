import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { ProjectDeliverableAccessService } from "../access/project-deliverable-access.service";
import { CreateProjectDeliverableAction, CreateProjectDeliverableActionFail, CreateProjectDeliverableActionSuccess, DeleteProjectDeliverableAction, DeleteProjectDeliverableActionFail, DeleteProjectDeliverableActionSuccess, GetProjectDeliverableAction, GetProjectDeliverableActionFail, GetProjectDeliverableActionSuccess, ListProjectDeliverablesAction, ListProjectDeliverablesActionFail, ListProjectDeliverablesActionSuccess, ProjectDeliverableActionsType, UpdateProjectDeliverableAction, UpdateProjectDeliverableActionFail, UpdateProjectDeliverableActionSuccess } from "./project-deliverable-store.action";
import { ProjectDeliverable } from "../models/project-deliverable.model";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastEnum } from "src/app/general/features/toast/utils/models/toast.enum";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

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
                    handleSuccessSideEffects((action as CreateProjectDeliverableAction).sideEffects);
                    return new CreateProjectDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new CreateProjectDeliverableActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateProjectDeliverableAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateProjectDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateProjectDeliverableAction>(ProjectDeliverableActionsType.UPDATE_PROJECT_DELIVERABLE),
        mergeMap((action: UpdateProjectDeliverableAction) => 
            this.projectDeliverableAccessService.updateProjectDeliverable(action.payload).pipe(
                map((response: DataResponse<ProjectDeliverable>) => {         
                    handleSuccessSideEffects((action as UpdateProjectDeliverableAction).sideEffects);
                    return new UpdateProjectDeliverableActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateProjectDeliverableActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateProjectDeliverableAction).sideEffects);
                    })
                ))
            )
        )
    ));

    deleteProjectDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteProjectDeliverableAction>(ProjectDeliverableActionsType.DELETE_PROJECT_DELIVERABLE),
        mergeMap((action: DeleteProjectDeliverableAction) => 
            this.projectDeliverableAccessService.deleteProjectDeliverable(action.payload).pipe(
                map((response: DataResponse<ProjectDeliverable>) => {         
                    this.store.dispatch(new AddToast({ description: 'User delete' }));
                    this.routerService.navigate(`/projects/${response.data.projectId}/deliverables`);
                    return new DeleteProjectDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteProjectDeliverableActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'User delete', type: ToastEnum.ERROR }));
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