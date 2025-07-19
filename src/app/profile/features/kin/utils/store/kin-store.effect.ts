import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { CreateKinAction, CreateKinActionFail, CreateKinActionSuccess, GetKinAction, GetKinActionFail, GetKinActionSuccess, KinActionsType, UpdateKinAction, UpdateKinActionFail, UpdateKinActionSuccess } from "./kin-store.action";
import { Kin } from "src/app/users/utils/models/kin";
import { RouterService } from "src/app/router/utils/router.service";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { AccessService } from "src/app/general/utils/services/access.service";
import { ApiAccessService } from "src/app/general/utils/services/api-access.service";
import { LocalAccessService } from "src/app/general/utils/services/local-access.service";

@Injectable()
export class KinStoreEffect extends AccessService {
    constructor(
        private actions$: Actions,
        private store: Store,
        localAccessService: LocalAccessService,
        apiAccessService: ApiAccessService,
    ){
      super(localAccessService, apiAccessService);
    }

    createKin$ = createEffect(() => this.actions$.pipe(
        ofType<CreateKinAction>(KinActionsType.CREATE_KIN),
        mergeMap((action: CreateKinAction) =>
            this.accessService.createKin(action.payload).pipe(
                map((response: DataResponse<Kin>) => {
                    handleSuccessSideEffects((action as CreateKinAction).sideEffects);
                    return new CreateKinActionSuccess(response.data);
                }),
                catchError(err => of(new CreateKinActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateKinAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateKin$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateKinAction>(KinActionsType.UPDATE_KIN),
        mergeMap((action: UpdateKinAction) =>
            this.accessService.updateKin(action.payload.id, action.payload.changes).pipe(
                map((response: DataResponse<Kin>) => {
                    handleSuccessSideEffects((action as UpdateKinAction).sideEffects);
                    return new UpdateKinActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateKinActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateKinAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getKin$ = createEffect(() => this.actions$.pipe(
        ofType<GetKinAction>(KinActionsType.GET_KIN),
        mergeMap((action: GetKinAction) =>
            this.accessService.getKin(action.payload).pipe(
                map((response: DataResponse<Kin>) => {
                    return new GetKinActionSuccess(response.data);
                }),
                catchError(err => of(new GetKinActionFail(err)))
            )
        )
    ));
}
