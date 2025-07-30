import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { IMessage } from "../models/imessage";
import { BotActionsType, SendMessageAction, SendMessageActionFail, SendMessageActionSuccess, TriggerBotAction } from "./bot.action";
import { MessengerEnum } from "../models/messager.enum";
import { v4 as uuid } from 'uuid';

export interface BotState extends EntityState<IMessage> {
    loading: boolean;
    loaded: boolean;
    error: string;
    message: string;
}

export const botAdapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
    selectId: (message: IMessage) => message._id
});

export const defualtIssue: BotState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    error: '',
    message: ''
}

const initialState = botAdapter.getInitialState(defualtIssue);

export function botReducer(state = initialState, action: Action): BotState {
    switch (action.type) {
        case BotActionsType.TRIGGER_BOT:
            return { ...state, message: (action as TriggerBotAction).payload }

        case BotActionsType.SEND_MESSAGE:
            const sendPayload = { content: (action as SendMessageAction).payload.message, _id: uuid(), type: MessengerEnum.HUMAN, created_at: new Date() };
            return botAdapter.addOne(sendPayload, { ...state, loading: true, loaded: false })

        case BotActionsType.SEND_MESSAGE_SUCCESS:
            const replyPayload = { content: (action as SendMessageActionSuccess).payload, _id: uuid(), type: MessengerEnum.ROBOT, created_at: new Date() };
            console.log(replyPayload)
            return botAdapter.addOne(replyPayload, { ...state, loading: false, loaded: true })

        case BotActionsType.SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as SendMessageActionFail).payload
            }

        default:
            return state;
    }
}
