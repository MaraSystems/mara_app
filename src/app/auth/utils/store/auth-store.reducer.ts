import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { AuthActionsType, LoginAuthActionSuccess } from "./auth-store.action";

export interface AuthState  {
    auth: Auth | undefined;
    loading: boolean;
    loaded: boolean;
    error: string;
}

const initialState: AuthState = {
    auth: undefined,
    loading: false,
    loaded: false,
    error: ''
}

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
            localStorage.setItem('auth', JSON.stringify(payload));
            return { ...state, loading: false, loaded: true, auth: payload }
            
        case AuthActionsType.LOGIN_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }

        default:
            return state;
    }
}