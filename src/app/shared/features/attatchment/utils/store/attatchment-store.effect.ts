import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { UploadAttatchmentAction, UploadAttatchmentActionFail, UploadAttatchmentActionSuccess, DeleteAttatchmentAction, DeleteAttatchmentActionFail, DeleteAttatchmentActionSuccess, GetAttatchmentAction, GetAttatchmentActionFail, GetAttatchmentActionSuccess, ListAttatchmentsAction, ListAttatchmentsActionFail, ListAttatchmentsActionSuccess, AttatchmentActionsType, DownloadAttatchmentAction, DownloadAttatchmentActionFail, DownloadAttatchmentActionSuccess } from "./attatchment-store.action";
import { RouterService } from "src/app/router/utils/router.service";
import { SetPopup } from "src/app/shared/features/popup/utils/store/popup.action";
import { AttatchmentAccessService } from "../access/attatchment-access.service";
import { Attatchment } from "../models/attatchment.model";

@Injectable()
export class AttatchmentStoreEffect {
    constructor(
        private actions$: Actions,
        private attatchmentAccessService: AttatchmentAccessService,
        private store: Store
    ){}

    uploadAttatchment$ = createEffect(() => this.actions$.pipe(
        ofType<UploadAttatchmentAction>(AttatchmentActionsType.UPLOAD_ATTATCHMENT),
        mergeMap((action: UploadAttatchmentAction) => 
            this.attatchmentAccessService.uploadAttatchment(action.payload).pipe(
                map((response: DataResponse<Attatchment>) => {                    
                    this.store.dispatch(new AddToast({ description: 'Attatchment Upload' }));
                    const popup = (action as UploadAttatchmentAction).popup as string;
                    this.store.dispatch(new SetPopup({ tag: popup, action: 'close'}));   
                    return new UploadAttatchmentActionSuccess(response.data, action.payload._id);
                }),
                catchError(err => of(new UploadAttatchmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Attatchment Upload' }));
                    })
                ))
            )
        )
    ));

    downloadAttatchment$ = createEffect(() => this.actions$.pipe(
        ofType<DownloadAttatchmentAction>(AttatchmentActionsType.DOWNLOAD_ATTATCHMENT),
        mergeMap((action: DownloadAttatchmentAction) => 
            this.attatchmentAccessService.downloadAttatchment(action.payload).pipe(
                map((response: DataResponse<string>) => {
                    return new DownloadAttatchmentActionSuccess({ id: action.payload._id, changes: { url: response.data } });
                }),
                catchError(err => of(new DownloadAttatchmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Attatchment Update', isError: true }));
                    })
                ))
            )
        )
    ));

    deleteAttatchment$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteAttatchmentAction>(AttatchmentActionsType.DELETE_ATTATCHMENT),
        mergeMap((action: DeleteAttatchmentAction) => 
            this.attatchmentAccessService.deleteAttatchment(action.payload).pipe(
                map((response: DataResponse<Attatchment>) => {         
                    this.store.dispatch(new AddToast({ description: 'Attatchment delete' }));
                    return new DeleteAttatchmentActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteAttatchmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Attatchment delete', isError: true }));
                    })
                ))
            )
        )
    ));

    getAttatchment$ = createEffect(() => this.actions$.pipe(
        ofType<GetAttatchmentAction>(AttatchmentActionsType.GET_ATTATCHMENT),
        mergeMap((action: GetAttatchmentAction) => 
            this.attatchmentAccessService.getAttatchment(action.payload).pipe(
                map((response: DataResponse<Attatchment>) => {                    
                    return new GetAttatchmentActionSuccess(response.data);
                }),
                catchError(err => of(new GetAttatchmentActionFail(err))
            )
        )
    )));

    listAttatchments$ = createEffect(() => this.actions$.pipe(
        ofType<ListAttatchmentsAction>(AttatchmentActionsType.LIST_ATTATCHMENTS),
        mergeMap((action: ListAttatchmentsAction) => 
            this.attatchmentAccessService.listAttatchments(action.model, action.modelId).pipe(
                map((response: DataResponse<[Attatchment]>) => {                                        
                    return new ListAttatchmentsActionSuccess(response.data);
                }),
                catchError(err => of(new ListAttatchmentsActionFail(err))
            )
        )
    )));
}