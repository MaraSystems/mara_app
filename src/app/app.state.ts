import { ActionReducerMap } from "@ngrx/store";
import { ClientState, clientReducer } from "./client/utils/store/client-store.reducer";
import { ClientStoreEffect } from "./client/utils/store/client-store.effect";
import { ToastState, toastReducer } from "./toast/utils/store/toast.reducer";
import { AuthState, authReducer } from "./auth/utils/store/auth-store.reducer";
import { AuthStoreEffect } from "./auth/utils/store/auth-store.effect";
import { KinStoreEffect } from "./kin/utils/store/kin-store.effect";
import { KinState, kinReducer } from "./kin/utils/store/kin-store.reducer";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect
];

export interface AppState {
    clients: ClientState,
    toasts: ToastState,
    auth: AuthState,
    kins: KinState
}

export const appReducers: ActionReducerMap<AppState> = {
    clients: clientReducer,
    toasts: toastReducer,
    auth: authReducer,
    kins: kinReducer
}