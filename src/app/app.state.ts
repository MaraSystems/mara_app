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
import { ShareStoreEffect } from "./general/features/share/utils/store/share-store.effect";
import { ShareState, shareReducer } from "./general/features/share/utils/store/share-store.reducer";
import { ComplianceStoreEffect } from "./profile/features/compliance/utils/store/compliance-store.effect";
import { ComplianceState, complianceReducer } from "./profile/features/compliance/utils/store/compliance-store.reducer";
import { DashboardStoreEffect } from "./dashboard/utils/store/dashboard-store.effect";
import { DashboardState, dashboardReducer } from "./dashboard/utils/store/dashboard-store.reducer";
import { TransactionStoreEffect } from "./transaction/utils/store/transaction-store.effect";
import { TransactionState, transactionReducer } from "./transaction/utils/store/transaction-store.reducer";
import { BankStoreEffect } from "./bank/utils/store/bank-store.effect";
import { BankState, bankReducer } from "./bank/utils/store/bank-store.reducer";
import { ContractStoreEffect } from "./contract/utils/store/contract-store.effect";
import { ContractDeliverableStoreEffect } from "./contract-deliverable/utils/store/contract-deliverable-store.effect";
import { ContractState, contractReducer } from "./contract/utils/store/contract-store.reducer";
import { ContractDeliverableState, contractDeliverableReducer } from "./contract-deliverable/utils/store/contract-deliverable-store.reducer";
import { NotificationStoreEffect } from "./notification/utils/store/notification-store.effect";
import { NotificationState, notificationReducer } from "./notification/utils/store/notification-store.reducer";

export const appEffects = [
    ClientStoreEffect,
    AuthStoreEffect,
    KinStoreEffect,
    ProjectStoreEffect,
    ProjectDeliverableStoreEffect,
    AttachmentStoreEffect,
    CommentStoreEffect,
    ToastEffect,
    ShareStoreEffect,
    ComplianceStoreEffect,
    DashboardStoreEffect,
    TransactionStoreEffect,
    BankStoreEffect,
    ContractStoreEffect,
    ContractDeliverableStoreEffect,
    NotificationStoreEffect
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
    comments: CommentState,
    shares: ShareState,
    compliances: ComplianceState,
    dashboard: DashboardState,
    transactions: TransactionState,
    banks: BankState,
    contracts: ContractState,
    contractDeliverables: ContractDeliverableState,
    notifications: NotificationState
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
    comments: commentReducer,
    shares: shareReducer,
    compliances: complianceReducer,
    dashboard: dashboardReducer,
    transactions: transactionReducer,
    banks: bankReducer,
    contracts: contractReducer,
    contractDeliverables: contractDeliverableReducer,
    notifications: notificationReducer
}