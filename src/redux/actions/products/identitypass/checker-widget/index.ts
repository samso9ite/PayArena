import { actionTypes } from '../../../../constants/actionTypes'
import {
    IdentityPassEndpointsPayload,
    IdentityPassEndpointsRequest,
    IdentityPassEndpointsSuccessPayload,
    IdentityPassEndpointsSuccess,
    IdentityPassEndpointsFailurePayload,
    IdentityPassEndpointsFailure,
    IdentityPassGetAllConfigPayload,
    IdentityPassGetAllConfigSuccessPayload,
    IdentityPassGetAllConfigFailurePayload,
    IdentityPassCreateWidgetPayload,
    IdentityPassCreateWidgetSuccessPayload,
    IdentityPassCreateWidgetFailurePayload,
    IdentityPassUpdateWidgetPayload,
    IdentityPassUpdateWidgetSuccessPayload,
    IdentityPassUpdateWidgetFailurePayload,
    IdentityPassDeleteWidgetPayload,
    IdentityPassDeleteWidgetSuccessPayload,
    IdentityPassDeleteWidgetFailurePayload,
    IdentityPassGetWidgetPayload,
    IdentityPassGetWidgetSuccessPayload,
    IdentityPassGetWidgetFailurePayload,
} from './types'

// get config
export const identityPassGetAllConfigRequest = (payload: IdentityPassGetAllConfigPayload) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CONFIG_REQUEST,
    payload,
})
export const identityPassGetAllConfigSuccess = (
    payload: IdentityPassGetAllConfigSuccessPayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CONFIG_SUCCESS,
    payload,
})
export const identityPassGetAllConfigFailure = (
    payload: IdentityPassGetAllConfigFailurePayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CONFIG_FAILURE,
    payload,
})

// create
export const IdentityPassCreateWidgetRequest = (payload: IdentityPassCreateWidgetPayload) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CREATE_REQUEST,
    payload,
})
export const identityPassCreateWidgetSuccess = (
    payload: IdentityPassCreateWidgetSuccessPayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CREATE_SUCCESS,
    payload,
})
export const identityPassCreateWidgetFailure = (
    payload: IdentityPassCreateWidgetFailurePayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CREATE_FAILURE,
    payload,
})

// update
export const IdentityPassUpdateWidgetRequest = (payload: IdentityPassUpdateWidgetPayload) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_UPDATE_REQUEST,
    payload,
})
export const identityPassUpdateWidgetSuccess = (
    payload: IdentityPassUpdateWidgetSuccessPayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_UPDATE_SUCCESS,
    payload,
})
export const identityPassUpdateWidgetFailure = (
    payload: IdentityPassUpdateWidgetFailurePayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_CREATE_FAILURE,
    payload,
})

//delete
export const IdentityPassDeleteWidgetRequest = (payload: IdentityPassDeleteWidgetPayload) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_DELETE_REQUEST,
    payload,
})
export const identityPassDeleteWidgetSuccess = (
    payload: IdentityPassDeleteWidgetSuccessPayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_DELETE_SUCCESS,
    payload,
})
export const identityPassDeleteWidgetFailure = (
    payload: IdentityPassDeleteWidgetFailurePayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_DELETE_FAILURE,
    payload,
})


//get single widget
export const IdentityPassGetWidgetRequest = (payload: IdentityPassGetWidgetPayload) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_GET_REQUEST,
    payload,
})
export const identityPassGetWidgetSuccess = (
    payload: IdentityPassGetWidgetSuccessPayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_GET_SUCCESS,
    payload,
})
export const identityPassGetWidgetFailure = (
    payload: IdentityPassGetWidgetFailurePayload
) => ({
    type: actionTypes.IDENTITYPASS_WIDGET_GET_FAILURE,
    payload,
})

// get endpoints
export const identitypassEndpointsRequest = (
    payload: IdentityPassEndpointsPayload
): IdentityPassEndpointsRequest => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST,
    payload,
})
export const identitypassEndpointsSuccess = (
    payload: IdentityPassEndpointsSuccessPayload
): IdentityPassEndpointsSuccess => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS,
    payload,
})
export const identitypassEndpointsFailure = (
    payload: IdentityPassEndpointsFailurePayload
): IdentityPassEndpointsFailure => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE,
    payload,
})
