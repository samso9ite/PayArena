import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IInitResetPassword {
    resp: any;
  }
  
  export interface InitResetPasswordState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface InitResetPasswordPayload {
    values: { email: string};
    callback: any;
  }
  
  export interface InitResetPasswordSuccessPayload {
    resp: any;
  }
  
  export interface InitResetPasswordFailurePayload {
    error: string;
  }
  
  
  export interface InitResetPasswordRequest {
    type: typeof actionTypes.INIT_RESET_PASSWORD_REQUEST;
    payload: InitResetPasswordPayload;
  }
  
  export type InitResetPasswordSuccess = {
    type: typeof actionTypes.INIT_RESET_PASSWORD_SUCCESS,
    payload: InitResetPasswordSuccessPayload,
  };
  
  export type InitResetPasswordFailure = {
    type: typeof actionTypes.INIT_RESET_PASSWORD_FAILURE,
    payload: InitResetPasswordFailurePayload,
  };
  
  
  export type InitResetPasswordActions =
    | InitResetPasswordRequest
    | InitResetPasswordSuccess
    | InitResetPasswordFailure;