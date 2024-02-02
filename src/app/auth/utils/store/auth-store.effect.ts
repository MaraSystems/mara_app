import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/toast/utils/store/toast.action";
import { Toast } from "src/app/toast/features/toast.model";
import { Router } from "@angular/router";
import { AuthAccessService } from "../access/auth-access.service";
import { AuthActionsType, GetPasswordAuthAction, GetPasswordAuthActionFail, GetPasswordAuthActionSuccess, LoginAuthAction, LoginAuthActionFail, LoginAuthActionSuccess } from "./auth-store.action";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { Auth } from "../models/auth.model";

@Injectable()
export class AuthStoreEffect {
    constructor(
        private actions$: Actions,
        private authAccessService: AuthAccessService,
        private store: Store,
        private router: Router
    ){}

    getPasswordAuth$ = createEffect(() => this.actions$.pipe(
        ofType<GetPasswordAuthAction>(AuthActionsType.GET_PASSWORD_AUTH),
        mergeMap((action: GetPasswordAuthAction) => 
            this.authAccessService.getPassword(action.payload).pipe(
                map((response: DataResponse<string>) => {
                    return new GetPasswordAuthActionSuccess(response.data);
                }),
                catchError(err => of(new GetPasswordAuthActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast('Request Password Failed', true, 'An error occurred', 0)));
                    })
                ))
            )
        )
    ));

    loginAuth$ = createEffect(() => this.actions$.pipe(
        ofType<LoginAuthAction>(AuthActionsType.LOGIN_AUTH),
        mergeMap((action: LoginAuthAction) => 
            this.authAccessService.login(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast('Login Successful')));
                }),
                map((response: DataResponse<Auth>) => {
                    return new LoginAuthActionSuccess(response.data);
                }),
                catchError(err => of(new LoginAuthActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast('Login Failed', true, 'An error occurred', 0)));
                    })
                ))
            )
        )
    ));
}