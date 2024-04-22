import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { CommentAccessService } from "../access/comment-access.service";
import { CreateCommentAction, CreateCommentActionFail, CreateCommentActionSuccess, DeleteCommentAction, DeleteCommentActionFail, DeleteCommentActionSuccess, GetCommentAction, GetCommentActionFail, GetCommentActionSuccess, ListCommentsAction, ListCommentsActionFail, ListCommentsActionSuccess, CommentActionsType } from "./comment-store.action";
import { Comment } from "../models/comment.model";
import { SetPopup } from "src/app/shared/features/popup/utils/store/popup.action";

@Injectable()
export class CommentStoreEffect {
    constructor(
        private actions$: Actions,
        private commentAccessService: CommentAccessService,
        private store: Store,
        private router: Router,
    ){}

    createComment$ = createEffect(() => this.actions$.pipe(
        ofType<CreateCommentAction>(CommentActionsType.CREATE_COMMENT),
        mergeMap((action: CreateCommentAction) => 
            this.commentAccessService.createComment(action.payload).pipe(
                map((response: DataResponse<Comment>) => {
                    this.store.dispatch(new AddToast({ description: 'Comment Creation' }));
                    this.router.navigateByUrl('/comments');
                    return new CreateCommentActionSuccess(response.data);
                }),
                catchError(err => of(new CreateCommentActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ isError: true, description: 'Comment Creation' }));
                    })
                ))
            )
        )
    ));

    getComment$ = createEffect(() => this.actions$.pipe(
        ofType<GetCommentAction>(CommentActionsType.GET_COMMENT),
        mergeMap((action: GetCommentAction) => 
            this.commentAccessService.getComment(action.payload).pipe(
                map((response: DataResponse<Comment>) => {                                        
                    return new GetCommentActionSuccess(response.data);
                }),
                catchError(err => of(new GetCommentActionFail(err))
            )
        )
    )));

    listComments$ = createEffect(() => this.actions$.pipe(
        ofType<ListCommentsAction>(CommentActionsType.LIST_COMMENTS),
        mergeMap((action: ListCommentsAction) => 
            this.commentAccessService.listComments(action.payload).pipe(
                map((response: DataResponse<[Comment]>) => {                    
                    return new ListCommentsActionSuccess(response.data);
                }),
                catchError(err => of(new ListCommentsActionFail(err))
            )
        )
    )));

    deleteComment$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteCommentAction>(CommentActionsType.DELETE_COMMENT),
        mergeMap((action: DeleteCommentAction) => 
            this.commentAccessService.deleteComment(action.payload).pipe(
                map((response: DataResponse<Comment>) => {         
                    this.store.dispatch(new AddToast({ description: 'Comment Deleted' }));
                    this.router.navigateByUrl('/comments');           
                    return new DeleteCommentActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteCommentActionFail(err))
            )
        )
    )));
}