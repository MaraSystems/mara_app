import { Action } from "@ngrx/store";
import { IPopup } from "../../features/popup.model";

export enum PopupActionTypes{
    SET_POPUP = '[POPUP] Set Popup',
}

export class SetPopup implements Action{
    readonly type = PopupActionTypes.SET_POPUP;
    constructor(public payload: IPopup){}
}

export type PopupActions = Action | SetPopup;