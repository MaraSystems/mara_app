import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Transaction } from "../models/transaction.model";
import { DeleteTransactionActionFail, DeleteTransactionActionSuccess, GetTransactionActionFail, GetTransactionActionSuccess, ListTransactionsActionFail, ListTransactionsActionSuccess, TransactionActionsType, UpdateTransactionActionFail, UpdateTransactionActionSuccess } from "./transaction-store.action";

export interface TransactionState extends EntityState<Transaction> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
    selectId: (transaction: Transaction) => transaction._id
});

export const defualtIssue: TransactionState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = transactionAdapter.getInitialState(defualtIssue);

export function transactionReducer(state = initialState, action: Action): TransactionState {
    switch (action.type) {
        case TransactionActionsType.UPDATE_TRANSACTION:
            return { ...state, loading: true, loaded: false };

        case TransactionActionsType.UPDATE_TRANSACTION_SUCCESS:
            const updatePayload = (action as UpdateTransactionActionSuccess).payload;            
            return transactionAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case TransactionActionsType.UPDATE_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateTransactionActionFail).payload
            }   
            
        case TransactionActionsType.GET_TRANSACTION:
            return { ...state, loading: true, loaded: false };

        case TransactionActionsType.GET_TRANSACTION_SUCCESS:
            const { payload: getPayload } = (action as GetTransactionActionSuccess);            
            return transactionAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case TransactionActionsType.GET_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetTransactionActionFail).payload
            } 

        case TransactionActionsType.LIST_TRANSACTIONS:
            return { ...state, loading: true, loaded: false };

        case TransactionActionsType.LIST_TRANSACTIONS_SUCCESS:
            const { payload: listPayload } = (action as ListTransactionsActionSuccess);
            return transactionAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case TransactionActionsType.LIST_TRANSACTIONS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListTransactionsActionFail).payload
            } 
        
        case TransactionActionsType.DELETE_TRANSACTION:
            return { ...state, loading: true, loaded: false };

        case TransactionActionsType.DELETE_TRANSACTION_SUCCESS:
            const { payload: deletePayload } = (action as DeleteTransactionActionSuccess);
            return transactionAdapter.removeOne(
                deletePayload._id, { ...state, loading: false, loaded: true }
            )
            
        case TransactionActionsType.DELETE_TRANSACTION_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as DeleteTransactionActionFail).payload
            } 
    
        
        default:
            return state;
    }
}