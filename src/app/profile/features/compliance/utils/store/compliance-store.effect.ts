import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { ComplianceAccessService } from "../access/compliance-access.service";
import { CreateComplianceAction, CreateComplianceActionFail, CreateComplianceActionSuccess, GetComplianceAction, GetComplianceActionFail, GetComplianceActionSuccess, ComplianceActionsType, UpdateComplianceAction, UpdateComplianceActionFail, UpdateComplianceActionSuccess, ListComplianceAction, ListComplianceActionFail, ListComplianceActionSuccess } from "./compliance-store.action";
import { Compliance } from "src/app/client/utils/models/compliance";
import { RouterService } from "src/app/router/utils/router.service";
import { ToastEnum } from "src/app/general/features/toast/utils/models/toast.enum";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class ComplianceStoreEffect {
    constructor(
        private actions$: Actions,
        private complianceAccessService: ComplianceAccessService,
        private store: Store,
        private routerService: RouterService
    ){}

    createCompliance$ = createEffect(() => this.actions$.pipe(
        ofType<CreateComplianceAction>(ComplianceActionsType.CREATE_COMPLIANCE),
        mergeMap((action: CreateComplianceAction) => 
            this.complianceAccessService.createCompliance(action.payload.compliance, action.payload.document).pipe(
                tap(() => {                    
                    handleSuccessSideEffects((action as CreateComplianceAction).sideEffects);
                }),
                map((response: DataResponse<Compliance>) => {
                    return new CreateComplianceActionSuccess(response.data);
                }),
                catchError(err => of(new CreateComplianceActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateComplianceAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateCompliance$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateComplianceAction>(ComplianceActionsType.UPDATE_COMPLIANCE),
        mergeMap((action: UpdateComplianceAction) => 
            this.complianceAccessService.updateCompliance(action.payload).pipe(
                map((response: DataResponse<Compliance>) => {   
                    handleSuccessSideEffects((action as UpdateComplianceAction).sideEffects);             
                    return new UpdateComplianceActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateComplianceActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateComplianceAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getCompliance$ = createEffect(() => this.actions$.pipe(
        ofType<GetComplianceAction>(ComplianceActionsType.GET_COMPLIANCE),
        mergeMap((action: GetComplianceAction) => 
            this.complianceAccessService.getCompliance(action.payload).pipe(
                map((response: DataResponse<Compliance>) => {                    
                    return new GetComplianceActionSuccess(response.data);
                }),
                catchError(err => of(new GetComplianceActionFail(err)))
            )
        )
    ));

    listCompliance$ = createEffect(() => this.actions$.pipe(
        ofType<ListComplianceAction>(ComplianceActionsType.LIST_COMPLIANCE),
        mergeMap((action: ListComplianceAction) => 
            this.complianceAccessService.listCompliance(action.payload).pipe(
                map((response: DataResponse<Compliance[]>) => {                    
                    return new ListComplianceActionSuccess(response.data);
                }),
                catchError(err => of(new ListComplianceActionFail(err)))
            )
        )
    ));
}