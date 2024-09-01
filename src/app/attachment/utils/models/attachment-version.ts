import { FileType } from "./file-type";

export interface AttachmentVersion {
    _v: number;
    date: Date;
    path: string;
    url?: string;
    previews: string[];
    // type: FileType;
}