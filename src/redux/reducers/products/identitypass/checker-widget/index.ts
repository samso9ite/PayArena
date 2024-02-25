import {
    IdentityPassGetAllConfigState,
    IdentityPassCreateWidgetState,
    IdentityPassUpdateWidgetState,
    IdentityPassDeleteWidgetState,
    IdentityPassEndpointsState,
    IdentityPassGetWidgetState,
} from '../../../../actions/products/identitypass/checker-widget/types'
import { actionTypes } from './../../../../constants/actionTypes'

const configInitialState: IdentityPassGetAllConfigState = {
    isLoading: false,
    error: null,
    resp: null,
}
const createWidgetInitialState: IdentityPassCreateWidgetState = {
    isLoading: false,
    error: null,
    resp: null,
}
const updateWidgetInitialState: IdentityPassUpdateWidgetState = {
    isLoading: false,
    error: null,
    resp: null,
}
const deleteWidgetInitialState: IdentityPassDeleteWidgetState = {
    isLoading: false,
    error: null,
    resp: null,
}
const endpointsInitialState: IdentityPassEndpointsState = {
    isLoading: false,
    error: null,
    resp: null,
}
const getWidgetInitialState: IdentityPassGetWidgetState = {
    isLoading: false,
    error: null,
    resp: null,
}


// reducers
export const identityPassGetWidgetsReducer = (
    state = configInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_WIDGET_CONFIG_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_WIDGET_CONFIG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_WIDGET_CONFIG_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export const identityPassCreateWidgetReducer = (
    state = createWidgetInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_WIDGET_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_WIDGET_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_WIDGET_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export const identityPassUpdateWidgetReducer = (
    state = updateWidgetInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_WIDGET_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_WIDGET_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_WIDGET_UPDATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export const identityPassDeleteWidgetReducer = (
    state = deleteWidgetInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_WIDGET_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_WIDGET_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_WIDGET_DELETE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export const identityPassEndpointsReducer = (
    state = endpointsInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export const identityPassGetWidgetReducer = (
    state = getWidgetInitialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.IDENTITYPASS_WIDGET_GET_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.IDENTITYPASS_WIDGET_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.IDENTITYPASS_WIDGET_GET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}
