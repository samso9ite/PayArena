import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { actionTypes } from '../../constants/actionTypes'
import global from '../../constants/global'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../constants/api'
import {
    IAPIFilterReport,
    IAPIGenerateReportLogs,
    IAPIReport,
    IAPIReportActivities,
    IAPIReportProducts,
    IAPISearchReport,
    ICustomerReport,
} from '../../actions/reports/types'
import {
    apiFilterReportFailure,
    apiFilterReportSuccess,
    apiGenerateReportLogsFailure,
    apiGenerateReportLogsSuccess,
    apiReportActivitiesFailure,
    apiReportActivitiesSuccess,
    apiReportFailure,
    apiReportProductsFailure,
    apiReportProductsSuccess,
    apiReportSuccess,
    apiSearchReportFailure,
    apiSearchReportSuccess,
    customerReportActivitiesFailure,
    customerReportActivitiesSuccess,
} from '../../actions/reports'

let accessT = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''
let tenantId = Cookies.get("tenant") || ""

const apiReport = async (payload: any) => {
    const { data } = await axios.get<IAPIReport[]>(
        global.apiBaseUrl + global.idpassApiUrl +
            `verification/log/internal/recent-trans/${payload.product}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data
}
const apiSearchReport = async (payload: any) => {
    const { data } = await axios.post<IAPISearchReport[]>(
        // global.apiBaseUrl + global.liveUrl + `api/v1/report/log/internal/recent-trans/${payload.product}`,

        // `https://o5rvlgg4dk.execute-api.us-east-2.amazonaws.com/dev/prembly-backend-dev/api/v1/report/log/search`,

        global.apiBaseUrl + `api/v1/report/log/search`,
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            }, 
        }
    )
    return data
}
const apiFilterReport = async (payload: any) => {
    const { data } = await axios.get<IAPIFilterReport[]>(
      
        global.apiBaseUrl + `api/v1/report/log/search?status${payload?.status &&('='+payload?.status)}&product${payload?.product &&('='+payload?.product)}&start_date${payload?.start_date &&('='+payload?.start_date)}&end_date${payload?.end_date &&('='+payload?.end_date)}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data
}
const apiReportProducts = async (payload: any) => {
    const { data } = await axios.get<IAPIReportProducts[]>(
        global.apiBaseUrl + `api/v1/billing/product`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data 
}
const apiReportActivities = async (payload: any) => {
    const { data } = await axios.get<IAPIReportActivities[]>(
        global.apiBaseUrl + global.idpassApiUrl +
            `verification/log/internal/activity-report/${payload.product}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data
}
const apiGenerateReportLogs = async (payload: any) => {
    const { data } = await axios.post<IAPIGenerateReportLogs[]>(
        // payload.product === "3f20cd19-e739-419c-bec7-dd2c5c8a441b" ?
        // global.apiBaseUrl + global.idpassApiUrl +`verification/download/apilogs` 
        // :
        global.apiBaseUrl + global.idpassApiUrl + `verification/api/logs/3f20cd19-e739-419c-bec7-dd2c5c8a441b`,
        payload.product === "3f20cd19-e739-419c-bec7-dd2c5c8a441b" ? 
            payload = {
                "end_date": payload.end_date,
                "start_date": payload.start_date,
                // "response_code": payload.response_code,
                // "platform": "PREMBLY"
            } :
            payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data
}
const customerReportActivities = async (payload: any) => {
    const { data } = await axios.get<ICustomerReport[]>(
        global.apiBaseUrl + `api/v1/report/log/internal/customer_report`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
                TenantId: tenantId
            },
        }
    )
    return data
}



function* apiReportSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiReport, {
            product: action.payload.values.product,
        })

        yield put(
            apiReportSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiReportFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiReportFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* apiSearchReportSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiSearchReport, {
            param: action.payload.values.param,
            product: action.payload.values.product
        })

        yield put(
            apiSearchReportSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiSearchReportFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiSearchReportFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* apiFilterReportSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiFilterReport, {
            product: action.payload.values.product,
            start_date: action.payload.values.start_date,
            end_date: action.payload.values.end_date,
            status: action.payload.values.status,
        })

        yield put(
            apiFilterReportSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiFilterReportFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiFilterReportFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* apiReportProductsSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiReportProducts, {})

        yield put(
            apiReportProductsSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiReportProductsFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiReportProductsFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* apiReportActivitiesSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiReportActivities, {
            product: action.payload.values.product,
        })

        yield put(
            apiReportActivitiesSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiReportActivitiesFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiReportActivitiesFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* apiGenerateReportLogsSaga(action: any) {
    try {
        const response: { data: any } = yield call(apiGenerateReportLogs, {
            start_date: action.payload.values.start_date,
            end_date: action.payload.values.end_date,
            filter_type: action.payload.values.filter_type,
            response_code: action.payload.values.response_code,
            product: action.payload.values.product
               
        })

        yield put(
            apiGenerateReportLogsSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                apiGenerateReportLogsFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                apiGenerateReportLogsFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}
function* customerReportActivitiesSaga(action: any) {
    try {
        const response: { data: any } = yield call(customerReportActivities, {})

        yield put(
            customerReportActivitiesSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                customerReportActivitiesFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                customerReportActivitiesFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}



export function* apiReportSagaTrigger() {
    yield all([takeLatest(actionTypes.API_REPORT_REQUEST, apiReportSaga)])
}
export function* apiSearchReportSagaTrigger() {
    yield all([takeLatest(actionTypes.API_SEARCH_REPORT_REQUEST, apiSearchReportSaga)])
}
export function* apiFilterReportSagaTrigger() {
    yield all([takeLatest(actionTypes.API_FILTER_REPORT_REQUEST, apiFilterReportSaga)])
}
export function* apiReportProductsSagaTrigger() {
    yield all([takeLatest(actionTypes.API_REPORT_PRODUCTS_REQUEST, apiReportProductsSaga)])
}
export function* apiReportActivitiesSagaTrigger() {
    yield all([takeLatest(actionTypes.API_REPORT_ACTIVITIES_REQUEST, apiReportActivitiesSaga)])
}
export function* apiGenerateReportLogsSagaTrigger() {
    yield all([takeLatest(actionTypes.API_GENERATE_REPORT_LOG_REQUEST, apiGenerateReportLogsSaga)])
}
export function* customerReportActivitiesSagaTrigger() {
    yield all([takeLatest(actionTypes.CUSTOMER_REPORT_REQUEST, customerReportActivitiesSaga)])
}

