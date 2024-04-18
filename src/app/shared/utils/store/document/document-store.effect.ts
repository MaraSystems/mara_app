import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { UploadDocumentAction, UploadDocumentActionFail, UploadDocumentActionSuccess, DeleteDocumentAction, DeleteDocumentActionFail, DeleteDocumentActionSuccess, GetDocumentAction, GetDocumentActionFail, GetDocumentActionSuccess, ListDocumentsAction, ListDocumentsActionFail, ListDocumentsActionSuccess, DocumentActionsType, DownloadDocumentAction, DownloadDocumentActionFail, DownloadDocumentActionSuccess } from "./document-store.action";
import { RouterService } from "src/app/router/utils/router.service";
import { SetPopup } from "src/app/shared/features/popup/utils/store/popup.action";
import { DocumentAccessService } from "../../access/document/document-access.service";
import { DocumentData } from "../../models/document-data";
import { DownloadData } from "../../models/download-data";

@Injectable()
export class DocumentStoreEffect {
    constructor(
        private actions$: Actions,
        private documentAccessService: DocumentAccessService,
        private store: Store
    ){}

    uploadDocument$ = createEffect(() => this.actions$.pipe(
        ofType<UploadDocumentAction>(DocumentActionsType.UPLOAD_DOCUMENT),
        mergeMap((action: UploadDocumentAction) => 
            this.documentAccessService.uploadDocument(action.payload).pipe(
                map((response: DataResponse<DocumentData>) => {                    
                    this.store.dispatch(new AddToast({ description: 'Document Upload' }));
                    const popup = (action as UploadDocumentAction).popup as string;
                    this.store.dispatch(new SetPopup({ id: popup, action: 'close'}));   
                    return new UploadDocumentActionSuccess(response.data, action.payload._id);
                }),
                catchError(err => of(new UploadDocumentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Document Upload' }));
                    })
                ))
            )
        )
    ));

    downloadDocument$ = createEffect(() => this.actions$.pipe(
        ofType<DownloadDocumentAction>(DocumentActionsType.DOWNLOAD_DOCUMENT),
        mergeMap((action: DownloadDocumentAction) => 
            this.documentAccessService.downloadDocument(action.payload).pipe(
                map((response: DataResponse<string>) => {
                    return new DownloadDocumentActionSuccess({ id: action.payload._id, changes: { url: response.data } });
                }),
                catchError(err => of(new DownloadDocumentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Document Update', isError: true }));
                    })
                ))
            )
        )
    ));

    deleteDocument$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteDocumentAction>(DocumentActionsType.DELETE_DOCUMENT),
        mergeMap((action: DeleteDocumentAction) => 
            this.documentAccessService.deleteDocument(action.payload).pipe(
                map((response: DataResponse<DocumentData>) => {         
                    this.store.dispatch(new AddToast({ description: 'Document delete' }));
                    return new DeleteDocumentActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteDocumentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ description: 'Document delete', isError: true }));
                    })
                ))
            )
        )
    ));

    getDocument$ = createEffect(() => this.actions$.pipe(
        ofType<GetDocumentAction>(DocumentActionsType.GET_DOCUMENT),
        mergeMap((action: GetDocumentAction) => 
            this.documentAccessService.getDocument(action.payload).pipe(
                map((response: DataResponse<DocumentData>) => {                    
                    return new GetDocumentActionSuccess(response.data);
                }),
                catchError(err => of(new GetDocumentActionFail(err))
            )
        )
    )));

    listDocuments$ = createEffect(() => this.actions$.pipe(
        ofType<ListDocumentsAction>(DocumentActionsType.LIST_DOCUMENTS),
        mergeMap((action: ListDocumentsAction) => 
            this.documentAccessService.listDocuments(action.model, action.modelId).pipe(
                map((response: DataResponse<[DocumentData]>) => {                                        
                    return new ListDocumentsActionSuccess(response.data);
                }),
                catchError(err => of(new ListDocumentsActionFail(err))
            )
        )
    )));
}