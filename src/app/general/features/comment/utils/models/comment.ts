import { CommentType } from "./comment-type";

export interface Comment {
    _id: string;
    userId: string;
    model: CommentType;
    modelId: string;
    statement: string;
    attachment: string;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    bookmarks: string[];
}
