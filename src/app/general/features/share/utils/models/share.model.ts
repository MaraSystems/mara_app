import { ShareAccessEnum } from "./share.access-enum";
import { ShareEnum } from "./share.enum";
import { SharePrivacyEnum } from "./share.privacy-enum";
import { ShareStateEnum } from "./share.state-enum";

export interface Share {
    _id: string;
    email: string;
    userId: string;
    model: ShareEnum,
    modelId: string;
    access: ShareAccessEnum;
    state: ShareStateEnum;
    fullname?: string;
    image?: string;
}