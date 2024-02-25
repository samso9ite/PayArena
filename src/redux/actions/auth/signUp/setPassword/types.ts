import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface ISetPassword {
    resp: any;
  }
  
  export interface SetPasswordState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface SetPasswordPayload {
    values: { email: string, password: string };
    callback: any;
  }
  
  export interface SetPasswordSuccessPayload {
    resp: any;
  }
  
  export interface SetPasswordFailurePayload {
    error: string;
  }
  
  
  export interface SetPasswordRequest {
    type: typeof actionTypes.SET_PASSWORD_REQUEST;
    payload: SetPasswordPayload;
  }
  
  export type SetPasswordSuccess = {
    type: typeof actionTypes.SET_PASSWORD_SUCCESS,
    payload: SetPasswordSuccessPayload,
  };
  
  export type SetPasswordFailure = {
    type: typeof actionTypes.SET_PASSWORD_FAILURE,
    payload: SetPasswordFailurePayload,
  };
  
  
  export type SetPasswordActions =
    | SetPasswordRequest
    | SetPasswordSuccess
    | SetPasswordFailure;