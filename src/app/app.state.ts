import { ActionReducerMap } from "@ngrx/store";
import { ClientState, clientReducer } from "./client/utils/store/client-store.reducer";
import { ClientStoreEffect } from "./client/utils/store/client-store.effect";
import { ToastState, toastReducer } from "./general/features/toast/utils/store/toast.reducer";
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
import { AttachmentStoreEffect } from "./general/features/attachment/utils/store/attatchment-store.effect";
import { AttachmentState, attachmentReducer } from "./general/features/attachment/utils/store/attatchment-store.reducer";
import { CommentStoreEffect } from "./general/features/comment/utils/store/comment-store.effect";
import { CommentState, commentReducer } from "./general/features/comment/utils/store/comment-store.reducer";
import { ToastEffect } from "./general/features/toast/utils/store/toast.effect";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect,
    ProjectStoreEffect,
    ProjectDeliverableStoreEffect,
    AttachmentStoreEffect,
    CommentStoreEffect,
    ToastEffect
];

export interface AppState {
    clients: ClientState,
    toasts: ToastState,
    auth: AuthState,
    kins: KinState,
    router: RouterState,
    projects: ProjectState,
    projectDeliverables: ProjectDeliverableState,
    attachments: AttachmentState,
    comments: CommentState
}

export const appReducers: ActionReducerMap<AppState> = {
    clients: clientReducer,
    toasts: toastReducer,
    auth: authReducer,
    kins: kinReducer,
    router: routerReducer,
    projects: projectReducer,
    projectDeliverables: projectDeliverableReducer,
    attachments: attachmentReducer,
    comments: commentReducer
}