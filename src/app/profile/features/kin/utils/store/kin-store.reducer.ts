import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Kin } from "src/app/users/utils/models/kin";
import { CreateKinActionFail, CreateKinActionSuccess, GetKinActionFail, GetKinActionSuccess, KinActionsType, UpdateKinActionFail, UpdateKinActionSuccess } from "./kin-store.action";

export interface KinState extends EntityState<Kin> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const kinAdapter: EntityAdapter<Kin> = createEntityAdapter<Kin>({
    selectId: (kin: Kin) => kin._id
});

export const defualtIssue: KinState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = kinAdapter.getInitialState(defualtIssue);

export function kinReducer(state = initialState, action: Action): KinState {
    switch (action.type) {
        case KinActionsType.CREATE_KIN:
            return { ...state, loading: true, loaded: false };

        case KinActionsType.CREATE_KIN_SUCCESS:
            const createPayload = (action as CreateKinActionSuccess).payload;
            return kinAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })

        case KinActionsType.CREATE_KIN_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateKinActionFail).payload
            }

        case KinActionsType.UPDATE_KIN:
            return { ...state, loading: true, loaded: false };

        case KinActionsType.UPDATE_KIN_SUCCESS:
            const updatePayload = (action as UpdateKinActionSuccess).payload;
            return kinAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })

        case KinActionsType.UPDATE_KIN_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateKinActionFail).payload
            }

        case KinActionsType.GET_KIN:
            return { ...state, loading: true, loaded: false };

        case KinActionsType.GET_KIN_SUCCESS:
            const { payload: kinPayload } = (action as GetKinActionSuccess);
            return kinAdapter.addOne(
                kinPayload,
                { ...state, loading: false, loaded: true }
            )

        case KinActionsType.GET_KIN_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetKinActionFail).payload
            }

        default:
            return state;
    }
}
