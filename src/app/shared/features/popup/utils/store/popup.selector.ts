import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PopupState, popupAdapter } from "./popup.reducer";
import { IPopup } from "../../features/popup.model";


export const popupSelector = createFeatureSelector<Readonly<PopupState>>('popups');

export const selectPopupAction = createSelector(
    popupSelector,
    state => Object.values(state.entities).pop()
);