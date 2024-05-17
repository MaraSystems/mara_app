import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { Router } from "@angular/router";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { TransactionAccessService } from "../access/transaction-access.service";
import { DeleteTransactionAction, DeleteTransactionActionFail, DeleteTransactionActionSuccess, GetTransactionAction, GetTransactionActionFail, GetTransactionActionSuccess, ListTransactionsAction, ListTransactionsActionFail, ListTransactionsActionSuccess, TransactionActionsType, UpdateTransactionAction, UpdateTransactionActionFail, UpdateTransactionActionSuccess } from "./transaction-store.action";
import { Transaction } from "../models/transaction.model";
import { handleFailureSideEffects, handleSuccessSideEffects } from "src/app/general/utils/lib/handleSideEffects";

@Injectable()
export class TransactionStoreEffect {
    constructor(
        private actions$: Actions,
        private transactionAccessService: TransactionAccessService,
        private store: Store,
        private router: Router,
    ){}

    updateTransaction$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateTransactionAction>(TransactionActionsType.UPDATE_TRANSACTION),
        mergeMap((action: UpdateTransactionAction) => 
            this.transactionAccessService.updateTransaction(action.payload).pipe(
                map((response: DataResponse<Transaction>) => {     
                    handleSuccessSideEffects((action as UpdateTransactionAction).sideEffects);
                    return new UpdateTransactionActionSuccess({ id: action.payload.id as string, changes: response.data});
                }),
                catchError(err => of(new UpdateTransactionActionFail(err)).pipe(
                    tap(() => {
                        handleFailureSideEffects((action as UpdateTransactionAction).sideEffects);
                    })
                ))
            )
        )
    ));

    getTransaction$ = createEffect(() => this.actions$.pipe(
        ofType<GetTransactionAction>(TransactionActionsType.GET_TRANSACTION),
        mergeMap((action: GetTransactionAction) => 
            this.transactionAccessService.getTransaction(action.payload).pipe(
                map((response: DataResponse<Transaction>) => {                                        
                    return new GetTransactionActionSuccess(response.data);
                }),
                catchError(err => of(new GetTransactionActionFail(err))
            )
        )
    )));

    listTransactions$ = createEffect(() => this.actions$.pipe(
        ofType<ListTransactionsAction>(TransactionActionsType.LIST_TRANSACTIONS),
        mergeMap((action: ListTransactionsAction) => 
            this.transactionAccessService.listTransactions(action.payload).pipe(
                map((response: DataResponse<[Transaction]>) => {                    
                    return new ListTransactionsActionSuccess(response.data);
                }),
                catchError(err => of(new ListTransactionsActionFail(err))
            )
        )
    )));

    deleteTransaction$ = createEffect(() => this.actions$.pipe(
        ofType<DeleteTransactionAction>(TransactionActionsType.DELETE_TRANSACTION),
        mergeMap((action: DeleteTransactionAction) => 
            this.transactionAccessService.deleteTransaction(action.payload).pipe(
                map((response: DataResponse<Transaction>) => {         
                    this.store.dispatch(new AddToast({ description: 'Transaction Deleted' }));
                    this.router.navigateByUrl('/transactions');           
                    return new DeleteTransactionActionSuccess(response.data);
                }),
                catchError(err => of(new DeleteTransactionActionFail(err))
            )
        )
    )));
}