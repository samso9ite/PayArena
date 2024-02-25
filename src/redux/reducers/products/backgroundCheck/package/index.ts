
import { BackgroundCheckPackageChangeStatusState, BackgroundCheckPackageCreateState, BackgroundCheckPackageFilterState, BackgroundCheckPackageGetActiveState, BackgroundCheckPackageGetAllState, BackgroundCheckPackageGetBaseChecksState, BackgroundCheckPackageGetBaseChecksSubserviceState, BackgroundCheckPackageGetSingleState, BackgroundCheckPackageUpdateState } from '../../../../actions/products/backgroundCheck/package/types';
import { actionTypes } from './../../../../constants/actionTypes';


const initialState : BackgroundCheckPackageGetAllState = {
    isLoading: false,
    error: null,
    resp:null,
};
const baseChecksInitialState : BackgroundCheckPackageGetBaseChecksState = {
    isLoading: false,
    error: null,
    resp:null,
};
const subserviceInitialState : BackgroundCheckPackageGetBaseChecksSubserviceState = {
    isLoading: false,
    error: null,
    resp:null,
};
const createInitialState : BackgroundCheckPackageCreateState = {
    isLoading: false,
    error: null,
    resp:null,
};
const updateInitialState : BackgroundCheckPackageUpdateState = {
    isLoading: false,
    error: null,
    resp:null,
};
const filterInitialState : BackgroundCheckPackageFilterState = {
    isLoading: false,
    error: null,
    resp:null,
};
const singleInitialState : BackgroundCheckPackageGetSingleState = {
    isLoading: false,
    error: null,
    resp:null,
};
const activeInitialState : BackgroundCheckPackageGetActiveState = {
    isLoading: false,
    error: null,
    resp:null,
};
const statusInitialState : BackgroundCheckPackageChangeStatusState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const backgroundCheckPackageGetAllReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageGetBaseChecksReducer = (state = baseChecksInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageGetBaseChecksSubserviceReducer = (state = subserviceInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageCreateReducer = (state = createInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageUpdateReducer = (state = updateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageFilterReducer = (state = filterInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageGetSingleReducer = (state = singleInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckPackageGetActiveReducer = (state = activeInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};



export const backgroundCheckPackageChangeStatusReducer = (state = statusInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};