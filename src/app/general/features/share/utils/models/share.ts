import { ShareAccessType } from "./share-access";
import { ShareType } from "./share-type";


export interface Share {
    _id: string;
    email: string;
    userId: string;
    model: ShareType,
    modelId: string;
    access: ShareAccessType;
    state: ShareType;
    fullname?: string;
    image?: string;
}