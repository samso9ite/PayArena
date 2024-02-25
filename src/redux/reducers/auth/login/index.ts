import { actionTypes } from './../../../constants/actionTypes';
import { LoginState } from '../../../actions/auth/login/types';

const initialState : LoginState = {
    isLoading: false,
    error: null,
    tokens:null,

};

const loginReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tokens:action.payload.tokens
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export default loginReducer
