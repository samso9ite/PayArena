import { AccessTokenInfoState, MigrationSetPasswordState } from '../../actions/accessToken/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : AccessTokenInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
let passwordInitialState : MigrationSetPasswordState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const accessTokenInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ACCESS_TOKEN_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ACCESS_TOKEN_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ACCESS_TOKEN_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const migrationSetPasswordReducer = (state = passwordInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.MIGRATION_SET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.MIGRATION_SET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.MIGRATION_SET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};