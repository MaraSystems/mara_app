export interface Attachment {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    path: string;
    version: number;
    model: string;
    modelId: string;
    url: string;
}