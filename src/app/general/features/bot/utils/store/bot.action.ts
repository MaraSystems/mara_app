import { Action } from "@ngrx/store";
import { SideEffects } from "src/app/general/utils/models/side-effects";
import { IMessage } from "../models/imessage";

export enum BotActionsType {
    SEND_MESSAGE = "[BOT] Send Message",
    SEND_MESSAGE_SUCCESS = "[BOT] Send Message Success",
    SEND_MESSAGE_FAIL = "[BOT] Send Message Fail"
}

export class SendMessageAction implements Action {
    readonly type = BotActionsType.SEND_MESSAGE;
    constructor(public payload: string, public sideEffects = new SideEffects()){}
}

export class SendMessageActionSuccess implements Action {
    readonly type = BotActionsType.SEND_MESSAGE_SUCCESS;
    constructor(public payload: IMessage){}
}

export class SendMessageActionFail implements Action {
    readonly type = BotActionsType.SEND_MESSAGE_FAIL;
    constructor(public payload: string){}
}

export type BotAction =
SendMessageAction |
SendMessageActionSuccess |
SendMessageActionFail;
