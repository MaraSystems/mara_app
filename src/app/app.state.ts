import { ActionReducerMap } from "@ngrx/store";
import { ToastState, toastReducer } from "./general/features/toast/utils/store/toast.reducer";
import { routerReducer } from "@ngrx/router-store";
import { RouterState } from "./router/store/router.reducer";
import { ToastEffect } from "./general/features/toast/utils/store/toast.effect";
import { botReducer, BotState } from "./general/features/bot/utils/store/bot.reducer";
import { BotStoreEffect } from "./general/features/bot/utils/store/bot.effect";

export const appEffects = [
    ToastEffect,
    BotStoreEffect
];

export interface AppState {
    toasts: ToastState,
    router: RouterState,
    bot: BotState
}

export const appReducers: ActionReducerMap<AppState> = {
    toasts: toastReducer,
    router: routerReducer,
    bot: botReducer
};
