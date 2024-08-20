import { AttachmentType } from "./attachment-type";
import { AttachmentVersion } from "./attachment-version";

export interface Attachment {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    path: string;
    versions: AttachmentVersion[];
    model: AttachmentType;
    modelId: string;
    url: string;
}