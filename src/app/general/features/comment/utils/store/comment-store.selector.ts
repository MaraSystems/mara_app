import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentState, commentAdapter } from "./comment-store.reducer";
import { Comment } from "../models/comment";
import { CommentType } from "../models/comment-type";

export const clientSelector = createFeatureSelector<Readonly<CommentState>>('comments');

export const selectCommentsByModelId = (model: CommentType, id: string) => createSelector(
    clientSelector,
    state => {
        const comments = Object.values(state.entities) as Comment[];                
        return comments.filter(comment => (comment.model === model && comment.modelId === id));
    }
);

export const selectCommentById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Comment
);