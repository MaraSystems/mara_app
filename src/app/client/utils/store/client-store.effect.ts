import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ClientAccessService } from "../access/client-access.service";
import { ClientActionsType, RegisterClientAction, RegisterClientActionFail, RegisterClientActionSuccess } from "./client-store.action";
import { Client } from "../models/client";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/toast/utils/store/toast.action";
import { Toast } from "src/app/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";

@Injectable()
export class ClientStoreEffect {
    constructor(
        private actions$: Actions,
        private clientAccessService: ClientAccessService,
        private store: Store,
        private router: Router
    ){}

    registerClient$ = createEffect(() => this.actions$.pipe(
        ofType<RegisterClientAction>(ClientActionsType.REGISTER_CLIENT),
        mergeMap((action: RegisterClientAction) => 
            this.clientAccessService.registerClient(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast('Registration Successful')));
                    this.router.navigateByUrl('/auth');
                }),
                map((response: DataResponse<Client>) => {
                    return new RegisterClientActionSuccess(response.data);
                }),
                catchError(err => of(new RegisterClientActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast('Registration Failed', true, 'An error occurred', 0)));
                    })
                ))
            )
        )
    ));
}