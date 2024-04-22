import { ActionReducerMap } from "@ngrx/store";
import { ClientState, clientReducer } from "./client/utils/store/client-store.reducer";
import { ClientStoreEffect } from "./client/utils/store/client-store.effect";
import { ToastState, toastReducer } from "./shared/features/toast/utils/store/toast.reducer";
import { AuthState, authReducer } from "./auth/utils/store/auth-store.reducer";
import { AuthStoreEffect } from "./auth/utils/store/auth-store.effect";
import { KinStoreEffect } from "./profile/features/kin/utils/store/kin-store.effect";
import { KinState, kinReducer } from "./profile/features/kin/utils/store/kin-store.reducer";
import { routerReducer } from "@ngrx/router-store";
import { RouterState } from "./router/store/router.reducer";
import { ProjectStoreEffect } from "./project/utils/store/project-store.effect";
import { ProjectDeliverableStoreEffect } from "./project-deliverable/utils/store/project-deliverable-store.effect";
import { ProjectState, projectReducer } from "./project/utils/store/project-store.reducer";
import { ProjectDeliverableState, projectDeliverableReducer } from "./project-deliverable/utils/store/project-deliverable-store.reducer";
import { PopupState, popupReducer } from "./shared/features/popup/utils/store/popup.reducer";
import { AttatchmentStoreEffect } from "./shared/features/attatchment/utils/store/attatchment-store.effect";
import { AttatchmentState, attatchmentReducer } from "./shared/features/attatchment/utils/store/attatchment-store.reducer";
import { CommentStoreEffect } from "./shared/features/comment/utils/store/comment-store.effect";
import { CommentState, commentReducer } from "./shared/features/comment/utils/store/comment-store.reducer";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect,
    ProjectStoreEffect,
    ProjectDeliverableStoreEffect,
    AttatchmentStoreEffect,
    CommentStoreEffect
];

export interface AppState {
    clients: ClientState,
    toasts: ToastState,
    popups: PopupState,
    auth: AuthState,
    kins: KinState,
    router: RouterState,
    projects: ProjectState,
    projectDeliverables: ProjectDeliverableState,
    attatchments: AttatchmentState,
    comments: CommentState
}

export const appReducers: ActionReducerMap<AppState> = {
    clients: clientReducer,
    toasts: toastReducer,
    popups: popupReducer,
    auth: authReducer,
    kins: kinReducer,
    router: routerReducer,
    projects: projectReducer,
    projectDeliverables: projectDeliverableReducer,
    attatchments: attatchmentReducer,
    comments: commentReducer
}