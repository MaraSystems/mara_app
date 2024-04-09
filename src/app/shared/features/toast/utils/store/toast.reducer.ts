import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Toast } from "../../features/toast.model";
import { AddToast, RemoveToast, ToastActionTypes, ToastActions } from "./toast.action";

export interface ToastState extends EntityState<Toast> {
    selectedId: number | null;
}

export const toastAdapter: EntityAdapter<Toast> = createEntityAdapter<Toast>();

export const defualtIssue: ToastState = {
    ids: [],
    entities: {},
    selectedId: null
}

const initialState = toastAdapter.getInitialState(defualtIssue);

export function toastReducer(state = initialState, action: ToastActions): ToastState {
    switch (action.type) {
        case ToastActionTypes.ADD_TOAST:
            return toastAdapter.addOne((action as AddToast).payload, { ...state })
        case ToastActionTypes.REMOVE_TOAST:
            return toastAdapter.removeOne((action as RemoveToast).payload, { ...state })
        default:
            return state;
    }
}