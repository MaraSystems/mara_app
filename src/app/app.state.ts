import { ActionReducerMap } from "@ngrx/store";
import { routerReducer } from "@ngrx/router-store";
import { RouterState } from "./router/store/router.reducer";
import { botReducer, BotState } from "./general/features/bot/utils/store/bot.reducer";
import { BotStoreEffect } from "./general/features/bot/utils/store/bot.effect";

export const appEffects = [
    BotStoreEffect
];

export interface AppState {
    router: RouterState,
    bot: BotState
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    bot: botReducer
};
