export interface AttachmentVersion {
    _v: number;
    date: Date;
    path: string;
    url?: string;
    previews: string[];
}