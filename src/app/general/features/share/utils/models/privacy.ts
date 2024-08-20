import { ShareAccessType } from "./share-access-type";
import { Share } from "./share";
import { SharePrivacyType } from "./share-privacy-type";

export interface Privacy {
    type: SharePrivacyType;
    access: ShareAccessType;
}