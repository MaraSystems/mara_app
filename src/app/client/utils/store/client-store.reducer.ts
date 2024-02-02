import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Client } from "../models/client";
import { ClientActionsType, RegisterClientActionFail, RegisterClientActionSuccess } from "./client-store.action";

export interface ClientState extends EntityState<Client> {
    selectedId: string | null;
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
    loading: false,
    loaded: false,
    error: ''
}

const initialState = clientAdapter.getInitialState(defualtIssue);

export function clientReducer(state = initialState, action: Action): ClientState {
    switch (action.type) {
        case ClientActionsType.REGISTER_CLIENT:
            return { ...state, loading: true };

        case ClientActionsType.REGISTER_CLIENT_SUCCESS:
            return clientAdapter.addOne((action as RegisterClientActionSuccess).payload, { ...state, loading: false, loaded: true })
            
        case ClientActionsType.REGISTER_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as RegisterClientActionFail).payload
            }    
        default:
            return state;
    }
}