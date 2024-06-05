import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Notification } from "../models/notification.model";
import { ListOptions } from "src/app/general/utils/models/list-options";
import { SideEffects } from "src/app/general/utils/models/side.effects";

export enum NotificationActionsType {
    READ_NOTIFICATION = "[NOTIFICATION] Read Notification",
    READ_NOTIFICATION_SUCCESS = "[NOTIFICATION] Read Notification Success",
    READ_NOTIFICATION_FAIL = "[NOTIFICATION] Read Notification Fail",

    GET_NOTIFICATION = "[NOTIFICATION] Get Notification",
    GET_NOTIFICATION_SUCCESS = "[NOTIFICATION] Get Notification Success",
    GET_NOTIFICATION_FAIL = "[NOTIFICATION] Get Notification Fail",

    LIST_NOTIFICATIONS = "[NOTIFICATION] List Notifications",
    LIST_NOTIFICATIONS_SUCCESS = "[NOTIFICATION] List Notifications Success",
    LIST_NOTIFICATIONS_FAIL = "[NOTIFICATION] List Notifications Fail",
}

export class ReadNotificationAction implements Action {
    readonly type = NotificationActionsType.READ_NOTIFICATION;
    constructor(public payload: { id: string, userId: string }, public sideEffects = new SideEffects()){}
}

export class ReadNotificationActionSuccess implements Action {
    readonly type = NotificationActionsType.READ_NOTIFICATION_SUCCESS;
    constructor(public payload: Update<Notification>){}
}

export class ReadNotificationActionFail implements Action {
    readonly type = NotificationActionsType.READ_NOTIFICATION_FAIL;
    constructor(public payload: string){}
}

export class GetNotificationAction implements Action {
    readonly type = NotificationActionsType.GET_NOTIFICATION;
    constructor(public payload: string){}
}

export class GetNotificationActionSuccess implements Action {
    readonly type = NotificationActionsType.GET_NOTIFICATION_SUCCESS;
    constructor(public payload: Notification){}
}

export class GetNotificationActionFail implements Action {
    readonly type = NotificationActionsType.GET_NOTIFICATION_FAIL;
    constructor(public payload: string){}
}

export class ListNotificationsAction implements Action {
    readonly type = NotificationActionsType.LIST_NOTIFICATIONS;
    constructor(public payload: ListOptions){}
}

export class ListNotificationsActionSuccess implements Action {
    readonly type = NotificationActionsType.LIST_NOTIFICATIONS_SUCCESS;
    constructor(public payload: Notification[]){}
}

export class ListNotificationsActionFail implements Action {
    readonly type = NotificationActionsType.LIST_NOTIFICATIONS_FAIL;
    constructor(public payload: string){}
}


export type NotificationAction =
ReadNotificationAction |
ReadNotificationActionSuccess |
ReadNotificationActionFail |
GetNotificationAction |
GetNotificationActionSuccess |
GetNotificationActionFail |
ListNotificationsAction |
ListNotificationsActionSuccess |
ListNotificationsActionFail;