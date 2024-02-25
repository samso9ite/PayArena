
import { BackgroundCheckRequestConsentState, BackgroundCheckRequestFilterState, BackgroundCheckRequestGetAllState, BackgroundCheckRequestInitiateState } from '../../../../../actions/products/backgroundCheck/request/general/types';
import { actionTypes } from './../../../../../constants/actionTypes';


const initialState : BackgroundCheckRequestGetAllState = {
    isLoading: false,
    error: null,
    resp:null,
};
const requestInitiateInitialState : BackgroundCheckRequestInitiateState = {
    isLoading: false,
    error: null,
    resp:null,
};
const consentState : BackgroundCheckRequestConsentState = {
    isLoading: false,
    error: null,
    resp:null,
};
const filterInitialState : BackgroundCheckRequestFilterState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const backgroundCheckRequestGetAllReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestInitiateReducer = (state = requestInitiateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestConsentReducer = (state = consentState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestFilterReducer = (state = filterInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
