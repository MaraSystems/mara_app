import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { UploadAttachmentAction, UploadAttachmentActionFail, UploadAttachmentActionSuccess, DeleteAttachmentAction, DeleteAttachmentActionFail, DeleteAttachmentActionSuccess, GetAttachmentAction, GetAttachmentActionFail, GetAttachmentActionSuccess, ListAttachmentsAction, ListAttachmentsActionFail, ListAttachmentsActionSuccess, AttachmentActionsType, DownloadAttachmentAction, DownloadAttachmentActionFail, DownloadAttachmentActionSuccess } from "./attatchment-store.action";
import { SetPopup } from "src/app/shared/features/popup/utils/store/popup.action";
import { AttachmentAccessService } from "../access/attatchment-access.service";
import { Attachment } from "../models/attatchment.model";

@Injectable()
export class AttachmentStoreEffect {
    constructor(
        private actions$: Actions,
        private attachmentAccessService: AttachmentAccessService,
        private store: Store
    ){}

    uploadAttachment$ = createEffect(() => this.actions$.pipe(
        ofType<UploadAttachmentAction>(AttachmentActionsType.UPLOAD_ATTACHMENT),
        mergeMap((action: UploadAttachmentAction) => 
            this.attachmentAccessService.uploadAttachment(action.payload).pipe(
                map((response: DataResponse<Attachment>) => {                    
                    this.store.dispatch(new AddToast({ description: 'Attachment Upload' }));
                    const popup = (action as UploadAttachmentAction).popup as string;
                    this.store.dispatch(new SetPopup({ tag: popup, action: 'close'}));   
                    return new UploadAttachmentActionSuccess(response.data, action.payload._id);
                }),
                catchError(err => of(new UploadAttachmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Attachment Upload' }));
                    })
                ))
            )
        )
    ));

    downloadAttachment$ = createEffect(() => this.actions$.pipe(
        ofType<DownloadAttachmentAction>(AttachmentActionsType.DOWNLOAD_ATTACHMENT),
        mergeMap((action: DownloadAttachmentAction) => 
            this.attachmentAccessService.downloadAttachment(action.payload).pipe(
                map((response: DataResponse<string>) => {
                    return new DownloadAttachmentActionSuccess({ id: action.payload._id, changes: { url: response.data } });
                }),
                catchError(err => of(new DownloadAttachmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Attachment Update', isError: true }));
                    })
                ))
            )
        )
    ));

    deleteAttachment$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteAttachmentAction>(AttachmentActionsType.DELETE_ATTACHMENT),
        mergeMap((action: DeleteAttachmentAction) => 
            this.attachmentAccessService.deleteAttachment(action.payload).pipe(
                map((response: DataResponse<Attachment>) => {         
                    this.store.dispatch(new AddToast({ description: 'Attachment delete' }));
                    return new DeleteAttachmentActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteAttachmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Attachment delete', isError: true }));
                    })
                ))
            )
        )
    ));

    getAttachment$ = createEffect(() => this.actions$.pipe(
        ofType<GetAttachmentAction>(AttachmentActionsType.GET_ATTACHMENT),
        mergeMap((action: GetAttachmentAction) => 
            this.attachmentAccessService.getAttachment(action.payload).pipe(
                map((response: DataResponse<Attachment>) => {                    
                    return new GetAttachmentActionSuccess(response.data);
                }),
                catchError(err => of(new GetAttachmentActionFail(err))
            )
        )
    )));

    listAttachments$ = createEffect(() => this.actions$.pipe(
        ofType<ListAttachmentsAction>(AttachmentActionsType.LIST_ATTACHMENTS),
        mergeMap((action: ListAttachmentsAction) => 
            this.attachmentAccessService.listAttachments(action.model, action.modelId).pipe(
                map((response: DataResponse<[Attachment]>) => {                                        
                    return new ListAttachmentsActionSuccess(response.data);
                }),
                catchError(err => of(new ListAttachmentsActionFail(err))
            )
        )
    )));
}