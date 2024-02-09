import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth-store.reducer";

export const authSelector = createFeatureSelector<Readonly<AuthState>>('auth');

export const selectActiveAuth = createSelector(
    authSelector,
    state => state.entities[state.selectedId as string]
);