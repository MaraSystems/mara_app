import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NotificationState, notificationAdapter } from "./notification-store.reducer";
import { Notification } from "../models/notification.model";

export const clientSelector = createFeatureSelector<Readonly<NotificationState>>('notifications');

export const selectAllClientNotifications = (userId: string) => createSelector(
    clientSelector,
    state => notificationAdapter.getSelectors()
        .selectAll(state)
        .filter(note => {            
            return note.users.filter(user => user.userId === userId);
        }) as Notification[]
);

export const selectNotificationById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Notification
);