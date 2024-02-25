import { actionTypes } from './../../../../constants/actionTypes';
import { ClearSignUpEmailState, InitSignUpState } from '../../../../actions/auth/signUp/initialize/types'

const initialState : InitSignUpState = {
    isLoading: false,
    error: null,
    resp:null,
};
const clearInitialState : ClearSignUpEmailState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const initSignUpReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.INIT_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.INIT_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.INIT_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const clearSignUpEmailReducer = (state = clearInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CLEAR_SIGNUP_EMAIL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CLEAR_SIGNUP_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CLEAR_SIGNUP_EMAIL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};