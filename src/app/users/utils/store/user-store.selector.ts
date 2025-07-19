import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, userAdapter } from "./user-store.reducer";
import { User } from "../models/user";

export const userSelector = createFeatureSelector<Readonly<UserState>>('users');

export const selectAllUsers = createSelector(
    userSelector,
    userAdapter.getSelectors().selectAll
);

export const selectAuthUser = createSelector(
    userSelector,
    state => state.entities[state.authId as string] as User
);

export const selectUserById = (id: string) => createSelector(
    userSelector,
    state => state.entities[id] as User
);
