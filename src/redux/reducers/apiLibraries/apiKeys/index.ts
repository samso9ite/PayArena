import { RegenerateLiveKeyState, RegenerateSandboxKeyState } from '../../../actions/apiLibraries/apiKeys/types';
import { actionTypes } from '../../../constants/actionTypes';

let initialState : RegenerateLiveKeyState = {
    isLoading: false,
    error: null,
    resp:null,
};
let sandboxInitialState : RegenerateSandboxKeyState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const regenerateLiveKeyReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REGENERATE_LIVE_KEY_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REGENERATE_LIVE_KEY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REGENERATE_LIVE_KEY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const regenerateSandboxKeyReducer = (state = sandboxInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REGENERATE_SANDBOX_KEY_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REGENERATE_SANDBOX_KEY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REGENERATE_SANDBOX_KEY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
