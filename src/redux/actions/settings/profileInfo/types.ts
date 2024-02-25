import {actionTypes} from "../../../constants/actionTypes";
  
  export interface IUpdateUserPassword {
    resp: any;
  }
  export interface IUpdateProfileInfo {
    resp: any;
  }
  
  export interface UpdateUserPasswordState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface UpdateProfileInfoState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface UpdateUserPasswordPayload {
    values: { 
      previous_password: string, new_password: string, 
    }
    callback: any;
  }export interface UpdateProfileInfoPayload {
    values: { 
      first_name: string, last_name: string, image: any, phone: string, 
    };
    callback: any;
  }
  
  export interface UpdateUserPasswordSuccessPayload {
    resp: any;
  }
  export interface UpdateProfileInfoSuccessPayload {
    resp: any;
  }
  
  export interface UpdateUserPasswordFailurePayload {
    error: string;
  }
  export interface UpdateProfileInfoFailurePayload {
    error: string;
  }
  
  
  export interface UpdateUserPasswordRequest {
    type: typeof actionTypes.UPDATE_USER_PASSWORD_REQUEST;
    payload: UpdateUserPasswordPayload;
  }
  export interface UpdateProfileInfoRequest {
    type: typeof actionTypes.UPDATE_PROFILE_INFO_REQUEST;
    payload: UpdateProfileInfoPayload;
  }
  
  export type UpdateUserPasswordSuccess = {
    type: typeof actionTypes.UPDATE_USER_PASSWORD_SUCCESS,
    payload: UpdateUserPasswordSuccessPayload,
  };
  export type UpdateProfileInfoSuccess = {
    type: typeof actionTypes.UPDATE_PROFILE_INFO_SUCCESS,
    payload: UpdateProfileInfoSuccessPayload,
  };
  
  export type UpdateUserPasswordFailure = {
    type: typeof actionTypes.UPDATE_USER_PASSWORD_FAILURE,
    payload: UpdateUserPasswordFailurePayload,
  };
  export type UpdateProfileInfoFailure = {
    type: typeof actionTypes.UPDATE_PROFILE_INFO_FAILURE,
    payload: UpdateProfileInfoFailurePayload,
  };
  
  
  export type UpdateUserPasswordActions =
    | UpdateUserPasswordRequest
    | UpdateUserPasswordSuccess
    | UpdateUserPasswordFailure;

  export type UpdateProfileInfoActions =
  | UpdateProfileInfoRequest
  | UpdateProfileInfoSuccess
  | UpdateProfileInfoFailure;