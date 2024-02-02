import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { AuthActionsType, LoginAuthActionSuccess } from "./auth-store.action";

export interface AuthState extends EntityState<Auth> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const authAdapter: EntityAdapter<Auth> = createEntityAdapter<Auth>({
    selectId: (auth: Auth) => auth.client._id
});

export const defualtIssue: AuthState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = authAdapter.getInitialState(defualtIssue);

export function authReducer(state = initialState, action: Action): AuthState {
    switch (action.type) {
        case AuthActionsType.GET_PASSWORD_AUTH:
            return { ...state, loading: true, loaded: false };

        case AuthActionsType.GET_PASSWORD_AUTH_SUCCESS:
            return { ...state, loading: false, loaded: true }

        case AuthActionsType.GET_PASSWORD_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }

        case AuthActionsType.LOGIN_AUTH:
            return { ...state, loading: true, loaded: false }

        case AuthActionsType.LOGIN_AUTH_SUCCESS:
            const payload = (action as LoginAuthActionSuccess).payload;
            return authAdapter.addOne(payload, { ...state, loading: false, loaded: true, selectedId: payload.client._id })
            
        case AuthActionsType.LOGIN_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }

        default:
            return state;
    }
}