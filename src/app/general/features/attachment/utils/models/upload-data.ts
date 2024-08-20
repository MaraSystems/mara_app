import { AttachmentType } from "./attachment-type";

export interface UploadData {
    _id?: string;
    name: string;
    model: AttachmentType;
    modelId: string;
    data: string;
}