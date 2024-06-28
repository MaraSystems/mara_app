import { AttachmentModelEnum } from "./attatchment-model.enum";

export interface UploadData {
    _id?: string;
    name: string;
    model: AttachmentModelEnum;
    modelId: string;
    data: string;
}