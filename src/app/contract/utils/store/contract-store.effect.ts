import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/toast/utils/store/toast.action";
import { Toast } from "src/app/toast/features/toast.model";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/shared/utils/models/data-response";
import { ContractAccessService } from "../access/contract-access.service";
import { CreateContractAction, CreateContractActionFail, CreateContractActionSuccess, GetContractAction, GetContractActionFail, GetContractActionSuccess, ListContractsAction, ListContractsActionFail, ListContractsActionSuccess, ContractActionsType, UpdateContractAction, UpdateContractActionFail, UpdateContractActionSuccess } from "./contract-store.action";
import { Contract } from "../models/contract.model";

@Injectable()
export class ContractStoreEffect {
    constructor(
        private actions$: Actions,
        private contractAccessService: ContractAccessService,
        private store: Store,
        private router: Router
    ){}

    createContract$ = createEffect(() => this.actions$.pipe(
        ofType<CreateContractAction>(ContractActionsType.CREATE_CONTRACT),
        mergeMap((action: CreateContractAction) => 
            this.contractAccessService.createContract(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'Contract Creation' })));
                    this.router.navigateByUrl('/contracts');
                }),
                map((response: DataResponse<Contract>) => {
                    return new CreateContractActionSuccess(response.data);
                }),
                catchError(err => of(new CreateContractActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ isError: true, description: 'Contract Creation' })));
                    })
                ))
            )
        )
    ));

    updateContract$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateContractAction>(ContractActionsType.UPDATE_CONTRACT),
        mergeMap((action: UpdateContractAction) => 
            this.contractAccessService.updateContract(action.payload).pipe(
                tap(() => {
                    this.store.dispatch(new AddToast(new Toast({ description: 'User update' })));
                    this.router.navigate(['/contract', action.payload.id]);
                }),
                map((response: DataResponse<Contract>) => {
                    console.log(response);
                    
                    return new UpdateContractActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateContractActionFail(err)).pipe(
                    tap(() => {
                        this.store.dispatch(new AddToast(new Toast({ description: 'User update', isError: true })));
                    })
                ))
            )
        )
    ));

    getContract$ = createEffect(() => this.actions$.pipe(
        ofType<GetContractAction>(ContractActionsType.GET_CONTRACT),
        mergeMap((action: GetContractAction) => 
            this.contractAccessService.getContract(action.payload).pipe(
                map((response: DataResponse<Contract>) => {                    
                    return new GetContractActionSuccess(response.data);
                }),
                catchError(err => of(new GetContractActionFail(err))
            )
        )
    )));

    listContracts$ = createEffect(() => this.actions$.pipe(
        ofType<ListContractsAction>(ContractActionsType.LIST_CONTRACTS),
        mergeMap((action: ListContractsAction) => 
            this.contractAccessService.listContracts(action.payload).pipe(
                map((response: DataResponse<[Contract]>) => {                    
                    return new ListContractsActionSuccess(response.data);
                }),
                catchError(err => of(new ListContractsActionFail(err))
            )
        )
    )));
}