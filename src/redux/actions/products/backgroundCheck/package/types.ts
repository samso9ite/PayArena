import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IBackgroundCheckPackageGetAll{
    resp: any;
  }
  export interface IBackgroundCheckPackageGetBaseChecks{
    resp: any;
  }
  export interface IBackgroundCheckPackageGetBaseChecksSubservice{
    resp: any;
  }
  export interface IBackgroundCheckPackageCreate{
    resp: any;
  }
  export interface IBackgroundCheckPackageUpdate{
    resp: any;
  }
  export interface IBackgroundCheckPackageFilter{
    resp: any;
  }
  export interface IBackgroundCheckPackageGetSingle{
    resp: any;
  }
  export interface IBackgroundCheckPackageGetActive{
    resp: any;
  }
  export interface IBackgroundCheckPackageChangeStatus{
    resp: any;
  }
  

  export interface BackgroundCheckPackageGetAllState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageGetBaseChecksState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageGetBaseChecksSubserviceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageCreateState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageUpdateState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageFilterState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageGetSingleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageGetActiveState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface BackgroundCheckPackageChangeStatusState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface BackgroundCheckPackageGetAllPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageGetBaseChecksPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageGetBaseChecksSubservicePayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageCreatePayload {
    values: { 
      name: any,
      country: any,
      purpose: any,
      check_type: any,
      check_type_attributes: any,
      face_capture:any
    };
    callback: any;
  }
  export interface BackgroundCheckPackageUpdatePayload {
    values: { 
      name: any,
      country:any,
      purpose: any,
      check_type: any,
      check_type_attributes: any,
      face_capture:any
    };
    callback: any;
  }
  export interface BackgroundCheckPackageFilterPayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageGetSinglePayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageGetActivePayload {
    values: { };
    callback: any;
  }
  export interface BackgroundCheckPackageChangeStatusPayload {
    values: { };
    callback: any;
  }
  

  export interface BackgroundCheckPackageGetAllSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageGetBaseChecksSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageGetBaseChecksSubserviceSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageCreateSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageUpdateSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageFilterSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageGetSingleSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageGetActiveSuccessPayload {
    resp: any;
  }
  export interface BackgroundCheckPackageChangeStatusSuccessPayload {
    resp: any;
  }
  

  export interface BackgroundCheckPackageGetAllFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageGetBaseChecksFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageGetBaseChecksSubserviceFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageCreateFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageUpdateFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageFilterFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageGetSingleFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageGetActiveFailurePayload {
    error: string;
  }
  export interface BackgroundCheckPackageChangeStatusFailurePayload {
    error: string;
  }
  
  
  export interface BackgroundCheckPackageGetAllRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST;
    payload: BackgroundCheckPackageGetAllPayload;
  }
  export interface BackgroundCheckPackageGetBaseChecksRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST;
    payload: BackgroundCheckPackageGetBaseChecksPayload;
  }
  export interface BackgroundCheckPackageGetBaseChecksSubserviceRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST;
    payload: BackgroundCheckPackageGetBaseChecksSubservicePayload;
  }
  export interface BackgroundCheckPackageCreateRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST;
    payload: BackgroundCheckPackageCreatePayload;
  }
  export interface BackgroundCheckPackageUpdateRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST;
    payload: BackgroundCheckPackageUpdatePayload;
  }
  export interface BackgroundCheckPackageFilterRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST;
    payload: BackgroundCheckPackageFilterPayload;
  }
  export interface BackgroundCheckPackageGetSingleRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST;
    payload: BackgroundCheckPackageGetSinglePayload;
  }
  export interface BackgroundCheckPackageGetActiveRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST;
    payload: BackgroundCheckPackageGetActivePayload;
  }
  export interface BackgroundCheckPackageChangeStatusRequest {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST;
    payload: BackgroundCheckPackageChangeStatusPayload;
  }
  

  export type BackgroundCheckPackageGetAllSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_SUCCESS,
    payload: BackgroundCheckPackageGetAllSuccessPayload,
  };
  export type BackgroundCheckPackageGetBaseChecksSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUCCESS,
    payload: BackgroundCheckPackageGetBaseChecksSuccessPayload,
  };
  export type BackgroundCheckPackageGetBaseChecksSubserviceSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_SUCCESS,
    payload: BackgroundCheckPackageGetBaseChecksSubserviceSuccessPayload,
  };
  export type BackgroundCheckPackageCreateSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_SUCCESS,
    payload: BackgroundCheckPackageCreateSuccessPayload,
  };
  export type BackgroundCheckPackageUpdateSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_SUCCESS,
    payload: BackgroundCheckPackageUpdateSuccessPayload,
  };
  export type BackgroundCheckPackageFilterSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_SUCCESS,
    payload: BackgroundCheckPackageFilterSuccessPayload,
  };
  export type BackgroundCheckPackageGetSingleSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_SUCCESS,
    payload: BackgroundCheckPackageGetSingleSuccessPayload,
  };
  export type BackgroundCheckPackageGetActiveSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_SUCCESS,
    payload: BackgroundCheckPackageGetActiveSuccessPayload,
  };
  export type BackgroundCheckPackageChangeStatusSuccess = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_SUCCESS,
    payload: BackgroundCheckPackageChangeStatusSuccessPayload,
  };
  

  export type BackgroundCheckPackageGetAllFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_FAILURE,
    payload: BackgroundCheckPackageGetAllFailurePayload,
  };
  export type BackgroundCheckPackageGetBaseChecksFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_FAILURE,
    payload: BackgroundCheckPackageGetBaseChecksFailurePayload,
  };
  export type BackgroundCheckPackageGetBaseChecksSubserviceFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_FAILURE,
    payload: BackgroundCheckPackageGetBaseChecksSubserviceFailurePayload,
  };
  export type BackgroundCheckPackageCreateFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_FAILURE,
    payload: BackgroundCheckPackageCreateFailurePayload,
  };
  export type BackgroundCheckPackageUpdateFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_FAILURE,
    payload: BackgroundCheckPackageUpdateFailurePayload,
  };
  export type BackgroundCheckPackageFilterFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_FAILURE,
    payload: BackgroundCheckPackageFilterFailurePayload,
  };
  export type BackgroundCheckPackageGetSingleFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_FAILURE,
    payload: BackgroundCheckPackageGetSingleFailurePayload,
  };
  export type BackgroundCheckPackageGetActiveFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_FAILURE,
    payload: BackgroundCheckPackageGetActiveFailurePayload,
  };
  export type BackgroundCheckPackageChangeStatusFailure = {
    type: typeof actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_FAILURE,
    payload: BackgroundCheckPackageChangeStatusFailurePayload,
  };
  
  
  export type BackgroundCheckPackageGetAllActions =
  | BackgroundCheckPackageGetAllRequest
  | BackgroundCheckPackageGetAllSuccess
  | BackgroundCheckPackageGetAllFailure;

  export type BackgroundCheckPackageGetBaseChecksActions =
  | BackgroundCheckPackageGetBaseChecksRequest
  | BackgroundCheckPackageGetBaseChecksSuccess
  | BackgroundCheckPackageGetBaseChecksFailure;


  export type BackgroundCheckPackageGetBaseChecksSubserviceActions =
  | BackgroundCheckPackageGetBaseChecksSubserviceRequest
  | BackgroundCheckPackageGetBaseChecksSubserviceSuccess
  | BackgroundCheckPackageGetBaseChecksSubserviceFailure;


  export type BackgroundCheckPackageCreateActions =
  | BackgroundCheckPackageCreateRequest
  | BackgroundCheckPackageCreateSuccess
  | BackgroundCheckPackageCreateFailure;

  export type BackgroundCheckPackageUpdateActions =
  | BackgroundCheckPackageUpdateRequest
  | BackgroundCheckPackageUpdateSuccess
  | BackgroundCheckPackageUpdateFailure;

  export type BackgroundCheckPackageFilterActions =
  | BackgroundCheckPackageFilterRequest
  | BackgroundCheckPackageFilterSuccess
  | BackgroundCheckPackageFilterFailure;

  export type BackgroundCheckPackageGetSingleActions =
  | BackgroundCheckPackageGetSingleRequest
  | BackgroundCheckPackageGetSingleSuccess
  | BackgroundCheckPackageGetSingleFailure;

  export type BackgroundCheckPackageGetActiveActions =
  | BackgroundCheckPackageGetActiveRequest
  | BackgroundCheckPackageGetActiveSuccess
  | BackgroundCheckPackageGetActiveFailure;

  export type BackgroundCheckPackageChangeStatusActions =
  | BackgroundCheckPackageChangeStatusRequest
  | BackgroundCheckPackageChangeStatusSuccess
  | BackgroundCheckPackageChangeStatusFailure; 