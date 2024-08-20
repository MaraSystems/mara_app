import { NotificationLink } from "./notification-link";
import { NotificationType } from "./notification-type";
import { NotificationUser } from "./notification-user";


export interface Notification {
    _id: string;
    subject: string;
    createdAt: Date;
    updatedAt: Date;
    hidden: boolean;
    model: NotificationType;
    modelId: string;
    users: NotificationUser[];
    description: string;
    links: NotificationLink[];
}