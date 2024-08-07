import { AttachmentModelEnum } from "./attachment-model.enum";

export interface Attachment {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    path: string;
    version: number;
    model: AttachmentModelEnum;
    modelId: string;
    url: string;
}