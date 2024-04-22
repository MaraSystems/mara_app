import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth-store.reducer";
import { Auth } from "../models/auth.model";

export const authSelector = createFeatureSelector<Readonly<AuthState>>('auth');

export const selectActiveAuth = createSelector(
    authSelector,
    state => state.entities[state.selectedId as string] as Auth
);