import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../../../../../constants/actionTypes'
import global from '../../../../../constants/global'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../../../../constants/api'
import { IBackgroundCheckRequestConsent, IBackgroundCheckRequestFilter, IBackgroundCheckRequestGetAll, IBackgroundCheckRequestInitiate } from '../../../../../actions/products/backgroundCheck/request/general/types'
import { backgroundCheckRequestConsentFailure, backgroundCheckRequestConsentSuccess, backgroundCheckRequestFilterFailure, backgroundCheckRequestFilterSuccess, backgroundCheckRequestGetAllFailure, backgroundCheckRequestGetAllSuccess, backgroundCheckRequestInitiateFailure, backgroundCheckRequestInitiateSuccess } from '../../../../../actions/products/backgroundCheck/request/general'



let accessT = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''

// axios declarations
const backgroundCheckRequestGetAll = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestGetAll[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + 'background/api/v1/request',
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
const backgroundCheckRequestInitiate = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckRequestInitiate[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/${payload?.package_id}/initiate`,
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
const backgroundCheckRequestConsent = async (payload: any) => {
    const { data } = await axios.patch<IBackgroundCheckRequestConsent[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/consent`,
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
const backgroundCheckRequestFilter = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestFilter[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request?param=${payload?.name}`,
        // payload,
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
function* backgroundCheckRequestGetAllSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestGetAll, {})
        yield put(
            backgroundCheckRequestGetAllSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestGetAllFailure({
                    error: "An error occurred, hang on a minute as we work towards fixing this error.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, hang on a minute as we work towards fixing this error.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                backgroundCheckRequestGetAllFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestInitiateSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestInitiate, {
            base_url: action.payload.values.base_url,
            candidates: action.payload.values.candidates,
            selected_check: action.payload.values.selected_check,
            package_id: action.payload.values.package_id,
        })
        yield put(
            backgroundCheckRequestInitiateSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestInitiateFailure({
                    error: "An error occurred, hang on a minute as we work towards fixing this error.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, hang on a minute as we work towards fixing this error.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                backgroundCheckRequestInitiateFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestConsentSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestConsent, {
            request_id: action.payload.values.request_id,
            organisation: action.payload.values.organisation,
            full_name: action.payload.values.full_name,
            date: action.payload.values.date
        })
        yield put(
            backgroundCheckRequestConsentSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestConsentFailure({
                    error: "An error occurred, hang on a minute as we work towards fixing this error.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, hang on a minute as we work towards fixing this error.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                backgroundCheckRequestConsentFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestFilterSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestFilter, {
            name: action.payload.values.name,
        })
        yield put(
            backgroundCheckRequestFilterSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestFilterFailure({
                    error: "An error occurred, hang on a minute as we work towards fixing this error.",
                })
            )
            action.payload.callback({
                detail: "An error occurred, hang on a minute as we work towards fixing this error.",
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                backgroundCheckRequestFilterFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

// triggers
export function* backgroundCheckRequestGetAllSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST, backgroundCheckRequestGetAllSaga),
    ])
}
export function* backgroundCheckRequestInitiateSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST, backgroundCheckRequestInitiateSaga),
    ])
}
export function* backgroundCheckRequestConsentSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST, backgroundCheckRequestConsentSaga),
    ])
}
export function* backgroundCheckRequestFilterSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST, backgroundCheckRequestFilterSaga),
    ])
}

