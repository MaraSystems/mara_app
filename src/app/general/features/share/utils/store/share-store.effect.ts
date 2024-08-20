import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { ShareAccessService } from "../access/share-access.service";
import { CreateShareAction, CreateShareActionFail, CreateShareActionSuccess, DeleteShareAction, DeleteShareActionFail, DeleteShareActionSuccess, GetShareAction, GetShareActionFail, GetShareActionSuccess, ListSharesAction, ListSharesActionFail, ListSharesActionSuccess, ShareActionsType, UpdateShareAction, UpdateShareActionSuccess, UpdateShareActionFail } from "./share-store.action";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { Share } from "../models/share";

@Injectable()
export class ShareStoreEffect {
    constructor(
        private actions$: Actions,
        private shareAccessService: ShareAccessService
    ){}

    createShare$ = createEffect(() => this.actions$.pipe(
        ofType<CreateShareAction>(ShareActionsType.CREATE_SHARE),
        mergeMap((action: CreateShareAction) => 
            this.shareAccessService.createShare(action.payload).pipe(
                map((response: DataResponse<Share>) => {
                    handleSuccessSideEffects((action as CreateShareAction).sideEffects);
                    return new CreateShareActionSuccess(response.data);
                }),
                catchError(err => of(new CreateShareActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateShareAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateShare$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateShareAction>(ShareActionsType.UPDATE_SHARE),
        mergeMap((action: UpdateShareAction) => 
            this.shareAccessService.updateShare(action.payload).pipe(
                map((response: DataResponse<Share>) => {
                    handleSuccessSideEffects((action as UpdateShareAction).sideEffects);
                    return new UpdateShareActionSuccess({ id: action.payload.id as string, changes: response.data });
                }),
                catchError(err => of(new UpdateShareActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateShareAction).sideEffects);
                    })
                ))            
            )
        )
    ));

    getShare$ = createEffect(() => this.actions$.pipe(
        ofType<GetShareAction>(ShareActionsType.GET_SHARE),
        mergeMap((action: GetShareAction) => 
            this.shareAccessService.getShare(action.payload).pipe(
                map((response: DataResponse<Share>) => {                                        
                    return new GetShareActionSuccess(response.data);
                }),
                catchError(err => of(new GetShareActionFail(err))
            )
        )
    )));

    listShares$ = createEffect(() => this.actions$.pipe(
        ofType<ListSharesAction>(ShareActionsType.LIST_SHARES),
        mergeMap((action: ListSharesAction) => 
            this.shareAccessService.listShares(action.model, action.modelId, action.payload).pipe(
                map((response: DataResponse<[Share]>) => {                    
                    return new ListSharesActionSuccess(response.data);
                }),
                catchError(err => of(new ListSharesActionFail(err))
            )
        )
    )));

    deleteShare$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteShareAction>(ShareActionsType.DELETE_SHARE),
        mergeMap((action: DeleteShareAction) => 
            this.shareAccessService.deleteShare(action.payload).pipe(
                map((response: DataResponse<Share>) => {         
                    return new DeleteShareActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteShareActionFail(err))
            )
        )
    )));
}