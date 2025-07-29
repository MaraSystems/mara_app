import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BotState } from "./bot.reducer";
import { IMessage } from "../models/imessage";


export const messageSelector = createFeatureSelector<Readonly<BotState>>('bot');

export const selectMessages = createSelector(
    messageSelector,
    state => {
        const messages = Object.values(state.entities);
        return messages as IMessage[];
    }
);
