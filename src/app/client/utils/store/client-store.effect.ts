import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ClientAccessService } from "../access/client-access.service";
import { ClientActionsType, GetClientAction, GetClientActionFail, GetClientActionSuccess, ListClientsAction, ListClientsActionFail, ListClientsActionSuccess, RegisterClientAction, RegisterClientActionFail, RegisterClientActionSuccess, UpdateClientAction, UpdateClientActionFail, UpdateClientActionSuccess } from "./client-store.action";
import { Client } from "../models/client";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastEnum } from "src/app/general/features/toast/utils/models/toast.enum";

@Injectable()
export class ClientStoreEffect {    
    constructor(
        private actions$: Actions,
        private clientAccessService: ClientAccessService,
        private store: Store,
        private routerService: RouterService
    ){}

    registerClient$ = createEffect(() => this.actions$.pipe(
        ofType<RegisterClientAction>(ClientActionsType.REGISTER_CLIENT),
        mergeMap((action: RegisterClientAction) => 
            this.clientAccessService.registerClient(action.payload).pipe(
                map((response: DataResponse<Client>) => {
                    this.store.dispatch(new AddToast({ description: 'User Registration' }));
                    this.routerService.navigate('/auth');
                    return new RegisterClientActionSuccess(response.data);
                }),
                catchError(err => of(new RegisterClientActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast({ type: ToastEnum.ERROR, description: 'User Registration' }));
                    })
                ))
            )
        )
    ));

    updateClient$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateClientAction>(ClientActionsType.UPDATE_CLIENT),
        mergeMap((action: UpdateClientAction) => 
            this.clientAccessService.updateClient(action.payload).pipe(
                map((response: DataResponse<Client>) => { 
                    const { sideEffects } = (action as UpdateClientAction);
                    if (sideEffects.success) {
                        sideEffects.success();
                    }
                    this.routerService.navigate('/profile/info'); 
                    return new UpdateClientActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateClientActionFail(err)).pipe(
                    tap(() => {
                        const { sideEffects } = (action as UpdateClientAction);
                        if (sideEffects.failure) {
                            sideEffects.failure();
                        }
                    })
                ))
            )
        )
    ));

    getClient$ = createEffect(() => this.actions$.pipe(
        ofType<GetClientAction>(ClientActionsType.GET_CLIENT),
        mergeMap((action: GetClientAction) => 
            this.clientAccessService.getClient(action.payload).pipe(
                map((response: DataResponse<Client>) => {                    
                    return new GetClientActionSuccess(response.data, action.auth);
                }),
                catchError(err => of(new GetClientActionFail(err)))
            )
        )
    ));

    listProjects$ = createEffect(() => this.actions$.pipe(
        ofType<ListClientsAction>(ClientActionsType.LIST_CLIENTS),
        mergeMap((action: ListClientsAction) => 
            this.clientAccessService.listClients(action.payload, action.aggregation, action.options).pipe(
                map((response: DataResponse<[Client]>) => {                    
                    return new ListClientsActionSuccess(response.data, action.payload);
                }),
                catchError(err => of(new ListClientsActionFail(err))
            )
        )
    )));
}