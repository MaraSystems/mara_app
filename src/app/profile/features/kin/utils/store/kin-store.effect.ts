import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { KinAccessService } from "../access/kin-access.service";
import { CreateKinAction, CreateKinActionFail, CreateKinActionSuccess, GetKinAction, GetKinActionFail, GetKinActionSuccess, KinActionsType, UpdateKinAction, UpdateKinActionFail, UpdateKinActionSuccess } from "./kin-store.action";
import { Kin } from "src/app/client/utils/models/kin";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class KinStoreEffect {
    constructor(
        private actions$: Actions,
        private kinAccessService: KinAccessService,
        private store: Store,
        private routerService: RouterService
    ){}

    createKin$ = createEffect(() => this.actions$.pipe(
        ofType<CreateKinAction>(KinActionsType.CREATE_KIN),
        mergeMap((action: CreateKinAction) => 
            this.kinAccessService.createKin(action.payload).pipe(
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
            this.kinAccessService.updateKin(action.payload).pipe(
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
            this.kinAccessService.getKin(action.payload).pipe(
                map((response: DataResponse<Kin>) => {                    
                    return new GetKinActionSuccess(response.data);
                }),
                catchError(err => of(new GetKinActionFail(err)))
            )
        )
    ));
}