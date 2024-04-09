import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/shared/features/toast/utils/store/toast.action";
import { Toast } from "src/app/shared/features/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { ContractDeliverableAccessService } from "../access/contract-deliverable-access.service";
import { CreateContractDeliverableAction, CreateContractDeliverableActionFail, CreateContractDeliverableActionSuccess, GetContractDeliverableAction, GetContractDeliverableActionFail, GetContractDeliverableActionSuccess, ListContractDeliverablesAction, ListContractDeliverablesActionFail, ListContractDeliverablesActionSuccess, ContractDeliverableActionsType, UpdateContractDeliverableAction, UpdateContractDeliverableActionFail, UpdateContractDeliverableActionSuccess } from "./contract-deliverable-store.action";
import { ContractDeliverable } from "../models/contract-deliverable.model";

@Injectable()
export class ContractDeliverableStoreEffect {
    constructor(
        private actions$: Actions,
        private contractDeliverableAccessService: ContractDeliverableAccessService,
        private store: Store,
        private router: Router
    ){}

    createContractDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<CreateContractDeliverableAction>(ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE),
        mergeMap((action: CreateContractDeliverableAction) => 
            this.contractDeliverableAccessService.createContractDeliverable(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'Contract Deliverable Creation' })));
                    this.router.navigate(['/contracts', action.payload.contractId, 'deliverables']);
                }),
                map((response: DataResponse<ContractDeliverable>) => {
                    return new CreateContractDeliverableActionSuccess(response.data);
                }),
                catchError(err => of(new CreateContractDeliverableActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ isError: true, description: 'Contract Deliverable Creation' })));
                    })
                ))
            )
        )
    ));

    updateContractDeliverable$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateContractDeliverableAction>(ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE),
        mergeMap((action: UpdateContractDeliverableAction) => 
            this.contractDeliverableAccessService.updateContractDeliverable(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'User update' })));
                    this.router.navigate(['/contracts', action.contractId, 'deliverables', action.payload.id]);
                }),
                map((response: DataResponse<ContractDeliverable>) => {                    
                    return new UpdateContractDeliverableActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateContractDeliverableActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ description: 'User update', isError: true })));
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
                map((response: DataResponse<[ContractDeliverable]>) => {                    
                    return new ListContractDeliverablesActionSuccess(response.data);
                }),
                catchError(err => of(new ListContractDeliverablesActionFail(err))
            )
        )
    )));
}