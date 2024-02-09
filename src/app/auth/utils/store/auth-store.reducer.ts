import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Auth } from "../models/auth.model";
import { AuthActionsType, GetAuthActionSuccess, LoginAuthActionSuccess, LogoutAuthActionSuccess } from "./auth-store.action";

export interface AuthState extends EntityState<Auth>  {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const authAdapter: EntityAdapter<Auth> = createEntityAdapter<Auth>({
    selectId: (auth: Auth) => auth.id
});

const initialState: AuthState = {
    ids: [],
    entities: {},
    selectedId: null,
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
            const loginPayload = (action as LoginAuthActionSuccess).payload;            
            localStorage.setItem('auth', JSON.stringify(loginPayload));
            return authAdapter.addOne(loginPayload, { ...state, loading: false, loaded: true, selectedId: loginPayload.id });
            
        case AuthActionsType.LOGIN_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }


        case AuthActionsType.GET_AUTH:
            return { ...state, loading: true, loaded: false }

        case AuthActionsType.GET_AUTH_SUCCESS:
            const authPayload = (action as GetAuthActionSuccess).payload;
            return authAdapter.addOne(authPayload, { ...state, loading: false, loaded: true, selectedId: authPayload.id });
            
        case AuthActionsType.GET_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }


        case AuthActionsType.LOGOUT_AUTH:
            return { ...state, loading: true, loaded: false }

        case AuthActionsType.LOGOUT_AUTH_SUCCESS:
            localStorage.removeItem('auth');
            return authAdapter.removeOne(state.selectedId as string, { ...state, loading: false, loaded: true });

        case AuthActionsType.LOGOUT_AUTH_FAIL:
            return { ...state, loading: false, loaded: true }

        default:
            return state;
    }
}