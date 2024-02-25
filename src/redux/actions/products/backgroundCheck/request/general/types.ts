import {actionTypes} from "../../../../../constants/actionTypes";
  
  export interface IBackgroundCheckRequestGetAll{
    resp: any;
  }
  export interface IBackgroundCheckRequestInitiate{
    resp: any;
  }
  export interface IBackgroundCheckRequestConsent{
    resp: any;
  }
  export interface IBackgroundCheckRequestFilter{
    resp: any;
  }
  

  export interface BackgroundCheckRequestGetAllState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestInitiateState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestConsentState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckRequestFilterState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface BackgroundCheckRequestGetAllPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckRequestInitiatePayload {
    values: { 
      base_url: any,
      candidates: any,
      selected_check: any,
    };
    callback: any;
  }
  export interface BackgroundCheckRequestConsentPayload {
    values: { 
      request_id: any,
      organisation: any,
      full_name: any,
      date:any
    };
    callback: any;
  }
  export interface BackgroundCheckRequestFilterPayload {
    values: { };
    callback: any;
  }
  

  export interface BackgroundCheckRequestGetAllSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestInitiateSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestConsentSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckRequestFilterSuccessPayload {
    resp: any;
  }
  

  export interface BackgroundCheckRequestGetAllFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestInitiateFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestConsentFailurePayload {
    error: string;
  }
  export interface BackgroundCheckRequestFilterFailurePayload {
    error: string;
  }
  
  
  export interface BackgroundCheckRequestGetAllRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST;
    payload: BackgroundCheckRequestGetAllPayload;
  }
  export interface BackgroundCheckRequestInitiateRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST;
    payload: BackgroundCheckRequestInitiatePayload;
  }
  export interface BackgroundCheckRequestConsentRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST;
    payload: BackgroundCheckRequestConsentPayload;
  }
  export interface BackgroundCheckRequestFilterRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST;
    payload: BackgroundCheckRequestFilterPayload;
  }
  

  export type BackgroundCheckRequestGetAllSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS,
    payload: BackgroundCheckRequestGetAllSuccessPayload,
  };
  export type BackgroundCheckRequestInitiateSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_SUCCESS,
    payload: BackgroundCheckRequestInitiateSuccessPayload,
  };
  export type BackgroundCheckRequestConsentSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_SUCCESS,
    payload: BackgroundCheckRequestConsentSuccessPayload,
  };
  export type BackgroundCheckRequestFilterSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS,
    payload: BackgroundCheckRequestFilterSuccessPayload,
  };
  

  export type BackgroundCheckRequestGetAllFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE,
    payload: BackgroundCheckRequestGetAllFailurePayload,
  };
  export type BackgroundCheckRequestInitiateFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_FAILURE,
    payload: BackgroundCheckRequestInitiateFailurePayload,
  };
  export type BackgroundCheckRequestConsentFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_FAILURE,
    payload: BackgroundCheckRequestConsentFailurePayload,
  };
  export type BackgroundCheckRequestFilterFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE, 
    payload: BackgroundCheckRequestFilterFailurePayload,
  };
  
  
  export type BackgroundCheckRequestGetAllActions =
  | BackgroundCheckRequestGetAllRequest
  | BackgroundCheckRequestGetAllSuccess
  | BackgroundCheckRequestGetAllFailure;

  export type BackgroundCheckRequestInitiateActions =
  | BackgroundCheckRequestInitiateRequest
  | BackgroundCheckRequestInitiateSuccess
  | BackgroundCheckRequestInitiateFailure;

  export type BackgroundCheckRequestConsentActions =
  | BackgroundCheckRequestConsentRequest
  | BackgroundCheckRequestConsentSuccess
  | BackgroundCheckRequestConsentFailure;

  export type BackgroundCheckRequestFilterActions =
  | BackgroundCheckRequestFilterRequest
  | BackgroundCheckRequestFilterSuccess
  | BackgroundCheckRequestFilterFailure;
