import { ConfirmResetPasswordState } from '../../../../actions/auth/resetPassword/confirmResetPassword/types';
import { actionTypes } from './../../../../constants/actionTypes';

const initialState : ConfirmResetPasswordState = {
    isLoading: false,
    error: null,
    resp:null,

};

const confirmResetPasswordReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CONFIRM_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CONFIRM_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CONFIRM_RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export default confirmResetPasswordReducer
