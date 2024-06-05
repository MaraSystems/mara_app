import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Notification } from "../models/notification.model";
import { GetNotificationActionFail, GetNotificationActionSuccess, ListNotificationsActionFail, ListNotificationsActionSuccess, NotificationActionsType, ReadNotificationActionFail, ReadNotificationActionSuccess } from "./notification-store.action";

export interface NotificationState extends EntityState<Notification> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const notificationAdapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
    selectId: (notification: Notification) => notification._id
});

export const defualtIssue: NotificationState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = notificationAdapter.getInitialState(defualtIssue);

export function notificationReducer(state = initialState, action: Action): NotificationState {
    switch (action.type) {
        case NotificationActionsType.READ_NOTIFICATION:
            return { ...state, loading: true, loaded: false };

        case NotificationActionsType.READ_NOTIFICATION_SUCCESS:
            const updatePayload = (action as ReadNotificationActionSuccess).payload;            
            return notificationAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case NotificationActionsType.READ_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ReadNotificationActionFail).payload
            }   
            
        case NotificationActionsType.GET_NOTIFICATION:
            return { ...state, loading: true, loaded: false };

        case NotificationActionsType.GET_NOTIFICATION_SUCCESS:
            const { payload: getPayload } = (action as GetNotificationActionSuccess);            
            return notificationAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case NotificationActionsType.GET_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetNotificationActionFail).payload
            } 

        case NotificationActionsType.LIST_NOTIFICATIONS:
            return { ...state, loading: true, loaded: false };

        case NotificationActionsType.LIST_NOTIFICATIONS_SUCCESS:
            const { payload: listPayload } = (action as ListNotificationsActionSuccess);
            return notificationAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case NotificationActionsType.LIST_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListNotificationsActionFail).payload
            } 
        
        default:
            return state;
    }
}