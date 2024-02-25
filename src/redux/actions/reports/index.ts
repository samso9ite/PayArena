import { actionTypes } from '../../constants/actionTypes' 
import {
    APIReportPayload,
    APIReportRequest,
    APIReportSuccess,
    APIReportSuccessPayload,
    APIReportFailure,
    APISearchReportPayload,
    APISearchReportRequest,
    APISearchReportSuccessPayload,
    APISearchReportSuccess,
    APISearchReportFailurePayload,
    APISearchReportFailure,
    APIFilterReportPayload,
    APIFilterReportRequest,
    APIFilterReportSuccessPayload,
    APIFilterReportSuccess,
    APIFilterReportFailurePayload,
    APIFilterReportFailure,
    APIReportFailurePayload,
    APIReportProductsPayload,
    APIReportProductsRequest,
    APIReportProductsSuccessPayload,
    APIReportProductsSuccess,
    APIReportProductsFailurePayload,
    APIReportProductsFailure,
    APIReportActivitiesPayload,
    APIReportActivitiesRequest,
    APIReportActivitiesSuccessPayload,
    APIReportActivitiesSuccess,
    APIReportActivitiesFailurePayload,
    APIReportActivitiesFailure,
    CustomerReportPayload,
    CustomerReportSuccessPayload,
    CustomerReportFailurePayload,
    CustomerReportRequest,
    CustomerReportSuccess,
    CustomerReportFailure,
    APIGenerateReportLogsRequest,
    APIGenerateReportLogsPayload,
    APIGenerateReportLogsSuccessPayload,
    APIGenerateReportLogsSuccess,
    APIGenerateReportLogsFailurePayload,
    APIGenerateReportLogsFailure,
} from './types'


export const apiReportRequest = (payload: APIReportPayload): APIReportRequest => ({
    type: actionTypes.API_REPORT_REQUEST,
    payload,
})
export const apiReportSuccess = (payload: APIReportSuccessPayload): APIReportSuccess => ({
    type: actionTypes.API_REPORT_SUCCESS,
    payload,
})
export const apiReportFailure = (payload: APIReportFailurePayload): APIReportFailure => ({
    type: actionTypes.API_REPORT_FAILURE,
    payload,
})



export const apiSearchReportRequest = (payload: APISearchReportPayload): APISearchReportRequest => ({
    type: actionTypes.API_SEARCH_REPORT_REQUEST,
    payload,
})
export const apiSearchReportSuccess = (payload: APISearchReportSuccessPayload): APISearchReportSuccess => ({
    type: actionTypes.API_SEARCH_REPORT_SUCCESS,
    payload,
})
export const apiSearchReportFailure = (payload: APISearchReportFailurePayload): APISearchReportFailure => ({
    type: actionTypes.API_SEARCH_REPORT_FAILURE,
    payload,
})



export const apiFilterReportRequest = (payload: APIFilterReportPayload): APIFilterReportRequest => ({
    type: actionTypes.API_FILTER_REPORT_REQUEST,
    payload,
})
export const apiFilterReportSuccess = (payload: APIFilterReportSuccessPayload): APIFilterReportSuccess => ({
    type: actionTypes.API_FILTER_REPORT_SUCCESS,
    payload,
})
export const apiFilterReportFailure = (payload: APIFilterReportFailurePayload): APIFilterReportFailure => ({
    type: actionTypes.API_FILTER_REPORT_FAILURE,
    payload,
})



export const apiReportProductsRequest = (payload: APIReportProductsPayload): APIReportProductsRequest => ({
    type: actionTypes.API_REPORT_PRODUCTS_REQUEST,
    payload,
})
export const apiReportProductsSuccess = (payload: APIReportProductsSuccessPayload): APIReportProductsSuccess => ({
    type: actionTypes.API_REPORT_PRODUCTS_SUCCESS,
    payload,
})
export const apiReportProductsFailure = (payload: APIReportProductsFailurePayload): APIReportProductsFailure => ({
    type: actionTypes.API_REPORT_PRODUCTS_FAILURE,
    payload,
})



export const apiReportActivitiesRequest = (payload: APIReportActivitiesPayload): APIReportActivitiesRequest => ({
    type: actionTypes.API_REPORT_ACTIVITIES_REQUEST,
    payload,
})
export const apiReportActivitiesSuccess = (payload: APIReportActivitiesSuccessPayload): APIReportActivitiesSuccess => ({
    type: actionTypes.API_REPORT_ACTIVITIES_SUCCESS,
    payload,
})
export const apiReportActivitiesFailure = (payload: APIReportActivitiesFailurePayload): APIReportActivitiesFailure => ({
    type: actionTypes.API_REPORT_ACTIVITIES_FAILURE,
    payload,
})


export const apiGenerateReportLogsRequest = (payload: APIGenerateReportLogsPayload): APIGenerateReportLogsRequest => ({
    type: actionTypes.API_GENERATE_REPORT_LOG_REQUEST,
    payload,
})
export const apiGenerateReportLogsSuccess = (payload: APIGenerateReportLogsSuccessPayload): APIGenerateReportLogsSuccess => ({
    type: actionTypes.API_GENERATE_REPORT_LOG_SUCCESS,
    payload,
})
export const apiGenerateReportLogsFailure = (payload: APIGenerateReportLogsFailurePayload): APIGenerateReportLogsFailure => ({
    type: actionTypes.API_GENERATE_REPORT_LOG_FAILURE,
    payload,
})


export const customerReportActivitiesRequest = (payload: CustomerReportPayload): CustomerReportRequest => ({
    type: actionTypes.CUSTOMER_REPORT_REQUEST,
    payload,
})
export const customerReportActivitiesSuccess = (payload: CustomerReportSuccessPayload): CustomerReportSuccess => ({
    type: actionTypes.CUSTOMER_REPORT_SUCCESS,
    payload,
})
export const customerReportActivitiesFailure = (payload: CustomerReportFailurePayload): CustomerReportFailure => ({
    type: actionTypes.CUSTOMER_REPORT_FAILURE,
    payload,
})
