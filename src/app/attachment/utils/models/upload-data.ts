import { AttachmentType } from "./attachment-type";
import { FileType } from "./file-type";

export interface UploadData {
    _id?: string;
    name: string;
    model: AttachmentType;
    modelId: string;
    data: string;
    // type: FileType;
}