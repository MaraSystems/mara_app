import { NotificationLink } from "./notification-link.model";
import { NotificationModelEnum } from "./notification-model.enum";
import { NotificationUser } from "./notification-user.model";

export interface Notification {
    _id: string;
    subject: string;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
    model: NotificationModelEnum;
    modelId: string;
    users: NotificationUser[];
    description: string;
    links: NotificationLink[];
}