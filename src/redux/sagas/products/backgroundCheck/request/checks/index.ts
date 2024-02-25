import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../../../../../constants/actionTypes'
import global from '../../../../../constants/global'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../../../../constants/api'
import { backgroundCheckRequestGetCandidateFormFailure, backgroundCheckRequestGetCandidateFormSuccess, backgroundCheckRequestAnswerUploadFailure, backgroundCheckRequestAnswerUploadSuccess, backgroundCheckRequestReportOverviewSuccess, backgroundCheckRequestReportOverviewFailure, backgroundCheckRequestReportChecklistSuccess, backgroundCheckRequestReportChecklistFailure, backgroundCheckRequestReportDetailSuccess, backgroundCheckRequestReportDetailFailure, backgroundCheckRequestReportSetStatusSuccess, backgroundCheckRequestReportSetStatusFailure, backgroundCheckRequestGetPriceSuccess, backgroundCheckRequestGetPriceFailure, backgroundCheckRequestMakePaymentSuccess, backgroundCheckRequestMakePaymentFailure, backgroundCheckRequestValidateCandidateFormSuccess, backgroundCheckRequestValidateCandidateFormFailure, backgroundCheckRequestCreateCandidateFormSuccess, backgroundCheckRequestCreateCandidateFormFailure} from '../../../../../actions/products/backgroundCheck/request/checks'
import { IBackgroundCheckRequestGetCandidateForm, IBackgroundCheckRequestAnswerUpload, IBackgroundCheckRequestReportOverview, IBackgroundCheckRequestReportDetail, IBackgroundCheckRequestReportChecklist, IBackgroundCheckRequestReportSetStatus, IBackgroundCheckRequestGetPrice, IBackgroundCheckRequestMakePayment, IBackgroundCheckRequestValidateCandidateForm, IBackgroundCheckRequestCreateCandidateForm } from '../../../../../actions/products/backgroundCheck/request/checks/types'



let accessT = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''

