import { ComplianceDocInfoState } from '../../actions/complianceCert/types';
import { DashboardInfoState } from '../../actions/dashboard/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : ComplianceDocInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const complianceDocInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.COMPLIANCE_DOC_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.COMPLIANCE_DOC_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.COMPLIANCE_DOC_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
