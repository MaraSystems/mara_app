import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ClientAccessService } from "../access/client-access.service";
import { ClientActionsType, GetClientAction, GetClientActionFail, GetClientActionSuccess, ListClientsAction, ListClientsActionFail, ListClientsActionSuccess, CreateClientAction, CreateClientActionFail, CreateClientActionSuccess, UpdateClientAction, UpdateClientActionFail, UpdateClientActionSuccess } from "./client-store.action";
import { Client } from "../models/client";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class ClientStoreEffect {    
    constructor(
        private actions$: Actions,
        private clientAccessService: ClientAccessService,
        private store: Store,
    ){}

    createClient$ = createEffect(() => this.actions$.pipe(
        ofType<CreateClientAction>(ClientActionsType.CREATE_CLIENT),
        mergeMap((action: CreateClientAction) => 
            this.clientAccessService.createClient(action.payload).pipe(
                map((response: DataResponse<Client>) => {
                    handleSuccessSideEffects((action as CreateClientAction).sideEffects);
                    return new CreateClientActionSuccess(response.data);
                }),
                catchError(err => of(new CreateClientActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateClientAction).sideEffects);
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
                    handleSuccessSideEffects((action as UpdateClientAction).sideEffects);
                    return new UpdateClientActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateClientActionFail(err)).pipe(
                    tap(() => {
                        handleSuccessSideEffects((action as UpdateClientAction).sideEffects);
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
            this.clientAccessService.listClients(action.payload, action.options).pipe(
                map((response: DataResponse<[Client]>) => {                    
                    return new ListClientsActionSuccess(response.data, action.payload);
                }),
                catchError(err => of(new ListClientsActionFail(err))
            )
        )
    )));
}