import { actionTypes } from './../../../../constants/actionTypes';
import { InitResetPasswordState } from '../../../../actions/auth/resetPassword/initializeResetPassword/types';

const initialState : InitResetPasswordState = {
    isLoading: false,
    error: null,
    resp:null,
};

const initResetPasswordReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.INIT_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.INIT_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.INIT_RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export default initResetPasswordReducer
