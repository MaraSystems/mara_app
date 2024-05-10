import { ShareAccessEnum } from "./share.access-enum";
import { ShareEnum } from "./share.enum";
import { SharePrivacyEnum } from "./share.privacy-enum";

export interface Privacy {
    type: SharePrivacyEnum;
    access: ShareAccessEnum;
}