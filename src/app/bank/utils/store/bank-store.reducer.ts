import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Bank } from "../models/bank.model";
import { DeleteBankActionFail, DeleteBankActionSuccess, GetBankActionFail, GetBankActionSuccess, ListBanksActionFail, ListBanksActionSuccess, BankActionsType, UpdateBankActionFail, UpdateBankActionSuccess, CreateBankActionSuccess, CreateBankActionFail } from "./bank-store.action";

export interface BankState extends EntityState<Bank> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const bankAdapter: EntityAdapter<Bank> = createEntityAdapter<Bank>({
    selectId: (bank: Bank) => bank._id
});

export const defualtIssue: BankState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = bankAdapter.getInitialState(defualtIssue);

export function bankReducer(state = initialState, action: Action): BankState {
    switch (action.type) {
        case BankActionsType.CREATE_BANK:
            return { ...state, loading: true, loaded: false };

        case BankActionsType.CREATE_BANK_SUCCESS:
            const createPayload = (action as CreateBankActionSuccess).payload;            
            return bankAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case BankActionsType.CREATE_BANK_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateBankActionFail).payload
            }   

        case BankActionsType.UPDATE_BANK:
            return { ...state, loading: true, loaded: false };

        case BankActionsType.UPDATE_BANK_SUCCESS:
            const updatePayload = (action as UpdateBankActionSuccess).payload;            
            return bankAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case BankActionsType.UPDATE_BANK_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateBankActionFail).payload
            }   
            
        case BankActionsType.GET_BANK:
            return { ...state, loading: true, loaded: false };

        case BankActionsType.GET_BANK_SUCCESS:
            const { payload: getPayload } = (action as GetBankActionSuccess);            
            return bankAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case BankActionsType.GET_BANK_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetBankActionFail).payload
            } 

        case BankActionsType.LIST_BANKS:
            return { ...state, loading: true, loaded: false };

        case BankActionsType.LIST_BANKS_SUCCESS:
            const { payload: listPayload } = (action as ListBanksActionSuccess);
            return bankAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case BankActionsType.LIST_BANKS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListBanksActionFail).payload
            } 
        
        case BankActionsType.DELETE_BANK:
            return { ...state, loading: true, loaded: false };

        case BankActionsType.DELETE_BANK_SUCCESS:
            const { payload: deletePayload } = (action as DeleteBankActionSuccess);
            return bankAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case BankActionsType.DELETE_BANK_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteBankActionFail).payload
            } 
    
        
        default:
            return state;
    }
}