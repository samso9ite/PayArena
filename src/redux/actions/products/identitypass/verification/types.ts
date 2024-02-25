import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IIdentitypassVerification {
    resp: any;
  }
  export interface IIdentitypassEndpoints{
    resp: any;
  }
  export interface IIdentitypassBulkVerification {
    resp: any;
  }
  export interface IIdentitypassBulkHistory {
    resp: any;
  }
  

  export interface IdentitypassVerificationState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface IdentitypassEndpointsState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface IdentitypassBulkVerificationState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface IdentitypassBulkHistoryState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface IdentitypassVerificationPayload {
    values: { 
      mode: any,
      data: any,
      file: any,
      pin: any,
      email: any,
      endpoint: any
    };
    callback: any;
  }
  export interface IdentitypassEndpointsPayload {
    values: { };
    callback: any;
  }
  export interface IdentitypassBulkVerificationPayload {
    values: { 
      product: any,
      type: any,
      file: any,
      app_id:any
    };
    callback: any;
  }
  export interface IdentitypassBulkHistoryPayload {
    values: { };
    callback: any;
  }
  

  export interface IdentitypassVerificationSuccessPayload {
    resp: any;
  }
  export interface IdentitypassEndpointsSuccessPayload {
    resp: any;
  }
  export interface IdentitypassBulkVerificationSuccessPayload {
    resp: any;
  }
  export interface IdentitypassBulkHistorySuccessPayload {
    resp: any;
  }
  

  export interface IdentitypassVerificationFailurePayload {
    error: string;
  }
  export interface IdentitypassEndpointsFailurePayload {
    error: string;
  }
  export interface IdentitypassBulkVerificationFailurePayload {
    error: string;
  }
  export interface IdentitypassBulkHistoryFailurePayload {
    error: string;
  }
  
  
  export interface IdentitypassVerificationRequest {
    type: typeof actionTypes.IDENTITYPASS_VERIFICATION_REQUEST;
    payload: IdentitypassVerificationPayload;
  }
  export interface IdentitypassEndpointsRequest {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST;
    payload: IdentitypassEndpointsPayload;
  }
  export interface IdentitypassBulkVerificationRequest {
    type: typeof actionTypes.IDENTITYPASS_BULK_VERIFICATION_REQUEST;
    payload: IdentitypassBulkVerificationPayload;
  }
  export interface IdentitypassBulkHistoryRequest {
    type: typeof actionTypes.IDENTITYPASS_BULK_HISTORY_REQUEST;
    payload: IdentitypassBulkHistoryPayload;
  }
  

  export type IdentitypassVerificationSuccess = {
    type: typeof actionTypes.IDENTITYPASS_VERIFICATION_SUCCESS,
    payload: IdentitypassVerificationSuccessPayload,
  };
  export type IdentitypassEndpointsSuccess = {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS,
    payload: IdentitypassEndpointsSuccessPayload,
  };
  export type IdentitypassBulkVerificationSuccess = {
    type: typeof actionTypes.IDENTITYPASS_BULK_VERIFICATION_SUCCESS,
    payload: IdentitypassBulkVerificationSuccessPayload,
  };
  export type IdentitypassBulkHistorySuccess = {
    type: typeof actionTypes.IDENTITYPASS_BULK_HISTORY_SUCCESS,
    payload: IdentitypassBulkHistorySuccessPayload,
  };
  

  export type IdentitypassVerificationFailure = {
    type: typeof actionTypes.IDENTITYPASS_VERIFICATION_FAILURE,
    payload: IdentitypassVerificationFailurePayload,
  };
  export type IdentitypassEndpointsFailure = {
    type: typeof actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE,
    payload: IdentitypassEndpointsFailurePayload,
  };
  export type IdentitypassBulkVerificationFailure = {
    type: typeof actionTypes.IDENTITYPASS_BULK_VERIFICATION_FAILURE,
    payload: IdentitypassBulkVerificationFailurePayload,
  };
  export type IdentitypassBulkHistoryFailure = {
    type: typeof actionTypes.IDENTITYPASS_BULK_HISTORY_FAILURE,
    payload: IdentitypassBulkHistoryFailurePayload,
  };
  
  
  export type IdentitypassVerificationActions =
  | IdentitypassVerificationRequest
  | IdentitypassVerificationSuccess
  | IdentitypassVerificationFailure;

  export type IdentitypassEndpointsActions =
  | IdentitypassEndpointsRequest
  | IdentitypassEndpointsSuccess
  | IdentitypassEndpointsFailure;

  export type IdentitypassBulkVerificationActions =
  | IdentitypassBulkVerificationRequest
  | IdentitypassBulkVerificationSuccess
  | IdentitypassBulkVerificationFailure;

  export type IdentitypassBulkHistoryActions =
  | IdentitypassBulkHistoryRequest
  | IdentitypassBulkHistorySuccess
  | IdentitypassBulkHistoryFailure;
