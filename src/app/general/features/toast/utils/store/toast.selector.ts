import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ToastState, toastAdapter } from "./toast.reducer";
import { Toast } from "../models/toast.class";


export const toastSelector = createFeatureSelector<Readonly<ToastState>>('toasts');

export const selectToasts = createSelector(
    toastSelector,
    state => {
        const toasts = Object.values(state.entities).slice(0, 5);        
        return toasts as Toast[];
    }
);

export const selectToastById = (id: string) => createSelector(
    toastSelector,
    state => {
        const toast = state.entities[id];    
        return toast;
    }
);