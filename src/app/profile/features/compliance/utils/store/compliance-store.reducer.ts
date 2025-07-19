import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Action } from "@ngrx/store";
import { Compliance } from "src/app/users/utils/models/compliance";
import { CreateComplianceActionFail, CreateComplianceActionSuccess, GetComplianceActionFail, GetComplianceActionSuccess, ComplianceActionsType, UpdateComplianceActionFail, UpdateComplianceActionSuccess, ListComplianceActionSuccess, ListComplianceActionFail } from "./compliance-store.action";

export interface ComplianceState extends EntityState<Compliance> {
    selectedId: string | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export const complianceAdapter: EntityAdapter<Compliance> = createEntityAdapter<Compliance>({
    selectId: (compliance: Compliance) => compliance._id
});

export const defualtIssue: ComplianceState = {
    ids: [],
    entities: {},
    selectedId: null,
    loading: false,
    loaded: false,
    error: ''
}

const initialState = complianceAdapter.getInitialState(defualtIssue);

export function complianceReducer(state = initialState, action: Action): ComplianceState {
    switch (action.type) {
        case ComplianceActionsType.CREATE_COMPLIANCE:
            return { ...state, loading: true, loaded: false };

        case ComplianceActionsType.CREATE_COMPLIANCE_SUCCESS:
            const createPayload = (action as CreateComplianceActionSuccess).payload;
            return complianceAdapter.addOne(createPayload, { ...state, loading: false, loaded: true })

        case ComplianceActionsType.CREATE_COMPLIANCE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as CreateComplianceActionFail).payload
            }

        case ComplianceActionsType.UPDATE_COMPLIANCE:
            return { ...state, loading: true, loaded: false };

        case ComplianceActionsType.UPDATE_COMPLIANCE_SUCCESS:
            const updatePayload = (action as UpdateComplianceActionSuccess).payload;
            return complianceAdapter.updateOne(updatePayload, { ...state, loading: false, loaded: true })

        case ComplianceActionsType.UPDATE_COMPLIANCE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as UpdateComplianceActionFail).payload
            }

        case ComplianceActionsType.GET_COMPLIANCE:
            return { ...state, loading: true, loaded: false };

        case ComplianceActionsType.GET_COMPLIANCE_SUCCESS:
            const { payload: compliancePayload } = (action as GetComplianceActionSuccess);
            return complianceAdapter.addOne(
                compliancePayload,
                { ...state, loading: false, loaded: true }
            )

        case ComplianceActionsType.GET_COMPLIANCE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as GetComplianceActionFail).payload
            }

        case ComplianceActionsType.LIST_COMPLIANCE:
            return { ...state, loading: true, loaded: false };

        case ComplianceActionsType.LIST_COMPLIANCE_SUCCESS:
            const { payload: listPayload } = (action as ListComplianceActionSuccess);
            return complianceAdapter.addMany(
                listPayload,
                { ...state, loading: false, loaded: true }
            )

        case ComplianceActionsType.LIST_COMPLIANCE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                error: (action as ListComplianceActionFail).payload
            }

        default:
            return state;
    }
}
