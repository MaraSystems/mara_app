import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { UploadAttachmentAction, UploadAttachmentActionFail, UploadAttachmentActionSuccess, DeleteAttachmentAction, DeleteAttachmentActionFail, DeleteAttachmentActionSuccess, GetAttachmentAction, GetAttachmentActionFail, GetAttachmentActionSuccess, ListAttachmentsAction, ListAttachmentsActionFail, ListAttachmentsActionSuccess, AttachmentActionsType, UpdateAttachmentAction, UpdateAttachmentActionSuccess } from "./attachment-store.action";
import { AttachmentAccessService } from "../access/attachment-access.service";
import { Attachment } from "../models/attachment";
import { ToastType } from "../../../general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

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
                    handleSuccessSideEffects((action as UploadAttachmentAction).sideEffects);
                    return new UploadAttachmentActionSuccess(response.data, action.payload._id);
                }),
                catchError(err => of(new UploadAttachmentActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UploadAttachmentAction).sideEffects);
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
                    this.store.dispatch(new AddToast({ title: 'Attachment delete' }));
                    return new DeleteAttachmentActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteAttachmentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ title: 'Attachment delete', type: ToastType.ERROR }));
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
                map((response: DataResponse<Attachment[]>) => {                                        
                    return new ListAttachmentsActionSuccess(response.data);
                }),
                catchError(err => of(new ListAttachmentsActionFail(err))
            )
        )
    )));

    updateAttachment$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateAttachmentAction>(AttachmentActionsType.UPDATE_ATTACHMENT),
        mergeMap((action: UpdateAttachmentAction) => 
            this.attachmentAccessService.updateAttachment(action.payload).pipe(
                map((response: DataResponse<Attachment>) => {            
                    handleSuccessSideEffects((action as UpdateAttachmentAction).sideEffects);
                    return new UpdateAttachmentActionSuccess({ ...action.payload, changes: response.data });
                }),
                catchError(err => of(new UpdateAttachmentAction(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateAttachmentAction).sideEffects);
                    })
                ))
            )
        )
    ));
}