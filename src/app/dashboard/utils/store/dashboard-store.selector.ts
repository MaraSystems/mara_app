import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard-store.reducer";
import { DashboardWidget } from "../models/dashboard-widget";

export const dashboardSelector = createFeatureSelector<Readonly<DashboardState>>('dashboard');

export const selectDashboardWidgetById = <T>(id: string) => createSelector(
    dashboardSelector,
    state => state.entities[id] as DashboardWidget<T>
);