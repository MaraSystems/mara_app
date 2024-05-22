import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { DashboardWidget } from "../models/dashboard-widget";
import { DashboardActionsType, GetWalletActionFail, GetWalletActionSuccess, UpdateWalletActionSuccess } from "./dashboard-store.action";

export interface DashboardState extends EntityState<DashboardWidget<any>> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const dashboardAdapter: EntityAdapter<DashboardWidget<any>> = createEntityAdapter<DashboardWidget<any>>({
    selectId: (widget: DashboardWidget<any>) => widget.id
});

export const defualtIssue: DashboardState = {
    selectedId: null,
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    error: ''
}

const initialState = dashboardAdapter.getInitialState(defualtIssue);

export function dashboardReducer(state = initialState, action: Action): DashboardState {
    switch (action.type) {
        case DashboardActionsType.GET_WALLET:
            return { ...state, loading: true, loaded: false };

        case DashboardActionsType.GET_WALLET_SUCCESS:
            const { payload: getPayload } = (action as GetWalletActionSuccess);                        
            return dashboardAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case DashboardActionsType.GET_WALLET_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetWalletActionFail).payload
            } 

        case DashboardActionsType.UPDATE_WALLET:
            return { ...state, loading: true, loaded: false };

        case DashboardActionsType.UPDATE_WALLET_SUCCESS:
            const { payload: updatePayload } = (action as UpdateWalletActionSuccess);                        
            return dashboardAdapter.updateOne(
                updatePayload, { ...state, loading: false, loaded: true }
            )
            
        case DashboardActionsType.UPDATE_WALLET_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetWalletActionFail).payload
            } 

        default:
            return state;
    }
}