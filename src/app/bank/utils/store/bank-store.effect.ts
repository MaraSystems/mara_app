import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { BankAccessService } from "../access/bank-access.service";
import { DeleteBankAction, DeleteBankActionFail, DeleteBankActionSuccess, GetBankAction, GetBankActionFail, GetBankActionSuccess, ListBanksAction, ListBanksActionFail, ListBanksActionSuccess, BankActionsType, UpdateBankAction, UpdateBankActionFail, UpdateBankActionSuccess, CreateBankAction, CreateBankActionFail, CreateBankActionSuccess } from "./bank-store.action";
import { Bank } from "../models/bank.model";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class BankStoreEffect {
    constructor(
        private actions$: Actions,
        private bankAccessService: BankAccessService,
        private store: Store,
        private router: Router,
    ){}

    createBank$ = createEffect(() => this.actions$.pipe(
        ofType<CreateBankAction>(BankActionsType.CREATE_BANK),
        mergeMap((action: CreateBankAction) => 
            this.bankAccessService.createBank(action.payload).pipe(
                map((response: DataResponse<Bank>) => {     
                    handleSuccessSideEffects((action as CreateBankAction).sideEffects);
                    return new CreateBankActionSuccess(response.data);
                }),
                catchError(err => of(new CreateBankActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as CreateBankAction).sideEffects);
                    })
                ))
            )
        )
    ));

    updateBank$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateBankAction>(BankActionsType.UPDATE_BANK),
        mergeMap((action: UpdateBankAction) => 
            this.bankAccessService.updateBank(action.payload).pipe(
                map((response: DataResponse<Bank>) => {     
                    handleSuccessSideEffects((action as UpdateBankAction).sideEffects);
                    return new UpdateBankActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateBankActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateBankAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getBank$ = createEffect(() => this.actions$.pipe(
        ofType<GetBankAction>(BankActionsType.GET_BANK),
        mergeMap((action: GetBankAction) => 
            this.bankAccessService.getBank(action.payload).pipe(
                map((response: DataResponse<Bank>) => {                                        
                    return new GetBankActionSuccess(response.data);
                }),
                catchError(err => of(new GetBankActionFail(err))
            )
        )
    )));

    listBanks$ = createEffect(() => this.actions$.pipe(
        ofType<ListBanksAction>(BankActionsType.LIST_BANKS),
        mergeMap((action: ListBanksAction) => 
            this.bankAccessService.listBanks(action.payload).pipe(
                map((response: DataResponse<[Bank]>) => {                    
                    return new ListBanksActionSuccess(response.data);
                }),
                catchError(err => of(new ListBanksActionFail(err))
            )
        )
    )));

    deleteBank$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteBankAction>(BankActionsType.DELETE_BANK),
        mergeMap((action: DeleteBankAction) => 
            this.bankAccessService.deleteBank(action.payload).pipe(
                map((response: DataResponse<Bank>) => {         
                    this.store.dispatch(new AddToast({ description: 'Bank Deleted' }));
                    this.router.navigateByUrl('/banks');           
                    return new DeleteBankActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteBankActionFail(err))
            )
        )
    )));
}