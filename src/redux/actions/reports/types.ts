import { actionTypes } from "../../constants/actionTypes";


export interface IAPIReport {
  resp: any;
}
export interface IAPISearchReport {
  resp: any;
}
export interface IAPIFilterReport {
  resp: any;
}
export interface IAPIReportProducts {
  resp: any;
}
export interface IAPIReportActivities {
  resp: any;
}
export interface IAPIGenerateReportLogs {
  resp: any;
}
export interface ICustomerReport {
  resp: any;
}


export interface APIReportState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface APISearchReportState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface APIFilterReportState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface APIReportProductsState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface APIReportActivitiesState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface APIGenerateReportLogsState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface CustomerReportState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}



export interface APIReportPayload {
  callback: any;
}
export interface APISearchReportPayload {
  values: { 
    param:string,
    product:string
  }
  callback: any;
}
export interface APIFilterReportPayload {
  callback: any;
}
export interface APIReportProductsPayload {
  callback: any;
}
export interface APIReportActivitiesPayload {
  callback: any;
}
export interface APIGenerateReportLogsPayload {
  values: { 
      start_date:string,
      end_date:string,
      filter_type:string,
      response_code:any,
      product:string,
  }
  callback: any;
}
export interface CustomerReportPayload {
  callback: any;
}


export interface APIReportSuccessPayload {
  resp: any;
}
export interface APISearchReportSuccessPayload {
  resp: any;
}
export interface APIFilterReportSuccessPayload {
  resp: any;
}
export interface APIReportProductsSuccessPayload {
  resp: any;
}
export interface APIReportActivitiesSuccessPayload {
  resp: any;
}
export interface APIGenerateReportLogsSuccessPayload {
  resp: any;
}
export interface CustomerReportSuccessPayload {
  resp: any;
}



export interface APIReportFailurePayload {
  error: string;
}
export interface APISearchReportFailurePayload {
  error: string;
}
export interface APIFilterReportFailurePayload {
  error: string;
}
export interface APIReportProductsFailurePayload {
  error: string;
}
export interface APIReportActivitiesFailurePayload {
  error: string;
}
export interface APIGenerateReportLogsFailurePayload {
  error: string;
}
export interface CustomerReportFailurePayload {
  error: string;
}



export interface APIReportRequest {
  type: typeof actionTypes.API_REPORT_REQUEST;
  payload: APIReportPayload;
}
export interface APISearchReportRequest {
  type: typeof actionTypes.API_SEARCH_REPORT_REQUEST;
  payload: APISearchReportPayload;
}
export interface APIFilterReportRequest {
  type: typeof actionTypes.API_FILTER_REPORT_REQUEST;
  payload: APIFilterReportPayload;
}
export interface APIReportProductsRequest {
  type: typeof actionTypes.API_REPORT_PRODUCTS_REQUEST;
  payload: APIReportProductsPayload;
}
export interface APIReportActivitiesRequest {
  type: typeof actionTypes.API_REPORT_ACTIVITIES_REQUEST;
  payload: APIReportActivitiesPayload;
}
export interface APIGenerateReportLogsRequest {
  type: typeof actionTypes.API_GENERATE_REPORT_LOG_REQUEST;
  payload: APIGenerateReportLogsPayload;
}
export interface CustomerReportRequest {
  type: typeof actionTypes.CUSTOMER_REPORT_REQUEST
  payload: CustomerReportPayload
}



export type APIReportSuccess = {
  type: typeof actionTypes.API_REPORT_SUCCESS,
  payload: APIReportSuccessPayload,
};
export type APISearchReportSuccess = {
  type: typeof actionTypes.API_SEARCH_REPORT_SUCCESS,
  payload: APISearchReportSuccessPayload,
};
export type APIFilterReportSuccess = {
  type: typeof actionTypes.API_FILTER_REPORT_SUCCESS, 
  payload: APIFilterReportSuccessPayload,
};
export type APIReportProductsSuccess = {
  type: typeof actionTypes.API_REPORT_PRODUCTS_SUCCESS,
  payload: APIReportProductsSuccessPayload,
};
export type APIReportActivitiesSuccess = {
  type: typeof actionTypes.API_REPORT_ACTIVITIES_SUCCESS,
  payload: APIReportActivitiesSuccessPayload,
};
export type APIGenerateReportLogsSuccess = {
  type: typeof actionTypes.API_GENERATE_REPORT_LOG_SUCCESS,
  payload: APIGenerateReportLogsSuccessPayload,
};
export type CustomerReportSuccess = {
  type: typeof actionTypes.CUSTOMER_REPORT_SUCCESS
  payload: CustomerReportSuccessPayload
};


export type APIReportFailure = {
  type: typeof actionTypes.API_REPORT_FAILURE,
  payload: APIReportFailurePayload,
};
export type APISearchReportFailure = {
  type: typeof actionTypes.API_SEARCH_REPORT_FAILURE,
  payload: APISearchReportFailurePayload,
};
export type APIFilterReportFailure = {
  type: typeof actionTypes.API_FILTER_REPORT_FAILURE,
  payload: APIFilterReportFailurePayload,
};
export type APIReportProductsFailure = {
  type: typeof actionTypes.API_REPORT_PRODUCTS_FAILURE,
  payload: APIReportProductsFailurePayload,
};
export type APIReportActivitiesFailure = {
  type: typeof actionTypes.API_REPORT_ACTIVITIES_FAILURE,
  payload: APIReportActivitiesFailurePayload,
};
export type APIGenerateReportLogsFailure = {
  type: typeof actionTypes.API_GENERATE_REPORT_LOG_FAILURE,
  payload: APIGenerateReportLogsFailurePayload,
};
export type CustomerReportFailure = {
  type: typeof actionTypes.CUSTOMER_REPORT_FAILURE
  payload: CustomerReportFailurePayload,
};


export type APIReportActions =
  | APIReportRequest
  | APIReportSuccess
  | APIReportFailure;

export type APISearchReportActions =
  | APISearchReportRequest
  | APISearchReportSuccess
  | APISearchReportFailure;

export type APIFilterReportActions =
  | APIFilterReportRequest
  | APIFilterReportSuccess
  | APIFilterReportFailure;

export type APIReportProductsActions =
  | APIReportProductsRequest
  | APIReportProductsSuccess
  | APIReportProductsFailure;

export type APIReportActivitiesActions =
  | APIReportActivitiesRequest
  | APIReportActivitiesSuccess
  | APIReportActivitiesFailure;

export type APIGenerateReportLogsActions =
  | APIReportActivitiesRequest
  | APIReportActivitiesSuccess
  | APIReportActivitiesFailure;
  
export type CustomerReportActions =
  | CustomerReportRequest
  | CustomerReportSuccess
  | CustomerReportFailure;