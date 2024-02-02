import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Client } from "src/app/client/utils/models/client";
import { ClientState, clientAdapter } from "src/app/client/utils/store/client-store.reducer";

export const clientSelector = createFeatureSelector<Readonly<ClientState>>('clients');

export const selectAllClients = createSelector(
    clientSelector,
    clientAdapter.getSelectors().selectAll
);

export const selectClientById = (id: string) => createSelector(
    clientSelector,
    state => state.entities[id] as Client
);