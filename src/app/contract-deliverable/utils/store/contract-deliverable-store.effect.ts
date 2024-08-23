import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { ContractDeliverableAccessService } from "../access/contract-deliverable-access.service";
import { CreateContractDeliverableAction, CreateContractDeliverableActionFail, CreateContractDeliverableActionSuccess, GetContractDeliverableAction, GetContractDeliverableActionFail, GetContractDeliverableActionSuccess, ListContractDeliverablesAction, ListContractDeliverablesActionFail, ListContractDeliverablesActionSuccess, ContractDeliverableActionsType, UpdateContractDeliverableAction, UpdateContractDeliverableActionFail, UpdateContractDeliverableActionSuccess } from "./contract-deliverable-store.action";
import { ContractDeliverable } from "../models/contract-deliverable";
import { ToastType } from "src/app/general/features/toast/utils/models/toast-type";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";
import { UpdateContractAction } from "src/app/contract/utils/store/contract-store.action";

@Injectable()
export class ContractDeliverableStoreEffect {
    constructor(
        private actions$: Actions,
        private contractDeliverableAccessService: ContractDeliverableAccessService,
        private store: Store,
        private router: Router
    ){}

    updateContractDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateContractDeliverableAction>(ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE),
        mergeMap((action: UpdateContractDeliverableAction) => 
            this.contractDeliverableAccessService.updateContractDeliverable(action.payload).pipe(
                map((response: DataResponse<ContractDeliverable>) => {  
                    handleSuccessSideEffects((action as UpdateContractDeliverableAction).sideEffects);
                    return new UpdateContractDeliverableActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateContractDeliverableActionFail(err)).pipe(
                    tap((failedAction) => {
                        handleFailureSideEffects((action as UpdateContractDeliverableAction).sideEffects, failedAction.payload); 
                        this.store.dispatch(new AddToast({ title: 'Contract Deliverable Update', type: ToastType.ERROR }));
  
                    })
                ))
            )
        )
    ));

    getContractDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<GetContractDeliverableAction>(ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE),
        mergeMap((action: GetContractDeliverableAction) => 
            this.contractDeliverableAccessService.getContractDeliverable(action.payload).pipe(
                map((response: DataResponse<ContractDeliverable>) => {                    
                    return new GetContractDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new GetContractDeliverableActionFail(err))
            )
        )
    )));

    listContractDeliverables$ = createEffect(() => this.actions$.pipe(
        ofType<ListContractDeliverablesAction>(ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES),
        mergeMap((action: ListContractDeliverablesAction) => 
            this.contractDeliverableAccessService.listContractDeliverables(action.contractId).pipe(
                map((response: DataResponse<ContractDeliverable[]>) => {                    
                    return new ListContractDeliverablesActionSuccess(response.data);
                }),
                catchError(err => of(new ListContractDeliverablesActionFail(err))
            )
        )
    )));
}