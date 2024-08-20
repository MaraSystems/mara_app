import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { CreateContractActionFail, CreateContractActionSuccess, GetContractActionSuccess, ListContractsActionFail, ListContractsActionSuccess, ContractActionsType, UpdateContractActionFail, UpdateContractActionSuccess } from "./contract-store.action";
import { Contract } from "../models/contract";

export interface ContractState extends EntityState<Contract> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const contractAdapter: EntityAdapter<Contract> = createEntityAdapter<Contract>({
    selectId: (contract: Contract) => contract._id
});

export const defualtIssue: ContractState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = contractAdapter.getInitialState(defualtIssue);

export function contractReducer(state = initialState, action: Action): ContractState {
    switch (action.type) {
        case ContractActionsType.CREATE_CONTRACT:
            return { ...state, loading: true, loaded: false };

        case ContractActionsType.CREATE_CONTRACT_SUCCESS:
            const createPayload = (action as CreateContractActionSuccess).payload;
            return contractAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case ContractActionsType.CREATE_CONTRACT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateContractActionFail).payload
            }    

        case ContractActionsType.UPDATE_CONTRACT:
            return { ...state, loading: true, loaded: false };

        case ContractActionsType.UPDATE_CONTRACT_SUCCESS:
            const updatePayload = (action as UpdateContractActionSuccess).payload;            
            return contractAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case ContractActionsType.UPDATE_CONTRACT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateContractActionFail).payload
            }   
            
        case ContractActionsType.GET_CONTRACT:
            return { ...state, loading: true, loaded: false };

        case ContractActionsType.GET_CONTRACT_SUCCESS:
            const { payload: getPayload } = (action as GetContractActionSuccess);
            return contractAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case ContractActionsType.GET_CONTRACT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateContractActionFail).payload
            } 

        case ContractActionsType.LIST_CONTRACTS:
            return { ...state, loading: true, loaded: false };

        case ContractActionsType.LIST_CONTRACTS_SUCCESS:
            const { payload: listPayload } = (action as ListContractsActionSuccess);
            return contractAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case ContractActionsType.LIST_CONTRACTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListContractsActionFail).payload
            } 
    
        
        default:
            return state;
    }
}