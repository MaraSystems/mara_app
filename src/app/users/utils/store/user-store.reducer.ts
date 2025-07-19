import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { User } from "../models/user";
import { UserActionsType, GetUserActionSuccess, ListUsersActionSuccess, CreateUserActionSuccess, UpdateProfileActionFail, UpdateProfileActionSuccess } from "./user-store.action";

export interface UserState extends EntityState<User> {
    selectedId: string | null;
    authId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user: User) => user._id
});

export const defualtIssue: UserState = {
    ids: [],
    entities: {},
    selectedId: null,
    authId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = userAdapter.getInitialState(defualtIssue);

export function userReducer(state = initialState, action: Action): UserState {
    switch (action.type) {
        case UserActionsType.CREATE_USER:
            return { ...state, loading: true, loaded: false };

        case UserActionsType.CREATE_USER_SUCCESS:
            const registerPayload = (action as CreateUserActionSuccess).payload;
            return userAdapter.addOne(registerPayload, { ...state, loading: false, loaded: true })

        case UserActionsType.CREATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProfileActionFail).payload
            }

        case UserActionsType.UPDATE_PROFILE:
            return { ...state, loading: true, loaded: false };

        case UserActionsType.UPDATE_PROFILE_SUCCESS:
            const updatePayload = (action as UpdateProfileActionSuccess).payload;
            return userAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })

        case UserActionsType.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProfileActionFail).payload
            }

        case UserActionsType.GET_PROFILE:
            return { ...state, loading: true, loaded: false };

        case UserActionsType.GET_USER:
            return { ...state, loading: true, loaded: false };

        case UserActionsType.GET_USER_SUCCESS:
            const { auth, payload: userPayload } = (action as GetUserActionSuccess);
            return userAdapter.addOne(
                userPayload,
                { ...state, loading: false, loaded: true, authId: auth ? userPayload._id : state.authId  }
            )

        case UserActionsType.GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProfileActionFail).payload
            }

        case UserActionsType.LIST_USERS:
            return { ...state, loading: true, loaded: false };

        case UserActionsType.LIST_USERS_SUCCESS:
            let { payload: listPayload } = (action as ListUsersActionSuccess);
            return userAdapter.addMany(
                listPayload,
                { ...state, loading: false, loaded: true }
            )

        case UserActionsType.LIST_USERS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateProfileActionFail).payload
            }

        default:
            return state;
    }
}
