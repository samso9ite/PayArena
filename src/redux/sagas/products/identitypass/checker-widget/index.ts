import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../../../../constants/actionTypes'
import global from '../../../../constants/global'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../../../constants/api'
import {
    IIdentityPassEndpoints,
    IIdentityPassGetAllConfig,
    IIdentityPassCreateWidget,
    IIdentityPassUpdateWidget,
    IIdentityPassDeleteWidget,
    IIdentityPassGetWidget,
} from '../../../../actions/products/identitypass/checker-widget/types'
import {
    identityPassGetAllConfigSuccess,
    identityPassGetAllConfigFailure,
    identityPassCreateWidgetSuccess,
    identityPassCreateWidgetFailure,
    identityPassUpdateWidgetSuccess,
    identityPassUpdateWidgetFailure,
    identityPassDeleteWidgetSuccess,
    identityPassDeleteWidgetFailure,
    identitypassEndpointsFailure,
    identitypassEndpointsSuccess,
    identityPassGetWidgetSuccess,
    identityPassGetWidgetFailure,
} from '../../../../actions/products/identitypass/checker-widget'

let accessT = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''

// axios declarations
const identityPassGetAllConfig = async (payload: any) => {
    const { data } = await axios.get<IIdentityPassGetAllConfig[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/checker/config/get',
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}
const identityPassCreateWidget = async (payload: any) => {
    const { data } = await axios.post<IIdentityPassCreateWidget[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/checker/config/create',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}
const identityPassUpdateWidget = async (payload: any) => {
    const { data } = await axios.post<IIdentityPassUpdateWidget[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/checker/config/update',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}
const identityPassDeleteWidget = async (payload: any) => {
    const { data } = await axios.post<IIdentityPassDeleteWidget[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/checker/config/delete',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}
const identityPassEndpoints = async (payload: any) => {
    const { data } = await axios.get<IIdentityPassEndpoints[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/core/endpoints/get',
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}
const identityPassGetWidget = async (payload: any) => {
    const { data } = await axios.post<IIdentityPassGetWidget[]>(
        global.apiBaseUrl + global.idpassApiUrl + 'internal/checker/config/single/get',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
    )
    return data
}

// sagas -- request values
function* identityPassGetAllConfigSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassGetAllConfig, {})
        yield put(
            identityPassGetAllConfigSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identityPassGetAllConfigFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identityPassGetAllConfigFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* identityPassCreateWidgetSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassCreateWidget, {
            name: action.payload.values.name,
            // has_financial: action.payload.values.has_financial,
            // has_radar: action.payload.values.has_radar,
            // has_verification: action.payload.values.has_verification,
            has_financial: 0,
            has_radar: 0,
            has_verification: 0,
        })
        yield put(
            identityPassCreateWidgetSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identityPassCreateWidgetFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identityPassCreateWidgetFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* identityPassUpdateWidgetSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassUpdateWidget, {
            config_id: action.payload.values.config_id,
            name: action.payload.values.name,
            subtitle: action.payload.values.subtitle,
            countries: action.payload.values.countries,
            endpoints: action.payload.values.endpoints,
            face_confidence: action.payload.values.face_confidence,
            is_active: 1,
            theme_color: action.payload.values.theme_color,
        })
        yield put(
            identityPassUpdateWidgetSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identityPassUpdateWidgetFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identityPassUpdateWidgetFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* identityPassDeleteWidgetSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassDeleteWidget, {
            config_id: action.payload.values.id,
        })
        yield put(
            identityPassDeleteWidgetSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identityPassDeleteWidgetFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identityPassDeleteWidgetFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* identityPassEndpointsSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassEndpoints, {})
        // yield put({
        //     type: identitypassEndpointsSuccess({
        //         resp: response,
        //     }),
        //     endpoints: response,
        // })
        yield put(
            identitypassEndpointsSuccess({
                resp: response,
            }),
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identitypassEndpointsFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identitypassEndpointsFailure({
                    error: e?.response?.data?.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* identityPassGetWidgetSaga(action: any) {
    try {
        const response: { data: any } = yield call(identityPassGetWidget, {
            config_id: action.payload.values.id,
        })
        yield put(
            identityPassGetWidgetSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                identityPassGetWidgetFailure({
                    error: "An error occurred, it's not you, it's us. We are currently fixing it.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, it's not you, it's us. We are currently fixing it.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                identityPassGetWidgetFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

// triggers
export function* identityPassGetAllConfigSagaTrigger() {
    yield all([
        takeLatest(actionTypes.IDENTITYPASS_WIDGET_CONFIG_REQUEST, identityPassGetAllConfigSaga),
    ])
}
export function* identityPassCreateWidgetSagaTrigger() {
    yield all([
        takeLatest(actionTypes.IDENTITYPASS_WIDGET_CREATE_REQUEST, identityPassCreateWidgetSaga),
    ])
}
export function* identityPassUpdateWidgetSagaTrigger() {
    yield all([
        takeLatest(actionTypes.IDENTITYPASS_WIDGET_UPDATE_REQUEST, identityPassUpdateWidgetSaga),
    ])
}
export function* identityPassDeleteWidgetSagaTrigger() {
    yield all([
        takeLatest(actionTypes.IDENTITYPASS_WIDGET_DELETE_REQUEST, identityPassDeleteWidgetSaga),
    ])
}
export function* identityPassEndpointsSagaTrigger() {
    yield all([takeLatest(actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST, identityPassEndpointsSaga)])
}
export function* identityPassGetWidgetSagaTrigger() {
    yield all([takeLatest(actionTypes.IDENTITYPASS_WIDGET_GET_REQUEST, identityPassGetWidgetSaga)])
}
