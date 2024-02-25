import { IdentitypassBulkHistoryState, IdentitypassBulkVerificationState, IdentitypassEndpointsState, IdentitypassVerificationState } from '../../../../actions/products/identitypass/verification/types';
import { actionTypes } from './../../../../constants/actionTypes';


const initialState : IdentitypassVerificationState = {
    isLoading: false,
    error: null,
    resp:null,
};
const endpointsInitialState : IdentitypassEndpointsState = {
    isLoading: false,
    error: null,
    resp:null,
};
const bulkInitialState : IdentitypassBulkVerificationState = {
    isLoading: false,
    error: null,
    resp:null,
};
const bulkHistoryInitialState : IdentitypassBulkHistoryState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const identitypassVerificationReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_VERIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.IDENTITYPASS_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.IDENTITYPASS_VERIFICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const identitypassEndpointsReducer = (state = endpointsInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};



export const identitypassBulkVerificationReducer = (state = bulkInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_BULK_VERIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.IDENTITYPASS_BULK_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.IDENTITYPASS_BULK_VERIFICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};



export const identitypassBulkHistoryReducer = (state = bulkHistoryInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_BULK_HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.IDENTITYPASS_BULK_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.IDENTITYPASS_BULK_HISTORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};