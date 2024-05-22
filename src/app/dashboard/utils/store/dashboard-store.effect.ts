import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DataResponse } from "src/app/general/utils/models/data-response";
import { DashboardActionsType, GetWalletAction, GetWalletActionFail, GetWalletActionSuccess, UpdateWalletAction, UpdateWalletActionFail, UpdateWalletActionSuccess } from "./dashboard-store.action";
import { GetTransactionActionFail } from "src/app/transaction/utils/store/transaction-store.action";
import { DashboardAccessService } from "../access/dashboard-access.service";
import { DashboardWidgetEnum } from "../models/dashboard-widget.enum";

@Injectable()
export class DashboardStoreEffect {
    constructor(
        private actions$: Actions,
        private dashboardAccessService: DashboardAccessService,
    ){}

    getWallet$ = createEffect(() => this.actions$.pipe(
        ofType<GetWalletAction>(DashboardActionsType.GET_WALLET),
        mergeMap((action: GetWalletAction) => 
            this.dashboardAccessService.getWallet(action.payload).pipe(
                map((response: DataResponse<number>) => {                                        
                    return new GetWalletActionSuccess({ data: response.data, id: 'wallet-balance', type: DashboardWidgetEnum.TRANSACTIONS });
                }),
                catchError(err => of(new GetWalletActionFail(err))
            )
        )
    )));

    updateWallet$ = createEffect(() => this.actions$.pipe(
        ofType<UpdateWalletAction>(DashboardActionsType.UPDATE_WALLET),
        mergeMap((action: UpdateWalletAction) => 
            this.dashboardAccessService.updateWallet(action.payload).pipe(
                map((response: DataResponse<number>) => {                                        
                    return new UpdateWalletActionSuccess({ id: 'wallet-balance', changes: { data: response.data } });
                }),
                catchError(err => of(new UpdateWalletActionFail(err))
            )
        )
    )));
}