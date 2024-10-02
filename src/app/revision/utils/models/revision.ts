import { RevisionStatus } from "./revision-status";
import { RevisionType } from "./revision-type";

export interface Revision {
    _id: string;
    userId: string;
    reviewerId: string;
    commentId: string;
    comments: string[];
    status: RevisionStatus;
    model: RevisionType;
    modelId: string;
    createdAt: Date;
    updatedAt: Date;
}