import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { IPopup } from "../../features/popup.model";
import { PopupActionTypes, PopupActions, SetPopup } from "./popup.action";

export interface PopupState extends EntityState<IPopup> {
    selectedId: number | null;
}

export const popupAdapter: EntityAdapter<IPopup> = createEntityAdapter<IPopup>();

export const defualtIssue: PopupState = {
    ids: [],
    entities: {},
    selectedId: null
}

const initialState = popupAdapter.getInitialState(defualtIssue);

export function popupReducer(state = initialState, action: PopupActions): PopupState {
    switch (action.type) {
        case PopupActionTypes.SET_POPUP:
            const popup = (action as SetPopup).payload;
            return popupAdapter.addOne(popup, { ...state });
            
        default:
            return state;
    }
}