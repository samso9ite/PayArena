import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IConfirmSignUp {
    resp: any;
  }
  export interface IResendSignUpOTP {
    resp: any;
  }
  
  export interface ConfirmSignUpState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface ResendSignUpOTPState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface ConfirmSignUpPayload {
    values: { email: string, confirmation_code: string };
    callback: any;
  }
  export interface ResendSignUpOTPPayload {
    values: { email: string };
    callback: any;
  }
  
  export interface ConfirmSignUpSuccessPayload {
    resp: any;
  }
  export interface ResendSignUpOTPSuccessPayload {
    resp: any;
  }
  
  export interface ConfirmSignUpFailurePayload {
    error: string;
  }
  export interface ResendSignUpOTPFailurePayload {
    error: string;
  }
  
  
  export interface ConfirmSignUpRequest {
    type: typeof actionTypes.CONFIRM_SIGNUP_REQUEST;
    payload: ConfirmSignUpPayload;
  }
  export interface ResendSignUpOTPRequest {
    type: typeof actionTypes.RESEND_SIGNUP_OTP_REQUEST;
    payload: ResendSignUpOTPPayload;
  }
  
  export type ConfirmSignUpSuccess = {
    type: typeof actionTypes.CONFIRM_SIGNUP_SUCCESS,
    payload: ConfirmSignUpSuccessPayload,
  };
  export type ResendSignUpOTPSuccess = {
    type: typeof actionTypes.RESEND_SIGNUP_OTP_SUCCESS,
    payload: ResendSignUpOTPSuccessPayload,
  };
  
  export type ConfirmSignUpFailure = {
    type: typeof actionTypes.CONFIRM_SIGNUP_FAILURE,
    payload: ConfirmSignUpFailurePayload,
  };
  export type ResendSignUpOTPFailure = {
    type: typeof actionTypes.RESEND_SIGNUP_OTP_FAILURE,
    payload: ResendSignUpOTPFailurePayload,
  };
  
  
  export type ConfirmSignUpActions =
    | ConfirmSignUpRequest
    | ConfirmSignUpSuccess
    | ConfirmSignUpFailure;

  export type ResendSignUpOTPActions =
  | ResendSignUpOTPRequest
  | ResendSignUpOTPSuccess
  | ResendSignUpOTPFailure;