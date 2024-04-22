import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Comment } from "../models/comment.model";
import { ListPayload } from "src/app/shared/utils/models/list-payload";
import { SideEffects } from "src/app/shared/utils/models/side.effects";

export enum CommentActionsType {
    CREATE_COMMENT = "[COMMENT] Create Comment",
    CREATE_COMMENT_SUCCESS = "[COMMENT] Create Comment Success",
    CREATE_COMMENT_FAIL = "[COMMENT] Create Comment Fail",

    GET_COMMENT = "[COMMENT] Get Comment",
    GET_COMMENT_SUCCESS = "[COMMENT] Get Comment Success",
    GET_COMMENT_FAIL = "[COMMENT] Get Comment Fail",

    LIST_COMMENTS = "[COMMENT] List Comments",
    LIST_COMMENTS_SUCCESS = "[COMMENT] List Comments Success",
    LIST_COMMENTS_FAIL = "[COMMENT] List Comments Fail",

    DELETE_COMMENT = "[COMMENT] Delete Comment",
    DELETE_COMMENT_SUCCESS = "[COMMENT] Delete Comment Success",
    DELETE_COMMENT_FAIL = "[COMMENT] Delete Comment Fail",
}

export class CreateCommentAction implements Action {
    readonly type = CommentActionsType.CREATE_COMMENT;
    constructor(public payload: Comment){}
}

export class CreateCommentActionSuccess implements Action {
    readonly type = CommentActionsType.CREATE_COMMENT_SUCCESS;
    constructor(public payload: Comment){}
}

export class CreateCommentActionFail implements Action {
    readonly type = CommentActionsType.CREATE_COMMENT_FAIL;
    constructor(public payload: string){}
}

export class GetCommentAction implements Action {
    readonly type = CommentActionsType.GET_COMMENT;
    constructor(public payload: string){}
}

export class GetCommentActionSuccess implements Action {
    readonly type = CommentActionsType.GET_COMMENT_SUCCESS;
    constructor(public payload: Comment){}
}

export class GetCommentActionFail implements Action {
    readonly type = CommentActionsType.GET_COMMENT_FAIL;
    constructor(public payload: string){}
}

export class ListCommentsAction implements Action {
    readonly type = CommentActionsType.LIST_COMMENTS;
    constructor(public model: string, public modelId: string, public payload?: ListPayload){}
}

export class ListCommentsActionSuccess implements Action {
    readonly type = CommentActionsType.LIST_COMMENTS_SUCCESS;
    constructor(public payload: Comment[]){}
}

export class ListCommentsActionFail implements Action {
    readonly type = CommentActionsType.LIST_COMMENTS_FAIL;
    constructor(public payload: string){}
}

export class DeleteCommentAction implements Action {
    readonly type = CommentActionsType.DELETE_COMMENT;
    constructor(public payload: string){}
}

export class DeleteCommentActionSuccess implements Action {
    readonly type = CommentActionsType.DELETE_COMMENT_SUCCESS;
    constructor(public payload: Comment){}
}

export class DeleteCommentActionFail implements Action {
    readonly type = CommentActionsType.DELETE_COMMENT_FAIL;
    constructor(public payload: string){}
}

export type CommentAction = 
CreateCommentAction |
CreateCommentActionSuccess |
CreateCommentActionFail |
GetCommentAction |
GetCommentActionSuccess |
GetCommentActionFail |
ListCommentsAction |
ListCommentsActionSuccess |
ListCommentsActionFail |
DeleteCommentAction |
DeleteCommentActionSuccess |
DeleteCommentActionFail;