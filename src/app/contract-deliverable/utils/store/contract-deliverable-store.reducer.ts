import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { ContractDeliverable } from "../models/contract-deliverable";
import { CreateContractDeliverableActionFail, CreateContractDeliverableActionSuccess, GetContractDeliverableActionSuccess, ListContractDeliverablesActionFail, ListContractDeliverablesActionSuccess, ContractDeliverableActionsType, UpdateContractDeliverableActionFail, UpdateContractDeliverableActionSuccess } from "./contract-deliverable-store.action";

export interface ContractDeliverableState extends EntityState<ContractDeliverable> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const contractDeliverableAdapter: EntityAdapter<ContractDeliverable> = createEntityAdapter<ContractDeliverable>({
    selectId: (contractDeliverable: ContractDeliverable) => contractDeliverable._id
});

export const defualtIssue: ContractDeliverableState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = contractDeliverableAdapter.getInitialState(defualtIssue);

export function contractDeliverableReducer(state = initialState, action: Action): ContractDeliverableState {
    switch (action.type) {
        case ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE_SUCCESS:
            const createPayload = (action as CreateContractDeliverableActionSuccess).payload;
            return contractDeliverableAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })
            
        case ContractDeliverableActionsType.CREATE_CONTRACT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateContractDeliverableActionFail).payload
            }    

        case ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE_SUCCESS:
            const updatePayload = (action as UpdateContractDeliverableActionSuccess).payload;            
            return contractDeliverableAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case ContractDeliverableActionsType.UPDATE_CONTRACT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateContractDeliverableActionFail).payload
            }   
            
        case ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE:
            return { ...state, loading: true, loaded: false };

        case ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE_SUCCESS:
            const { payload: getPayload } = (action as GetContractDeliverableActionSuccess);
            return contractDeliverableAdapter.addOne(
                getPayload, { ...state, loading: false, loaded: true }
            )
            
        case ContractDeliverableActionsType.GET_CONTRACT_DELIVERABLE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateContractDeliverableActionFail).payload
            } 

        case ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES:
            return { ...state, loading: true, loaded: false };

        case ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES_SUCCESS:
            const { payload: listPayload } = (action as ListContractDeliverablesActionSuccess);
            return contractDeliverableAdapter.addMany(
                listPayload, { ...state, loading: false, loaded: true }
            )
            
        case ContractDeliverableActionsType.LIST_CONTRACT_DELIVERABLES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListContractDeliverablesActionFail).payload
            } 
    
        
        default:
            return state;
    }
}