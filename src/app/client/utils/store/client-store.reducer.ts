import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Client } from "../models/client";
import { ClientActionsType, GetClientActionSuccess, ListClientsActionSuccess, RegisterClientActionSuccess, UpdateClientActionFail, UpdateClientActionSuccess } from "./client-store.action";

export interface ClientState extends EntityState<Client> {
    selectedId: string | null;
    authId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const clientAdapter: EntityAdapter<Client> = createEntityAdapter<Client>({
    selectId: (client: Client) => client._id
});

export const defualtIssue: ClientState = {
    ids: [],
    entities: {},
    selectedId: null,
    authId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = clientAdapter.getInitialState(defualtIssue);

export function clientReducer(state = initialState, action: Action): ClientState {
    switch (action.type) {
        case ClientActionsType.REGISTER_CLIENT:
            return { ...state, loading: true, loaded: false };

        case ClientActionsType.REGISTER_CLIENT_SUCCESS:
            const registerPayload = (action as RegisterClientActionSuccess).payload;
            return clientAdapter.addOne(registerPayload, { ...state, loading: false, loaded: true })
            
        case ClientActionsType.REGISTER_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateClientActionFail).payload
            }    

        case ClientActionsType.UPDATE_CLIENT:
            return { ...state, loading: true, loaded: false };

        case ClientActionsType.UPDATE_CLIENT_SUCCESS:
            const updatePayload = (action as UpdateClientActionSuccess).payload;            
            return clientAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })
            
        case ClientActionsType.UPDATE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateClientActionFail).payload
            }   
            
        case ClientActionsType.GET_CLIENT:
            return { ...state, loading: true, loaded: false };

        case ClientActionsType.GET_CLIENT_SUCCESS:
            const { auth, payload: clientPayload } = (action as GetClientActionSuccess);
            return clientAdapter.addOne(
                clientPayload, 
                { ...state, loading: false, loaded: true, authId: auth ? clientPayload._id : state.authId  }
            )
            
        case ClientActionsType.GET_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateClientActionFail).payload
            } 

        case ClientActionsType.LIST_CLIENTS:
            return { ...state, loading: true, loaded: false };

        case ClientActionsType.LIST_CLIENTS_SUCCESS:
            let { payload: listPayload } = (action as ListClientsActionSuccess);
            return clientAdapter.addMany(
                listPayload, 
                { ...state, loading: false, loaded: true }
            )
            
        case ClientActionsType.LIST_CLIENTS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateClientActionFail).payload
            } 

        default:
            return state;
    }
}