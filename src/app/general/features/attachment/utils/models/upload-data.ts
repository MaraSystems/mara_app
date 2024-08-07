import { AttachmentModelEnum } from "./attachment-model.enum";

export interface UploadData {
    _id?: string;
    name: string;
    model: AttachmentModelEnum;
    modelId: string;
    data: string;
}