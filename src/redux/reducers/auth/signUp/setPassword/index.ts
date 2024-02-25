import { actionTypes } from './../../../../constants/actionTypes';
import { SetPasswordState } from '../../../../actions/auth/signUp/setPassword/types';

const initialState : SetPasswordState = {
    isLoading: false,
    error: null,
    resp:null,

};

const setPasswordReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export default setPasswordReducer
