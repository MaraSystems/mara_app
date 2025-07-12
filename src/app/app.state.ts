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
import { AttachmentStoreEffect } from "./attachment/utils/store/attachment-store.effect";
import { AttachmentState, attachmentReducer } from "./attachment/utils/store/attachment-store.reducer";
import { ToastEffect } from "./general/features/toast/utils/store/toast.effect";
import { ShareStoreEffect } from "./general/features/share/utils/store/share-store.effect";
import { ShareState, shareReducer } from "./general/features/share/utils/store/share-store.reducer";
import { ComplianceStoreEffect } from "./profile/features/compliance/utils/store/compliance-store.effect";
import { ComplianceState, complianceReducer } from "./profile/features/compliance/utils/store/compliance-store.reducer";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect,
    AttachmentStoreEffect,
    ToastEffect,
    ShareStoreEffect,
    ComplianceStoreEffect
];

export interface AppState {
    clients: ClientState,
    toasts: ToastState,
    auth: AuthState,
    kins: KinState,
    router: RouterState,
    attachments: AttachmentState,
    shares: ShareState,
    compliances: ComplianceState,
}

export const appReducers: ActionReducerMap<AppState> = {
    clients: clientReducer,
    toasts: toastReducer,
    auth: authReducer,
    kins: kinReducer,
    router: routerReducer,
    attachments: attachmentReducer,
    shares: shareReducer,
    compliances: complianceReducer
};
