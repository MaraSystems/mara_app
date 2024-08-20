import { NotificationStatusType } from "./notification-status-type";

export interface NotificationUser {
    userId: string;
    status: NotificationStatusType
}