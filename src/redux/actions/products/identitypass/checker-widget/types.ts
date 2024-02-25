import { actionTypes } from '../../../../constants/actionTypes'

export interface IIdentityPassEndpoints {
    resp: any
}
export interface IIdentityPassGetAllConfig {
    resp: any
}
export interface IIdentityPassCreateWidget {
    resp: any
}
export interface IIdentityPassUpdateWidget {
    resp: any
}
export interface IIdentityPassDeleteWidget {
    resp: any
}
export interface IIdentityPassGetWidget {
    resp: any
}

// Request interfaces states
export interface IdentityPassGetAllConfigState {
    isLoading: boolean
    resp: any
    error: string | null
}
export interface IdentityPassCreateWidgetState {
    isLoading: boolean
    resp: any
    error: string | null
}
export interface IdentityPassUpdateWidgetState {
    isLoading: boolean
    resp: any
    error: string | null
}
export interface IdentityPassDeleteWidgetState {
    isLoading: boolean
    resp: any
    error: string | null
}
export interface IdentityPassEndpointsState {
    isLoading: boolean
    resp: any
    error: string | null
}
export interface IdentityPassGetWidgetState {
    isLoading: boolean
    resp: any
    error: string | null
}

// payload interfaces
export interface IdentityPassGetAllConfigPayload {
    values: {}
    callback: any
}
export interface IdentityPassCreateWidgetPayload {
    values: {
        name: string,
        has_financial: any,
        has_radar: any,
        has_verification: any,
    }
    callback: any
}
export interface IdentityPassUpdateWidgetPayload {
    values: {
        name: any
        theme_color: any
        subtitle: any
        countries: any
        face_confidence: any
        endpoint: any
    }
    callback: any
}
export interface IdentityPassDeleteWidgetPayload {
    values: {
        config_id: string
    }
    callback: any
}
export interface IdentityPassEndpointsPayload {
    values: {}
    callback: any
}
export interface IdentityPassGetWidgetPayload {
    values: {
        config_id: string
    }
    callback: any
}

// success payload
export interface IdentityPassGetAllConfigSuccessPayload {
    resp: any
}
export interface IdentityPassCreateWidgetSuccessPayload {
    resp: any
}
export interface IdentityPassUpdateWidgetSuccessPayload {
    resp: any
}
export interface IdentityPassDeleteWidgetSuccessPayload {
    resp: any
}
export interface IdentityPassEndpointsSuccessPayload {
    resp: any
}
export interface IdentityPassGetWidgetSuccessPayload {
    resp: any
}

// failure payload
export interface IdentityPassGetAllConfigFailurePayload {
    error: string
}
export interface IdentityPassCreateWidgetFailurePayload {
    error: string
}
export interface IdentityPassUpdateWidgetFailurePayload {
    error: string
}
export interface IdentityPassDeleteWidgetFailurePayload {
    error: string
}
export interface IdentityPassEndpointsFailurePayload {
    error: string
}
export interface IdentityPassGetWidgetFailurePayload {
    error: string
}

// requests
export interface IdentityPassGetAllConfigRequest {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CONFIG_REQUEST
    payload: IdentityPassGetAllConfigPayload
}
export interface identityPassCreateWidgetRequest {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CREATE_REQUEST
    payload: IdentityPassCreateWidgetPayload
}
export interface identityPassUpdateWidgetRequest {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_UPDATE_REQUEST
    payload: IdentityPassUpdateWidgetPayload
}
export interface identityPassDeleteWidgetRequest {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_DELETE_REQUEST
    payload: IdentityPassDeleteWidgetPayload
}
export interface IdentityPassEndpointsRequest {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST
    payload: IdentityPassEndpointsPayload
}
export interface identityPassGetWidgetRequest {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_GET_REQUEST
    payload: IdentityPassGetWidgetPayload
}

// success
export type IdentityPassGetAllConfigSuccess = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CONFIG_SUCCESS
    payload: IdentityPassGetAllConfigSuccessPayload
}
export type IdentityPassCreateWidgetSuccess = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CREATE_SUCCESS
    payload: IdentityPassCreateWidgetSuccessPayload
}
export type IdentityPassUpdateWidgetSuccess = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_UPDATE_SUCCESS
    payload: IdentityPassUpdateWidgetSuccessPayload
}
export type IdentityPassDeleteWidgetSuccess = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_DELETE_SUCCESS
    payload: IdentityPassDeleteWidgetSuccessPayload
}
export type IdentityPassEndpointsSuccess = {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS
    payload: IdentityPassEndpointsSuccessPayload
}
export type IdentityPassGetWidgetSuccess = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_GET_SUCCESS
    payload: IdentityPassGetWidgetSuccessPayload
}

// failure
export type IdentityPassGetAllConfigFailure = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CONFIG_FAILURE
    payload: IdentityPassGetAllConfigFailurePayload
}
export type IdentityPassCreateWidgetFailure = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_CREATE_FAILURE
    payload: IdentityPassCreateWidgetFailurePayload
}
export type IdentityPassUpdateWidgetFailure = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_UPDATE_FAILURE
    payload: IdentityPassUpdateWidgetFailurePayload
}
export type IdentityPassDeleteWidgetFailure = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_DELETE_FAILURE
    payload: IdentityPassDeleteWidgetFailurePayload
}
export type IdentityPassEndpointsFailure = {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE
    payload: IdentityPassEndpointsFailurePayload
}
export type IdentityPassGetWidgetFailure = {
    type: typeof actionTypes.IDENTITYPASS_WIDGET_GET_FAILURE
    payload: IdentityPassGetWidgetFailurePayload
}

// actions
export type IdentityPassGetAllConfigActions =
    | IdentityPassGetAllConfigRequest
    | IdentityPassGetAllConfigSuccess
    | IdentityPassGetAllConfigFailure

export type IdentityPassCreateWidgetActions =
    | identityPassCreateWidgetRequest
    | IdentityPassCreateWidgetSuccess
    | IdentityPassCreateWidgetFailure

export type IdentityPassUpdateWidgetActions =
    | identityPassUpdateWidgetRequest
    | IdentityPassUpdateWidgetSuccess
    | IdentityPassUpdateWidgetFailure

export type IdentityPassDeleteWidgetActions =
    | identityPassDeleteWidgetRequest
    | IdentityPassDeleteWidgetSuccess
    | IdentityPassDeleteWidgetFailure

export type IdentityPassEndpointsActions =
    | IdentityPassEndpointsRequest
    | IdentityPassEndpointsSuccess
    | IdentityPassEndpointsFailure

export type IdentityPassGetWidgetActions =
    | identityPassGetWidgetRequest
    | IdentityPassGetWidgetSuccess
    | IdentityPassGetWidgetFailure
