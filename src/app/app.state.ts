import { ActionReducerMap } from "@ngrx/store";
import { ClientState, clientReducer } from "./client/utils/store/client-store.reducer";
import { ClientStoreEffect } from "./client/utils/store/client-store.effect";
import { ToastState, toastReducer } from "./toast/utils/store/toast.reducer";
import { AuthState, authReducer } from "./auth/utils/store/auth-store.reducer";
import { AuthStoreEffect } from "./auth/utils/store/auth-store.effect";
import { KinStoreEffect } from "./profile/features/kin/utils/store/kin-store.effect";
import { KinState, kinReducer } from "./profile/features/kin/utils/store/kin-store.reducer";
import { routerReducer } from "@ngrx/router-store";
import { RouterState } from "./router/store/router.reducer";
import { ProjectStoreEffect } from "./project/utils/store/project-store.effect";
import { ProjectDeliverableStoreEffect } from "./project/utils/store/project-deliverable-store.effect";
import { ProjectState, projectReducer } from "./project/utils/store/project-store.reducer";
import { ProjectDeliverableState, projectDeliverableReducer } from "./project/utils/store/project-deliverable-store.reducer";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect,
    ProjectStoreEffect,
    ProjectDeliverableStoreEffect
];

export interface AppState {
    clients: ClientState,
    toasts: ToastState,
    auth: AuthState,
    kins: KinState,
    router: RouterState,
    projects: ProjectState,
    'project-deliverables': ProjectDeliverableState
}

export const appReducers: ActionReducerMap<AppState> = {
    clients: clientReducer,
    toasts: toastReducer,
    auth: authReducer,
    kins: kinReducer,
    router: routerReducer,
    projects: projectReducer,
    'project-deliverables': projectDeliverableReducer
}