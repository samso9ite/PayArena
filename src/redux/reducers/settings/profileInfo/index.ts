
import { UpdateProfileInfoState, UpdateUserPasswordState } from '../../../actions/settings/profileInfo/types';
import { actionTypes } from './../../../constants/actionTypes';

const initialState : UpdateUserPasswordState = {
    isLoading: false,
    error: null,
    resp:null,
};
const profileInitialState : UpdateProfileInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};

export const updateUserPasswordReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_USER_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const updateProfileInfoReducer = (state = profileInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_PROFILE_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_PROFILE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_PROFILE_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};