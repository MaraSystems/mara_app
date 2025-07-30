import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { IMessage } from "../models/imessage";
import { BotActionsType, SendMessageAction, SendMessageActionFail, SendMessageActionSuccess } from "./bot.action";
import { MessengerEnum } from "../models/messager.enum";

export interface BotState extends EntityState<IMessage> {
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const botAdapter: EntityAdapter<IMessage> = createEntityAdapter<IMessage>({
    selectId: (user: IMessage) => user._id
});

export const defualtIssue: BotState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    error: ''
}

const initialState = botAdapter.getInitialState(defualtIssue);

export function botReducer(state = initialState, action: Action): BotState {
    switch (action.type) {
        case BotActionsType.SEND_MESSAGE:
            const sendPayload = { content: (action as SendMessageAction).payload.message, _id: new Date().toString(), type: MessengerEnum.HUMAN, created_at: new Date() };
            return botAdapter.addOne(sendPayload, { ...state, loading: true, loaded: false })

        case BotActionsType.SEND_MESSAGE_SUCCESS:
            const replyPayload = { content: (action as SendMessageActionSuccess).payload, _id: new Date().toString(), type: MessengerEnum.ROBOT, created_at: new Date() };
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
