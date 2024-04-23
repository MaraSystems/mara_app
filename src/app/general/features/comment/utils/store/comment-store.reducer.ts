import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Comment } from "../models/comment.model";
import { CreateCommentActionFail, CreateCommentActionSuccess, DeleteCommentActionFail, DeleteCommentActionSuccess, GetCommentActionFail, GetCommentActionSuccess, ListCommentsActionFail, ListCommentsActionSuccess, CommentActionsType, UpdateCommentActionSuccess, UpdateCommentActionFail } from "./comment-store.action";

export interface CommentState extends EntityState<Comment> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const commentAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
    selectId: (comment: Comment) => comment._id
});

export const defualtIssue: CommentState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = commentAdapter.getInitialState(defualtIssue);

export function commentReducer(state = initialState, action: Action): CommentState {
    switch (action.type) {
        case CommentActionsType.CREATE_COMMENT:
            return { ...state, loading: true, loaded: false };

        case CommentActionsType.CREATE_COMMENT_SUCCESS:
            const createPayload = (action as CreateCommentActionSuccess).payload;
            return commentAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case CommentActionsType.CREATE_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateCommentActionFail).payload
            }    
            
        case CommentActionsType.GET_COMMENT:
            return { ...state, loading: true, loaded: false };

        case CommentActionsType.GET_COMMENT_SUCCESS:
            const { payload: getPayload } = (action as GetCommentActionSuccess);            
            return commentAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case CommentActionsType.GET_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetCommentActionFail).payload
            } 

        case CommentActionsType.LIST_COMMENTS:
            return { ...state, loading: true, loaded: false };

        case CommentActionsType.LIST_COMMENTS_SUCCESS:
            const { payload: listPayload } = (action as ListCommentsActionSuccess);
            return commentAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case CommentActionsType.LIST_COMMENTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListCommentsActionFail).payload
            } 
        
        case CommentActionsType.DELETE_COMMENT:
            return { ...state, loading: true, loaded: false };

        case CommentActionsType.DELETE_COMMENT_SUCCESS:
            const { payload: deletePayload } = (action as DeleteCommentActionSuccess);
            return commentAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case CommentActionsType.DELETE_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteCommentActionFail).payload
            } 

        case CommentActionsType.UPDATE_COMMENT:
            return { ...state, loading: true, loaded: false };

        case CommentActionsType.UPDATE_COMMENT_SUCCESS:
            const { payload: updatePayload } = (action as UpdateCommentActionSuccess);
            return commentAdapter.updateOne(updatePayload , { ...state, loading: false, loaded: true })   
            
        case CommentActionsType.UPDATE_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateCommentActionFail).payload
            } 
    
        
        default:
            return state;
    }
}