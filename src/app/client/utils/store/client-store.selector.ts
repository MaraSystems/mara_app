import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientState, clientAdapter } from "./client-store.reducer";
import { Client } from "../models/client";

export const clientSelector = createFeatureSelector<Readonly<ClientState>>('clients');

export const selectAllClients = createSelector(
    clientSelector,
    clientAdapter.getSelectors().selectAll
);

export const selectAuthClient = createSelector(
    clientSelector,
    state => state.entities[state.authId as string] as Client
);

export const selectClientById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Client
);

export const selectSearchedClients = (query: string) => createSelector(
    clientSelector,
    state => Object.values(state.entities).filter((client) => client?.searchQuery.has(query)) as Client[]
);