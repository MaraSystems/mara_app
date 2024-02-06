import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Client } from "src/app/client/utils/models/client";
import { ClientState } from "src/app/client/utils/store/client-store.reducer";
import { AuthState } from "./auth-store.reducer";

export const authSelector = createFeatureSelector<Readonly<AuthState>>('auth');

export const selectActiveAuth = createSelector(
    authSelector,
    state => {
        console.log(state.auth);
        return state.auth
    }
);