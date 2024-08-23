import { CommentEnum } from "./comment.enum";

export interface Comment {
    _id: string;
    userId: string;
    model: CommentEnum;
    modelId: string;
    statement: string;
    attachment: string;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    bookmarks: string[];
}
