import { CommentEnum } from "./comment.enum";

export interface Comment {
    _id: string;
    userId: string;
    model: CommentEnum;
    modelId: string;
    statement: string;
    attachments: string[];
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
}
