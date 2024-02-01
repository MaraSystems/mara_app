import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { ClientAccessService } from "../access/client-access.service";
import { ClientActionsType, RegisterClientAction, RegisterClientActionFail, RegisterClientActionSuccess } from "./client-store.action";
import { Client } from "../models/client";

@Injectable()
export class ClientStoreEffect {
    constructor(
        private actions$: Actions,
        private clientAccessService: ClientAccessService
    ){}

    registerClientEffect$ = createEffect(() => this.actions$.pipe(
        ofType<RegisterClientAction>(ClientActionsType.REGISTER_CLIENT),
        mergeMap((action: RegisterClientAction) => 
            this.clientAccessService.registerClient(action.payload).pipe(
                 map((client: Client) => new RegisterClientActionSuccess(client)),
                 catchError(err => of(new RegisterClientActionFail(err)))
            )
        )
    ));
}