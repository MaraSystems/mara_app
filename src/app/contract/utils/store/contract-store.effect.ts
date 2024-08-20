import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { ContractAccessService } from "../access/contract-access.service";
import { CreateContractAction, CreateContractActionFail, CreateContractActionSuccess, GetContractAction, GetContractActionFail, GetContractActionSuccess, ListContractsAction, ListContractsActionFail, ListContractsActionSuccess, ContractActionsType, UpdateContractAction, UpdateContractActionFail, UpdateContractActionSuccess } from "./contract-store.action";
import { Contract } from "../models/contract";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class ContractStoreEffect {
    constructor(
        private actions$: Actions,
        private contractAccessService: ContractAccessService,
    ){}

    createContract$ = createEffect(() => this.actions$.pipe(
        ofType<CreateContractAction>(ContractActionsType.CREATE_CONTRACT),
        mergeMap((action: CreateContractAction) => 
            this.contractAccessService.requestContract(action.payload).pipe(
                map((response: DataResponse<Contract>) => {
                    handleSuccessSideEffects((action as CreateContractAction).sideEffects);
                    return new CreateContractActionSuccess(response.data);
                }),
                catchError(err => of(new CreateContractActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateContractAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateContract$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateContractAction>(ContractActionsType.UPDATE_CONTRACT),
        mergeMap((action: UpdateContractAction) => 
            this.contractAccessService.updateContract(action.payload).pipe(
                map((response: DataResponse<Contract>) => {                 
                    handleSuccessSideEffects((action as UpdateContractAction).sideEffects);   
                    return new UpdateContractActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateContractActionFail(err)).pipe(
                    tap((failedAction) => {                     
                        handleFailureSideEffects((action as UpdateContractAction).sideEffects, failedAction.payload);   
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
            this.contractAccessService.listContracts(action.userId, action.payload).pipe(
                map((response: DataResponse<[Contract]>) => {                    
                    return new ListContractsActionSuccess(response.data);
                }),
                catchError(err => of(new ListContractsActionFail(err))
            )
        )
    )));
}