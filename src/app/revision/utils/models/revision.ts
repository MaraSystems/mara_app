import { RevisionStatus } from "./revision-status.enum";

export interface Revision {
    _id: string;
    userId: string;
    comments: string[];
    status: RevisionStatus;
}