import { ShareAccessType } from "./share-access-type";
import { ShareStateType } from "./share-state-type";
import { ShareType } from "./share-type";


export interface Share {
    _id: string;
    email: string;
    userId: string;
    model: ShareType,
    modelId: string;
    access: ShareAccessType;
    state: ShareStateType;
    fullname?: string;
    image?: string;
}