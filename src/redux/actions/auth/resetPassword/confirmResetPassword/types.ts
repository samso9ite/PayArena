import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IConfirmResetPassword {
    resp: any;
  }
  
  export interface ConfirmResetPasswordState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface ConfirmResetPasswordPayload {
    values: { email: string, confirm_code: string, password: string};
    callback: any;
  }
  
  export interface ConfirmResetPasswordSuccessPayload {
    resp: any;
  }
  
  export interface ConfirmResetPasswordFailurePayload {
    error: string;
  }
  
  
  export interface ConfirmResetPasswordRequest {
    type: typeof actionTypes.CONFIRM_RESET_PASSWORD_REQUEST;
    payload: ConfirmResetPasswordPayload;
  }
  
  export type ConfirmResetPasswordSuccess = {
    type: typeof actionTypes.CONFIRM_RESET_PASSWORD_SUCCESS,
    payload: ConfirmResetPasswordSuccessPayload,
  };
  
  export type ConfirmResetPasswordFailure = {
    type: typeof actionTypes.CONFIRM_RESET_PASSWORD_FAILURE,
    payload: ConfirmResetPasswordFailurePayload,
  };
  
  
  export type ConfirmResetPasswordActions =
    | ConfirmResetPasswordRequest
    | ConfirmResetPasswordSuccess
    | ConfirmResetPasswordFailure;