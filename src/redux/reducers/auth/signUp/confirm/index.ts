import { actionTypes } from './../../../../constants/actionTypes';
import { ConfirmSignUpState, ResendSignUpOTPState } from '../../../../actions/auth/signUp/confirm/types';

const initialState : ConfirmSignUpState = {
    isLoading: false,
    error: null,
    resp:null,
};
const resendOTPInitialState : ResendSignUpOTPState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const confirmSignUpReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CONFIRM_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CONFIRM_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CONFIRM_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const resendSignUpOTPReducer = (state = resendOTPInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.RESEND_SIGNUP_OTP_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.RESEND_SIGNUP_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.RESEND_SIGNUP_OTP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};