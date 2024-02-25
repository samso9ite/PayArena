import {actionTypes} from "../../../../../constants/actionTypes";
  
  export interface IBackgroundCheckRequestGetCandidateForm{
    resp: any;
  }
  export interface IBackgroundCheckRequestValidateCandidateForm{
    resp: any;
  } 
  export interface IBackgroundCheckRequestCreateCandidateForm{
    resp: any;
  }
  export interface IBackgroundCheckRequestAnswerUpload{
    resp: any;
  }
  export interface IBackgroundCheckRequestReportOverview{
    resp: any;
  }
  export interface IBackgroundCheckRequestReportChecklist{
    resp: any;
  }
  export interface IBackgroundCheckRequestReportDetail{
    resp: any;
  }
  export interface IBackgroundCheckRequestReportSetStatus{
    resp: any;
  }
  export interface IBackgroundCheckRequestGetPrice{
    resp: any;
  }
  export interface IBackgroundCheckRequestMakePayment{
    resp: any;
  }
  

  export interface BackgroundCheckRequestGetCandidateFormState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestValidateCandidateFormState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestCreateCandidateFormState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestAnswerUploadState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestReportOverviewState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestReportChecklistState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestReportDetailState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestReportSetStatusState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestGetPriceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestMakePaymentState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface BackgroundCheckRequestGetCandidateFormPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestValidateCandidateFormPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestCreateCandidateFormPayload {
    values: { 
      full_name: string,
      email: string,
      package_id: any
    };
    callback: any;
  }
  export interface BackgroundCheckRequestAnswerUploadPayload {
    values: { 
      request_id:string,
      ids:any
    };
    callback: any;
  }
  export interface BackgroundCheckRequestReportOverviewPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestReportChecklistPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestReportDetailPayload {
    values: {ids:any };
    callback: any;
  }
  export interface BackgroundCheckRequestReportSetStatusPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestGetPricePayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestMakePaymentPayload {
    values: { currency:any, amount:any };
    callback: any;
  }
  // export interface BackgroundCheckRequestFilterPayload {
  //   values: { };
  //   callback: any;
  // }
  

  export interface BackgroundCheckRequestGetCandidateFormSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestValidateCandidateFormSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestCreateCandidateFormSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestAnswerUploadSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestReportOverviewSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestReportChecklistSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestReportDetailSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestReportSetStatusSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestGetPriceSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestMakePaymentSuccessPayload {
    resp: any;
  }
  // export interface BackgroundCheckRequestFilterSuccessPayload {
  //   resp: any;
  // }
  

  export interface BackgroundCheckRequestGetCandidateFormFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestValidateCandidateFormFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestCreateCandidateFormFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestAnswerUploadFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestReportOverviewFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestReportChecklistFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestReportDetailFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestReportSetStatusFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestGetPriceFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestMakePaymentFailurePayload {
    error: string;
  }
  // export interface BackgroundCheckRequestFilterFailurePayload {
  //   error: string;
  // }
  
  
  export interface BackgroundCheckRequestGetCandidateFormRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST;
    payload: BackgroundCheckRequestGetCandidateFormPayload;
  }
  export interface BackgroundCheckRequestValidateCandidateFormRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST;
    payload: BackgroundCheckRequestValidateCandidateFormPayload;
  }
  export interface BackgroundCheckRequestCreateCandidateFormRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST;
    payload: BackgroundCheckRequestCreateCandidateFormPayload;
  }
  export interface BackgroundCheckRequestAnswerUploadRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST;
    payload: BackgroundCheckRequestAnswerUploadPayload;
  }
  export interface BackgroundCheckRequestReportOverviewRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST;
    payload: BackgroundCheckRequestReportOverviewPayload;
  }
  export interface BackgroundCheckRequestReportChecklistRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST;
    payload: BackgroundCheckRequestReportChecklistPayload;
  }
  export interface BackgroundCheckRequestReportDetailRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST;
    payload: BackgroundCheckRequestReportDetailPayload;
  }
  export interface BackgroundCheckRequestReportSetStatusRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST;
    payload: BackgroundCheckRequestReportSetStatusPayload;
  }
  export interface BackgroundCheckRequestGetPriceRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST;
    payload: BackgroundCheckRequestGetPricePayload;
  }
  export interface BackgroundCheckRequestMakePaymentRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST;
    payload: BackgroundCheckRequestMakePaymentPayload;
  }
  // export interface BackgroundCheckRequestFilterRequest {
  //   type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST;
  //   payload: BackgroundCheckRequestFilterPayload;
  // }
  

  export type BackgroundCheckRequestGetCandidateFormSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS,
    payload: BackgroundCheckRequestGetCandidateFormSuccessPayload,
  };
  export type BackgroundCheckRequestValidateCandidateFormSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_SUCCESS,
    payload: BackgroundCheckRequestValidateCandidateFormSuccessPayload,
  };
  export type BackgroundCheckRequestCreateCandidateFormSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_SUCCESS,
    payload: BackgroundCheckRequestCreateCandidateFormSuccessPayload,
  };
  export type BackgroundCheckRequestAnswerUploadSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_SUCCESS,
    payload: BackgroundCheckRequestAnswerUploadSuccessPayload,
  };
  export type BackgroundCheckRequestReportOverviewSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_SUCCESS,
    payload: BackgroundCheckRequestReportOverviewSuccessPayload,
  };
  export type BackgroundCheckRequestReportChecklistSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_SUCCESS,
    payload: BackgroundCheckRequestReportChecklistSuccessPayload,
  };
  export type BackgroundCheckRequestReportDetailSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_SUCCESS,
    payload: BackgroundCheckRequestReportDetailSuccessPayload,
  };
  export type BackgroundCheckRequestReportSetStatusSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_SUCCESS,
    payload: BackgroundCheckRequestReportSetStatusSuccessPayload,
  };
  export type BackgroundCheckRequestGetPriceSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_SUCCESS,
    payload: BackgroundCheckRequestGetPriceSuccessPayload,
  };
  export type BackgroundCheckRequestMakePaymentSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_SUCCESS,
    payload: BackgroundCheckRequestMakePaymentSuccessPayload,
  };
  // export type BackgroundCheckRequestFilterSuccess = {
  //   type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS,
  //   payload: BackgroundCheckRequestFilterSuccessPayload,
  // };
  

  export type BackgroundCheckRequestGetCandidateFormFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE,
    payload: BackgroundCheckRequestGetCandidateFormFailurePayload,
  };
  export type BackgroundCheckRequestValidateCandidateFormFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_FAILURE,
    payload: BackgroundCheckRequestValidateCandidateFormFailurePayload,
  };
  export type BackgroundCheckRequestCreateCandidateFormFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_FAILURE,
    payload: BackgroundCheckRequestCreateCandidateFormFailurePayload,
  };
  export type BackgroundCheckRequestAnswerUploadFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_FAILURE,
    payload: BackgroundCheckRequestAnswerUploadFailurePayload,
  };
  export type BackgroundCheckRequestReportOverviewFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_FAILURE,
    payload: BackgroundCheckRequestReportOverviewFailurePayload,
  };
  export type BackgroundCheckRequestReportChecklistFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_FAILURE,
    payload: BackgroundCheckRequestReportChecklistFailurePayload,
  };
  export type BackgroundCheckRequestReportDetailFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_FAILURE,
    payload: BackgroundCheckRequestReportDetailFailurePayload,
  };
  export type BackgroundCheckRequestReportSetStatusFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_FAILURE,
    payload: BackgroundCheckRequestReportSetStatusFailurePayload,
  };
  export type BackgroundCheckRequestGetPriceFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_FAILURE,
    payload: BackgroundCheckRequestGetPriceFailurePayload,
  };
  export type BackgroundCheckRequestMakePaymentFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_FAILURE,
    payload: BackgroundCheckRequestMakePaymentFailurePayload,
  };
  // export type BackgroundCheckRequestFilterFailure = {
  //   type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE,
  //   payload: BackgroundCheckRequestFilterFailurePayload,
  // };
  
  
  export type BackgroundCheckRequestGetCandidateFormActions =
  | BackgroundCheckRequestGetCandidateFormRequest
  | BackgroundCheckRequestGetCandidateFormSuccess
  | BackgroundCheckRequestGetCandidateFormFailure;

  export type BackgroundCheckRequestValidateCandidateFormActions =
  | BackgroundCheckRequestValidateCandidateFormRequest
  | BackgroundCheckRequestValidateCandidateFormSuccess
  | BackgroundCheckRequestValidateCandidateFormFailure;

  export type BackgroundCheckRequestCreateCandidateFormActions =
  | BackgroundCheckRequestCreateCandidateFormRequest
  | BackgroundCheckRequestCreateCandidateFormSuccess
  | BackgroundCheckRequestCreateCandidateFormFailure;

  export type BackgroundCheckRequestAnswerUploadActions =
  | BackgroundCheckRequestAnswerUploadRequest
  | BackgroundCheckRequestAnswerUploadSuccess
  | BackgroundCheckRequestAnswerUploadFailure;

  export type BackgroundCheckRequestReportOverviewActions =
  | BackgroundCheckRequestReportOverviewRequest
  | BackgroundCheckRequestReportOverviewSuccess
  | BackgroundCheckRequestReportOverviewFailure;


  export type BackgroundCheckRequestReportChecklistActions =
  | BackgroundCheckRequestReportChecklistRequest
  | BackgroundCheckRequestReportChecklistSuccess
  | BackgroundCheckRequestReportChecklistFailure;


  export type BackgroundCheckRequestReportDetailActions =
  | BackgroundCheckRequestReportDetailRequest
  | BackgroundCheckRequestReportDetailSuccess
  | BackgroundCheckRequestReportDetailFailure;


  export type BackgroundCheckRequestReportSetStatusActions =
  | BackgroundCheckRequestReportSetStatusRequest
  | BackgroundCheckRequestReportSetStatusSuccess
  | BackgroundCheckRequestReportSetStatusFailure;


  export type BackgroundCheckRequestGetPriceActions =
  | BackgroundCheckRequestGetPriceRequest
  | BackgroundCheckRequestGetPriceSuccess
  | BackgroundCheckRequestGetPriceFailure;



  export type BackgroundCheckRequestMakePaymentActions =
  | BackgroundCheckRequestMakePaymentRequest
  | BackgroundCheckRequestMakePaymentSuccess
  | BackgroundCheckRequestMakePaymentFailure;


  // export type BackgroundCheckRequestFilterActions =
  // | BackgroundCheckRequestFilterRequest
  // | BackgroundCheckRequestFilterSuccess
  // | BackgroundCheckRequestFilterFailure;
