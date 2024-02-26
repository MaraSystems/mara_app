import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/toast/utils/store/toast.action";
import { Toast } from "src/app/toast/features/toast.model";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { KinAccessService } from "../access/kin-access.service";
import { CreateKinAction, CreateKinActionFail, CreateKinActionSuccess, GetKinAction, GetKinActionFail, GetKinActionSuccess, KinActionsType, UpdateKinAction, UpdateKinActionFail, UpdateKinActionSuccess } from "./kin-store.action";
import { Kin } from "src/app/client/utils/models/kin";
import { RouterService } from "src/app/router/utils/router.service";

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
                tap(() => {                    
                    this.store.dispatch(new AddToast(new Toast({ description: 'Kin Creation' })));
                    this.routerService.navigate('/profile/kin');
                }),
                map((response: DataResponse<Kin>) => {
                    return new CreateKinActionSuccess(response.data);
                }),
                catchError(err => of(new CreateKinActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ isError: true, description: 'Kin Creation' })));
                    })
                ))
            )
        )
    ));

    updateKin$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateKinAction>(KinActionsType.UPDATE_KIN),
        mergeMap((action: UpdateKinAction) => 
            this.kinAccessService.updateKin(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'Kin Update' })));
                    this.routerService.navigate('/profile/kin');
                }),
                map((response: DataResponse<Kin>) => {                    
                    return new UpdateKinActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateKinActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ description: 'Kin Update', isError: true })));
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
                catchError(err => of(new GetKinActionFail(err)).pipe(
                    tap(() => {
                        // this.store.dispatch(new AddToast(new Toast({ description: 'User update', isError: true })));
                    })
                ))
            )
        )
    ));
}