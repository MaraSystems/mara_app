import { ShareAccessType } from "./share-access";
import { Share } from "./share";
import { SharePrivacyType } from "./share-privacy";

export interface Privacy {
    type: SharePrivacyType;
    access: ShareAccessType;
}