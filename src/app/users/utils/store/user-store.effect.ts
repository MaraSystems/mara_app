import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UserActionsType, GetUserAction, GetUserActionFail, GetUserActionSuccess, ListUsersAction, ListUsersActionFail, ListUsersActionSuccess, CreateUserAction, CreateUserActionFail, CreateUserActionSuccess, UpdateProfileAction, UpdateProfileActionFail, UpdateProfileActionSuccess, GetProfileAction } from "./user-store.action";
import { User } from "../models/user";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { LocalAccessService } from "src/app/general/utils/services/local-access.service";
import { AccessService } from "src/app/general/utils/services/access.service";
import { ApiAccessService } from "src/app/general/utils/services/api-access.service";
import { AuthAccessService } from "src/app/auth/utils/access/auth-access.service";

@Injectable()
export class UserStoreEffect extends AccessService {
    constructor(
        private actions$: Actions,
        localAccessService: LocalAccessService,
        apiAccessService: ApiAccessService,
        private authService: AuthAccessService
    ){
      super(localAccessService, apiAccessService);
    }

    createUser$ = createEffect(() => this.actions$.pipe(
        ofType<CreateUserAction>(UserActionsType.CREATE_USER),
        mergeMap((action: CreateUserAction) =>
            this.accessService.createUser(action.payload).pipe(
                map((response: DataResponse<User>) => {
                    handleSuccessSideEffects((action as CreateUserAction).sideEffects);
                    return new CreateUserActionSuccess(response.data);
                }),
                catchError(err => of(new CreateUserActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateUserAction).sideEffects, err);
                    })
                ))
            )
        )
    ));

    updateProfile$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateProfileAction>(UserActionsType.UPDATE_PROFILE),
        mergeMap((action: UpdateProfileAction) =>
            this.accessService.updateProfile(action.payload).pipe(
                map((response: DataResponse<User>) => {
                    handleSuccessSideEffects((action as UpdateProfileAction).sideEffects);
                    return new UpdateProfileActionSuccess({ id: this.authService.auth.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateProfileActionFail(err)).pipe(
                    tap(() => {
                        handleSuccessSideEffects((action as UpdateProfileAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getProfile$ = createEffect(() => this.actions$.pipe(
        ofType<GetProfileAction>(UserActionsType.GET_PROFILE),
        mergeMap((action: GetProfileAction) =>
            this.accessService.getProfile().pipe(
                map((response: DataResponse<User>) => {
                    return new GetUserActionSuccess(response.data, action.auth);
                }),
                catchError(err => of(new GetUserActionFail(err)))
            )
        )
    ));

    getUser$ = createEffect(() => this.actions$.pipe(
        ofType<GetUserAction>(UserActionsType.GET_USER),
        tap((action: GetUserAction) => {
          console.log('triggered get user effect', action);
        }),
        mergeMap((action: GetUserAction) =>
            this.accessService.getUser(action.payload).pipe(
                map((response: DataResponse<User>) => {
                    return new GetUserActionSuccess(response.data, action.auth);
                }),
                catchError(err => of(new GetUserActionFail(err)))
            )
        )
    ));

    listProjects$ = createEffect(() => this.actions$.pipe(
        ofType<ListUsersAction>(UserActionsType.LIST_USERS),
        mergeMap((action: ListUsersAction) =>
            this.accessService.listUsers(action.payload, action.options).pipe(
                map((response: DataResponse<User[]>) => {
                    return new ListUsersActionSuccess(response.data, action.payload);
                }),
                catchError(err => of(new ListUsersActionFail(err))
            )
        )
    )));
}