// axios declarations
const backgroundCheckRequestGetCandidateForm = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestGetCandidateForm[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/form/request/${payload.form_id}`,
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
const backgroundCheckRequestValidateCandidateForm = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestValidateCandidateForm[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/package/validate/${payload.package_id}`,
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
const backgroundCheckRequestCreateCandidateForm = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckRequestCreateCandidateForm[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/external/initiates`,
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
const backgroundCheckRequestAnswerUpload = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckRequestAnswerUpload[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/accept_request`,
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
const backgroundCheckRequestReportOverview = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestReportOverview[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/report/${payload?.request_id}/view`,
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
const backgroundCheckRequestReportChecklist= async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestReportChecklist[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/report/${payload?.request_id}/checklist`,
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
const backgroundCheckRequestReportDetail = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckRequestReportDetail[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/report/${payload?.request_id}/full`,
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
const backgroundCheckRequestReportSetStatus = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestReportSetStatus[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request_action/${payload?.request_id}/${payload?.checkStatus}`,
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
const backgroundCheckRequestGetPrice = async (payload: any) => {
    const { data } = await axios.get<IBackgroundCheckRequestGetPrice[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/${payload?.request_id}/price`,
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
const backgroundCheckRequestMakePayment = async (payload: any) => {
    const { data } = await axios.post<IBackgroundCheckRequestMakePayment[]>(
        global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request/${payload?.request_id}/pay`,
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
// const backgroundCheckRequestFilter = async (payload: any) => {
//     const { data } = await axios.get<IBackgroundCheckRequestFilter[]>(
//         global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/request?param=${payload?.name}`,
//         // payload,
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//                 Authorization: accessT,
//                 Organisation: orgId,
//             },
//         }
//     )
//     return data
// }


// sagas -- request values
function* backgroundCheckRequestGetCandidateFormSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestGetCandidateForm, {
            form_id: action.payload.values.form_id,
        })
        yield put(
            backgroundCheckRequestGetCandidateFormSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestGetCandidateFormFailure({
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
                backgroundCheckRequestGetCandidateFormFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestValidateCandidateFormSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestValidateCandidateForm, {
            package_id: action.payload.values.package_id,
        })
        yield put(
            backgroundCheckRequestValidateCandidateFormSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestValidateCandidateFormFailure({
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
                backgroundCheckRequestValidateCandidateFormFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestCreateCandidateFormSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestCreateCandidateForm, {
            full_name:  action.payload.values.full_name,
            email:  action.payload.values.email,
            package_id: action.payload.values.package_id,
        })
        yield put(
            backgroundCheckRequestCreateCandidateFormSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestCreateCandidateFormFailure({
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
                backgroundCheckRequestCreateCandidateFormFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestAnswerUploadSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestAnswerUpload, {
            request_id: action.payload.values.request_id,
            ids: action.payload.values.ids,
        })
        yield put(
            backgroundCheckRequestAnswerUploadSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestAnswerUploadFailure({
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
                backgroundCheckRequestAnswerUploadFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestReportOverviewSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestReportOverview, {
            request_id: action.payload.values.request_id,
        })
        yield put(
            backgroundCheckRequestReportOverviewSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestReportOverviewFailure({
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
                backgroundCheckRequestReportOverviewFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestReportChecklistSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestReportChecklist, {
            request_id: action.payload.values.request_id,
        })
        yield put(
            backgroundCheckRequestReportChecklistSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestReportChecklistFailure({
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
                backgroundCheckRequestReportChecklistFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestReportDetailSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestReportDetail, {
            request_id: action.payload.values.request_id,
            ids: action.payload.values.ids,
        })
        yield put(
            backgroundCheckRequestReportDetailSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestReportDetailFailure({
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
                backgroundCheckRequestReportDetailFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestReportSetStatusSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestReportSetStatus, {
            request_id: action.payload.values.request_id,
            checkStatus: action.payload.values.checkStatus
        })
        yield put(
            backgroundCheckRequestReportSetStatusSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestReportSetStatusFailure({
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
                backgroundCheckRequestReportSetStatusFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestGetPriceSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestGetPrice, {
            request_id: action.payload.values.request_id,
        })
        yield put(
            backgroundCheckRequestGetPriceSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestGetPriceFailure({
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
                backgroundCheckRequestGetPriceFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* backgroundCheckRequestMakePaymentSaga(action: any) {
    try {
        const response: { data: any } = yield call(backgroundCheckRequestMakePayment, {
            request_id: action.payload.values.request_id,
            currency: action.payload.values.currency,
            amount: action.payload.values.amount,
        })
        yield put(
            backgroundCheckRequestMakePaymentSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                backgroundCheckRequestMakePaymentFailure({
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
                backgroundCheckRequestMakePaymentFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
// function* backgroundCheckRequestFilterSaga(action: any) {
//     try {
//         const response: { data: any } = yield call(backgroundCheckRequestFilter, {
//             name: action.payload.values.name,
//         })
//         yield put(
//             backgroundCheckRequestFilterSuccess({
//                 resp: response,
//             })
//         )
//         action.payload.callback(response)
//     } catch (e: any) {
//         if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
//             yield put(
//                 backgroundCheckRequestFilterFailure({
//                     error: "An error occurred, hang on a minute as we work towards fixing this error.",
//                 })
//             )
//             action.payload.callback({
//                 detail: "An error occurred, hang on a minute as we work towards fixing this error.",
//             })
//             return
//         }
//         if (e.response.request.status === 401) {
//             authorizationRedirect()
//         } else {
//             yield put(
//                 backgroundCheckRequestFilterFailure({
//                     error: e.response.data.detail,
//                 })
//             )
//             action.payload.callback(e.response.data)
//         }
//     }
// }

// triggers
export function* backgroundCheckRequestGetCandidateFormSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_REQUEST, backgroundCheckRequestGetCandidateFormSaga),
    ])
}
export function* backgroundCheckRequestValidateCandidateFormSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST, backgroundCheckRequestValidateCandidateFormSaga),
    ])
}
export function* backgroundCheckRequestCreateCandidateFormSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST, backgroundCheckRequestCreateCandidateFormSaga),
    ])
}
export function* backgroundCheckRequestAnswerUploadSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST, backgroundCheckRequestAnswerUploadSaga),
    ])
}
export function* backgroundCheckRequestReportOverviewSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST, backgroundCheckRequestReportOverviewSaga),
    ])
}
export function* backgroundCheckRequestReportChecklistSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST, backgroundCheckRequestReportChecklistSaga),
    ])
}
export function* backgroundCheckRequestReportDetailSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST, backgroundCheckRequestReportDetailSaga),
    ])
}
export function* backgroundCheckRequestReportSetStatusSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST, backgroundCheckRequestReportSetStatusSaga),
    ])
}
export function* backgroundCheckRequestGetPriceSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST, backgroundCheckRequestGetPriceSaga),
    ])
}
export function* backgroundCheckRequestMakePaymentSagaTrigger() {
    yield all([
        takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST, backgroundCheckRequestMakePaymentSaga),
    ])
}
// export function* backgroundCheckRequestFilterSagaTrigger() {
//     yield all([
//         takeLatest(actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST, backgroundCheckRequestFilterSaga),
//     ])
// }

