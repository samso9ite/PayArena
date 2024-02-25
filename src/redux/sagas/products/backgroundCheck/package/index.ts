import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../../../../constants/actionTypes'
import global from '../../../../constants/global'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../../../constants/api'
import { 
    IBackgroundCheckPackageChangeStatus,
    IBackgroundCheckPackageCreate, IBackgroundCheckPackageFilter, IBackgroundCheckPackageGetActive, 
    IBackgroundCheckPackageGetAll, IBackgroundCheckPackageGetBaseChecks, IBackgroundCheckPackageGetBaseChecksSubservice, IBackgroundCheckPackageGetSingle, IBackgroundCheckPackageUpdate } from '../../../../actions/products/backgroundCheck/package/types'
import { 
    backgroundCheckPackageChangeStatusFailure,
    backgroundCheckPackageChangeStatusSuccess,
    backgroundCheckPackageCreateFailure, backgroundCheckPackageCreateSuccess, backgroundCheckPackageFilterFailure, 
    backgroundCheckPackageFilterSuccess, backgroundCheckPackageGetActiveFailure, backgroundCheckPackageGetActiveSuccess, 
    backgroundCheckPackageGetAllFailure, backgroundCheckPackageGetAllSuccess, backgroundCheckPackageGetBaseChecksFailure, backgroundCheckPackageGetBaseChecksSubserviceFailure, backgroundCheckPackageGetBaseChecksSubserviceSuccess, backgroundCheckPackageGetBaseChecksSuccess, backgroundCheckPackageGetSingleFailure, 
    backgroundCheckPackageGetSingleSuccess, backgroundCheckPackageUpdateFailure, backgroundCheckPackageUpdateSuccess } from '../../../../actions/products/backgroundCheck/package'

let accessT = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''

// axios declarations
const backgroundCheckPackageGetAll = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageGetAll[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + 'background/api/v1/package',
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
const backgroundCheckPackageGetBaseChecks = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageGetBaseChecks[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + 'background/api/v1/check_type',
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
const backgroundCheckPackageGetBaseChecksSubservice = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageGetBaseChecksSubservice[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/verification/${payload?.subservice}`,
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
const backgroundCheckPackageCreate = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckPackageCreate[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + 'background/api/v1/package',
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
const backgroundCheckPackageUpdate = async (payload: any) => {
    const { data } = await axios.put<IBackgroundCheckPackageUpdate[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/package-update/${payload?.package_id}`,
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
const backgroundCheckPackageFilter = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageFilter[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/filter-package?param=${payload?.name}`,
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
const backgroundCheckPackageGetSingle = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageGetSingle[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/package-single/${payload?.package_id}`,
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
const backgroundCheckPackageGetActive = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckPackageGetActive[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + 'background/api/v1/active-package',
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
const backgroundCheckPackageChangeStatus = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckPackageChangeStatus[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/package/${payload?.package_id}/${payload?.package_state}`,
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
function* backgroundCheckPackageGetAllSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageGetAll, {})
        yield put(
            backgroundCheckPackageGetAllSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageGetAllFailure({
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
                backgroundCheckPackageGetAllFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageGetBaseChecksSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageGetBaseChecks, {})
        yield put(
            backgroundCheckPackageGetBaseChecksSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageGetBaseChecksFailure({
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
                backgroundCheckPackageGetBaseChecksFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageGetBaseChecksSubserviceSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageGetBaseChecksSubservice, {
            subservice: action.payload.values.subservice,
        })
        yield put(
            backgroundCheckPackageGetBaseChecksSubserviceSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageGetBaseChecksSubserviceFailure({
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
                backgroundCheckPackageGetBaseChecksSubserviceFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageCreateSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageCreate, {
            name: action.payload.values.name,
            country: action.payload.values.country,
            purpose: action.payload.values.purpose,
            check_type: action.payload.values.check_type,
            check_type_attributes: action.payload.values.check_type_attributes,
            face_capture:action.payload.values.face_capture,
        })
        yield put(
            backgroundCheckPackageCreateSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageCreateFailure({
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
                backgroundCheckPackageCreateFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageUpdateSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageUpdate, {
            name: action.payload.values.name,
            country: action.payload.values.country,
            purpose: action.payload.values.purpose,
            check_type: action.payload.values.check_type,
            check_type_attributes: action.payload.values.check_type_attributes,
            package_id: action.payload.values.package_id,
            face_capture:action.payload.values.face_capture,
        })
        yield put(
            backgroundCheckPackageUpdateSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageUpdateFailure({
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
                backgroundCheckPackageUpdateFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageFilterSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageFilter, {
            name: action.payload.values.name,
        })
        yield put(
            backgroundCheckPackageFilterSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageFilterFailure({
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
                backgroundCheckPackageFilterFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageGetSingleSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageGetSingle, {
            package_id: action.payload.values.package_id,
        })
        yield put(
            backgroundCheckPackageGetSingleSuccess({
                resp: response, 
            }),
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageGetSingleFailure({
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
                backgroundCheckPackageGetSingleFailure({
                    error: e?.response?.data?.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageGetActiveSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageGetActive, {
            config_id: action.payload.values.id,
        })
        yield put(
            backgroundCheckPackageGetActiveSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageGetActiveFailure({
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
                backgroundCheckPackageGetActiveFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckPackageChangeStatusSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckPackageChangeStatus, {
            package_id: action.payload.values.package_id,
            package_state: action.payload.values.package_state,
        })
        yield put(
            backgroundCheckPackageChangeStatusSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckPackageChangeStatusFailure({
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
                backgroundCheckPackageChangeStatusFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

// triggers
export function* backgroundCheckPackageGetAllSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST, backgroundCheckPackageGetAllSaga),
    ])
}
export function* backgroundCheckPackageGetBaseChecksSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST, backgroundCheckPackageGetBaseChecksSaga),
    ])
}
export function* backgroundCheckPackageGetBaseChecksSubserviceSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST, backgroundCheckPackageGetBaseChecksSubserviceSaga),
    ])
}
export function* backgroundCheckPackageCreateSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST, backgroundCheckPackageCreateSaga),
    ])
}
export function* backgroundCheckPackageUpdateSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST, backgroundCheckPackageUpdateSaga),
    ])
}
export function* backgroundCheckPackageFilterSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST, backgroundCheckPackageFilterSaga),
    ])
}
export function* backgroundCheckPackageGetSingleSagaTrigger() {
    yield all([takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST, backgroundCheckPackageGetSingleSaga)])
}
export function* backgroundCheckPackageGetActiveSagaTrigger() {
    yield all([takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST, backgroundCheckPackageGetActiveSaga)])
}
export function* backgroundCheckPackageChangeStatusSagaTrigger() {
    yield all([takeLatest(actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST, backgroundCheckPackageChangeStatusSaga)])
}
