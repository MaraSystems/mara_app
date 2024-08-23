import { RevisionDecision } from "./revision-decision";
import { RevisionStatus } from "./revision-status";
import { RevisionType } from "./revision.type";

export interface Revision {
    _id: string;
    reviewerId: string;
    requesterId: string;
    comments: string[];
    status: RevisionStatus;
    decision: RevisionDecision;
    model: RevisionType;
    modelId: string;
    createdAt: Date;
    updatedAt: Date;
}