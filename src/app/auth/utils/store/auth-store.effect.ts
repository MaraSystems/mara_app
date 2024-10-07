import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { AuthAccessService } from "../access/auth-access.service";
import { AuthActionsType, GetAuthAction, GetAuthActionFail, GetAuthActionSuccess, GetPasswordAuthAction, GetPasswordAuthActionFail, GetPasswordAuthActionSuccess, LoginAuthAction, LoginAuthActionFail, LoginAuthActionSuccess, LogoutAuthAction, LogoutAuthActionFail, LogoutAuthActionSuccess } from "./auth-store.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { Auth } from "../models/auth.model";
import { AppState } from "src/app/app.state";
import { GetClientAction } from "src/app/client/utils/store/client-store.action";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class AuthStoreEffect {
    constructor(
        private actions$: Actions,
        private authAccessService: AuthAccessService,
        private store: Store<AppState>,
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
                        this.store.dispatch(new AddToast({ title: 'Password Request', type: ToastType.ERROR }));
                    })
                ))
            )
        )
    ));

    loginAuth$ = createEffect(() => this.actions$.pipe(
        ofType<LoginAuthAction>(AuthActionsType.LOGIN_AUTH),
        mergeMap((action: LoginAuthAction) => 
            this.authAccessService.login(action.payload).pipe(
                map((response: DataResponse<Auth>) => {         
                    handleSuccessSideEffects((action as LoginAuthAction).sideEffects);           
                    this.store.dispatch(new GetClientAction(response.data.id, true));               
                    return new LoginAuthActionSuccess(response.data);
                }),
                catchError(err => of(new LoginAuthActionFail(err)).pipe(
                    tap(() => {                                                
                        handleFailureSideEffects((action as LoginAuthAction).sideEffects, err);
                    })
                ))
            )
        )
    ));

    getAuth$ = createEffect(() => this.actions$.pipe(
        ofType<GetAuthAction>(AuthActionsType.GET_AUTH),
        mergeMap((action: GetAuthAction) => 
            this.authAccessService.getAuth().pipe(
                map((response: DataResponse<Auth>) => {   
                    this.store.dispatch(new GetClientAction(response.data.id, true));               
                    return new GetAuthActionSuccess(response.data);
                }),
                catchError(err => of(new GetAuthActionFail(err)))
            )
        )
    ));

    logoutAuth$ = createEffect(() => this.actions$.pipe(
        ofType<LogoutAuthAction>(AuthActionsType.LOGOUT_AUTH),
        mergeMap((action: LogoutAuthAction) => 
            this.authAccessService.logout().pipe(
                map(() => {
                    handleSuccessSideEffects((action as LogoutAuthAction).sideEffects);
                    return new LogoutAuthActionSuccess();
                }),
                catchError(err => of(new LogoutAuthActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as LogoutAuthAction).sideEffects, err);
                    })
                ))
            )
        )
    ));
}