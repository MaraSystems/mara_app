import { Action } from "@ngrx/store";
import { Toast } from "../../features/toast.model";

export enum ToastActionTypes{
    ADD_TOAST = '[TOAST] Add Toast',
    REMOVE_TOAST = '[TOAST] Remove Toast',
}

export class AddToast implements Action{
    readonly type = ToastActionTypes.ADD_TOAST;
    constructor(public payload: Toast){}
}

export class RemoveToast implements Action{
    readonly type = ToastActionTypes.REMOVE_TOAST;
    constructor(public payload: string){}
}

export type ToastActions = Action | AddToast | RemoveToast;