import { APIStatusState } from '../../../actions/apiLibraries/status/types';
import { actionTypes } from '../../../constants/actionTypes';

let initialState : APIStatusState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const apiStatusReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.API_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.API_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
