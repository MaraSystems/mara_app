import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { CreateComplianceAction, CreateComplianceActionFail, CreateComplianceActionSuccess, GetComplianceAction, GetComplianceActionFail, GetComplianceActionSuccess, ComplianceActionsType, UpdateComplianceAction, UpdateComplianceActionFail, UpdateComplianceActionSuccess, ListComplianceAction, ListComplianceActionFail, ListComplianceActionSuccess } from "./compliance-store.action";
import { Compliance } from "src/app/users/utils/models/compliance";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { Store } from "@ngrx/store";
import { ApiAccessService } from "src/app/general/utils/services/api-access.service";
import { LocalAccessService } from "src/app/general/utils/services/local-access.service";
import { AccessService } from "src/app/general/utils/services/access.service";

@Injectable()
export class ComplianceStoreEffect extends AccessService{
    constructor(
        private actions$: Actions,
        private store: Store,
        localAccessService: LocalAccessService,
        apiAccessService: ApiAccessService,
    ){
      super(localAccessService, apiAccessService);
    }

    createCompliance$ = createEffect(() => this.actions$.pipe(
        ofType<CreateComplianceAction>(ComplianceActionsType.CREATE_COMPLIANCE),
        mergeMap((action: CreateComplianceAction) =>
            this.accessService.createCompliance(action.payload.compliance, action.payload.document).pipe(
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
            this.accessService.updateCompliance(action.payload.id, action.payload.changes).pipe(
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
            this.accessService.getCompliance(action.payload).pipe(
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
            this.accessService.listCompliance(action.payload).pipe(
                map((response: DataResponse<Compliance[]>) => {
                    return new ListComplianceActionSuccess(response.data);
                }),
                catchError(err => of(new ListComplianceActionFail(err)))
            )
        )
    ));
}
