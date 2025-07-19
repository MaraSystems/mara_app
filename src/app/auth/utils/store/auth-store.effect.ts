import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { AuthAccessService } from "../access/auth-access.service";
import { AuthActionsType, GetAuthAction, GetAuthActionFail, GetAuthActionSuccess, GetPasswordAuthAction, GetPasswordAuthActionFail, GetPasswordAuthActionSuccess, LoginAuthAction, LoginAuthActionFail, LoginAuthActionSuccess, LogoutAuthAction, LogoutAuthActionFail, LogoutAuthActionSuccess } from "./auth-store.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { Auth } from "../models/auth.model";
import { GetProfileAction } from "src/app/users/utils/store/user-store.action";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { LocalAccessService } from "src/app/general/utils/services/local-access.service";
import { EnvTypes } from "src/app/general/utils/models/env";
import { ApiAccessService } from "src/app/general/utils/services/api-access.service";
import { IAccessService } from "src/app/general/utils/services/iaccess.service";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthStoreEffect {
    accessService!: IAccessService;

    constructor(
        private actions$: Actions,
        localAccessService: LocalAccessService,
        apiAccessService: ApiAccessService,
        private authAccessService: AuthAccessService,
        private store: Store
    ){
      this.accessService = [EnvTypes.DEVELOPMENT, EnvTypes.TESTING].includes(environment.env)
        ? localAccessService
        : apiAccessService;
    }

    getPasswordAuth$ = createEffect(() => this.actions$.pipe(
        ofType<GetPasswordAuthAction>(AuthActionsType.GET_PASSWORD_AUTH),
        mergeMap((action: GetPasswordAuthAction) =>
            this.accessService.requestPassword(action.payload).pipe(
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
            this.accessService.login(action.payload).pipe(
                map((response: DataResponse<Auth>) => {
                    handleSuccessSideEffects((action as LoginAuthAction).sideEffects);
                    this.store.dispatch(new GetProfileAction(true));
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
                    this.store.dispatch(new GetProfileAction(true));
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
