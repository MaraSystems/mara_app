import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { NotificationAccessService } from "../access/notification-access.service";
import { GetNotificationAction, GetNotificationActionFail, GetNotificationActionSuccess, ListNotificationsAction, ListNotificationsActionFail, ListNotificationsActionSuccess, NotificationActionsType, ReadNotificationAction, ReadNotificationActionFail, ReadNotificationActionSuccess } from "./notification-store.action";
import { Notification } from "../models/notification.model";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class NotificationStoreEffect {
    constructor(
        private actions$: Actions,
        private notificationAccessService: NotificationAccessService,
        private store: Store,
        private router: Router,
    ){}

    readNotification$ = createEffect(() => this.actions$.pipe(
        ofType<ReadNotificationAction>(NotificationActionsType.READ_NOTIFICATION),
        mergeMap((action: ReadNotificationAction) => 
            this.notificationAccessService.readNotification(action.payload.id, action.payload.userId).pipe(
                map((response: DataResponse<Notification>) => {     
                    handleSuccessSideEffects((action as ReadNotificationAction).sideEffects);
                    return new ReadNotificationActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new ReadNotificationActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as ReadNotificationAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getNotification$ = createEffect(() => this.actions$.pipe(
        ofType<GetNotificationAction>(NotificationActionsType.GET_NOTIFICATION),
        mergeMap((action: GetNotificationAction) => 
            this.notificationAccessService.getNotification(action.payload).pipe(
                map((response: DataResponse<Notification>) => {                                        
                    return new GetNotificationActionSuccess(response.data);
                }),
                catchError(err => of(new GetNotificationActionFail(err))
            )
        )
    )));

    listNotifications$ = createEffect(() => this.actions$.pipe(
        ofType<ListNotificationsAction>(NotificationActionsType.LIST_NOTIFICATIONS),
        mergeMap((action: ListNotificationsAction) => 
            this.notificationAccessService.listNotifications(action.userId, action.payload).pipe(
                map((response: DataResponse<[Notification]>) => {                                                            
                    return new ListNotificationsActionSuccess(response.data);
                }),
                catchError(err => of(new ListNotificationsActionFail(err))
            )
        )
    )));
}