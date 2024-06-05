import { NotificationStatusEnum } from "./notification-status.enum";

export interface NotificationUser {
    userId: string;
    status: NotificationStatusEnum
}