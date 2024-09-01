import { RevisionDecision } from "./revision-decision";
import { RevisionType } from "./revision.type";

export interface Revision {
    _id: string;
    reviewerId: string;
    requesterId: string;
    comments: string[];
    decision: RevisionDecision;
    model: RevisionType;
    modelId: string;
    createdAt: Date;
    updatedAt: Date;
}