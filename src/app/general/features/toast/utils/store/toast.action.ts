import { Action } from "@ngrx/store";
import { IToast, Toast } from "../models/toast.class";
import { Update } from "@ngrx/entity";

export enum ToastActionTypes{
    ADD_TOAST = '[TOAST] Add Toast',
    ADD_TOAST_SUCCESS = '[TOAST] Add Toast Success',
    UPDATE_TOAST = '[TOAST] Update Toast',
    REMOVE_TOAST = '[TOAST] Remove Toast',
}

export class AddToast implements Action{
    readonly type = ToastActionTypes.ADD_TOAST;
    constructor(public payload: IToast){}
}

export class AddToastSuccess implements Action{
    readonly type = ToastActionTypes.ADD_TOAST_SUCCESS;
    constructor(public payload: Toast){}
}

export class UpdateToast implements Action{
    readonly type = ToastActionTypes.UPDATE_TOAST;
    constructor(public payload: Update<Toast>){}
}

export class RemoveToast implements Action{
    readonly type = ToastActionTypes.REMOVE_TOAST;
    constructor(public payload: string){}
}

export type ToastActions = Action | AddToast | UpdateToast | RemoveToast;