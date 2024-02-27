import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ClientAccessService } from "../access/client-access.service";
import { ClientActionsType, GetClientAction, GetClientActionFail, GetClientActionSuccess, RegisterClientAction, RegisterClientActionFail, RegisterClientActionSuccess, UpdateClientAction, UpdateClientActionFail, UpdateClientActionSuccess } from "./client-store.action";
import { Client } from "../models/client";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/toast/utils/store/toast.action";
import { Toast } from "src/app/toast/features/toast.model";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { RouterService } from "src/app/router/utils/router.service";

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
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'User Registration' })));
                    this.routerService.navigate('/auth');
                }),
                map((response: DataResponse<Client>) => {
                    return new RegisterClientActionSuccess(response.data);
                }),
                catchError(err => of(new RegisterClientActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ isError: true, description: 'User Registration' })));
                    })
                ))
            )
        )
    ));

    updateClient$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateClientAction>(ClientActionsType.UPDATE_CLIENT),
        mergeMap((action: UpdateClientAction) => 
            this.clientAccessService.updateClient(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'User update' })));
                    this.routerService.navigate('/profile/info');
                }),
                map((response: DataResponse<Client>) => {                    
                    return new UpdateClientActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateClientActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ description: 'User update', isError: true })));
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
                catchError(err => of(new GetClientActionFail(err)).pipe(
                    tap(() => {
                        // this.store.dispatch(new AddToast(new Toast({ description: 'User update', isError: true })));
                    })
                ))
            )
        )
    ));
}