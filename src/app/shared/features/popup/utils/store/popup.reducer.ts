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
            const id = Object.values(state.entities).length + 1;
            const payload = { ... (action as SetPopup).payload, id };  
            return popupAdapter.addOne(payload, { ...state })
            
        default:
            return state;
    }
}