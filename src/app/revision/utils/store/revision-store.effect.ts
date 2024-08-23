import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { RevisionAccessService } from "../access/revision-access.service";
import { CreateRevisionAction, CreateRevisionActionFail, CreateRevisionActionSuccess, GetRevisionAction, GetRevisionActionFail, GetRevisionActionSuccess, ListRevisionsAction, ListRevisionsActionFail, ListRevisionsActionSuccess, RevisionActionsType, UpdateRevisionAction, UpdateRevisionActionFail, UpdateRevisionActionSuccess } from "./revision-store.action";
import { Revision } from "../models/revision";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class RevisionStoreEffect {
    constructor(
        private actions$: Actions,
        private revisionAccessService: RevisionAccessService,
        private store: Store,
        private router: Router
    ){}

    createRevision$ = createEffect(() => this.actions$.pipe(
        ofType<CreateRevisionAction>(RevisionActionsType.CREATE_REVISION),
        mergeMap((action: CreateRevisionAction) => 
            this.revisionAccessService.createRevision(action.payload).pipe(
                map((response: DataResponse<Revision>) => {  
                    console.log(response);
                    
                    handleSuccessSideEffects((action as CreateRevisionAction).sideEffects);
                    return new CreateRevisionActionSuccess(response.data);
                }),
                catchError(err => of(new CreateRevisionActionFail(err)).pipe(
                    tap((failedAction) => {
                        handleFailureSideEffects((action as CreateRevisionAction).sideEffects, failedAction.payload);
                    })
                ))
            )
        )
    ));

    updateRevision$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateRevisionAction>(RevisionActionsType.UPDATE_REVISION),
        mergeMap((action: UpdateRevisionAction) => 
            this.revisionAccessService.updateRevision(action.payload).pipe(
                map((response: DataResponse<Revision>) => {  
                    handleSuccessSideEffects((action as UpdateRevisionAction).sideEffects);
                    return new UpdateRevisionActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateRevisionActionFail(err)).pipe(
                    tap((failedAction) => {
                        handleFailureSideEffects((action as UpdateRevisionAction).sideEffects, failedAction.payload);
                    })
                ))
            )
        )
    ));

    getRevision$ = createEffect(() => this.actions$.pipe(
        ofType<GetRevisionAction>(RevisionActionsType.GET_REVISION),
        mergeMap((action: GetRevisionAction) => 
            this.revisionAccessService.getRevision(action.payload).pipe(
                map((response: DataResponse<Revision>) => {                    
                    return new GetRevisionActionSuccess(response.data);
                }),
                catchError(err => of(new GetRevisionActionFail(err))
            )
        )
    )));

    listRevisions$ = createEffect(() => this.actions$.pipe(
        ofType<ListRevisionsAction>(RevisionActionsType.LIST_REVISIONS),
        mergeMap((action: ListRevisionsAction) => 
            this.revisionAccessService.listRevisions(action.contractId).pipe(
                map((response: DataResponse<Revision[]>) => {                    
                    return new ListRevisionsActionSuccess(response.data);
                }),
                catchError(err => of(new ListRevisionsActionFail(err))
            )
        )
    )));
}