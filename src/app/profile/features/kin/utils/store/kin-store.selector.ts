import { createFeatureSelector, createSelector } from "@ngrx/store";
import { KinState } from "./kin-store.reducer";
import { Kin } from "src/app/users/utils/models/kin";

export const kinSelector = createFeatureSelector<Readonly<KinState>>('kins');

export const selectKinByUserId = (userId: string) => createSelector(
    kinSelector,
    state => Object.values(state.entities).find(entity => entity?.userId === userId) as Kin
);
