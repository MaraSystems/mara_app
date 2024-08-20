import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { AddToastSuccess, RemoveToast, ToastActionTypes, ToastActions, UpdateToast } from "./toast.action";
import { Toast } from "../models/toast";

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
            return { ...state }

        case ToastActionTypes.ADD_TOAST_SUCCESS:
            const addPayload = (action as AddToastSuccess).payload;
            return toastAdapter.addOne(addPayload, { ...state });

        case ToastActionTypes.UPDATE_TOAST:
            const updatePayload = (action as UpdateToast).payload;            
            return toastAdapter.updateOne(updatePayload, { ...state });

        case ToastActionTypes.REMOVE_TOAST:
            return toastAdapter.removeOne((action as RemoveToast).payload, { ...state })

        default:
            return state;
    }
}