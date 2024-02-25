import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IInitSignUp {
    resp: any;
  }
  export interface IClearSignUpEmail {
    resp: any;
  }
  

  export interface InitSignUpState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface ClearSignUpEmailState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface InitSignUpPayload {
    values: { 
      email: string, first_name: string, last_name: string, 
      organisation_name:string, country:string, referral:string, 
      sector:string
    };
  }
  export interface ClearSignUpEmailPayload {
    values: { email: string};
    callback: any;
  }
  

  export interface InitSignUpSuccessPayload {
    resp: any;
  }
  export interface ClearSignUpEmailSuccessPayload {
    resp: any;
  }
  

  export interface InitSignUpFailurePayload {
    error: string;
  }
  export interface ClearSignUpEmailFailurePayload {
    error: string;
  }
  
  
  export interface InitSignUpRequest {
    type: typeof actionTypes.INIT_SIGNUP_REQUEST;
    payload: InitSignUpPayload;
  }
  export interface ClearSignUpEmailRequest {
    type: typeof actionTypes.CLEAR_SIGNUP_EMAIL_REQUEST;
    payload: ClearSignUpEmailPayload;
  }

  
  export type InitSignUpSuccess = {
    type: typeof actionTypes.INIT_SIGNUP_SUCCESS,
    payload: InitSignUpSuccessPayload,
  };
  export type ClearSignUpEmailSuccess = {
    type: typeof actionTypes.CLEAR_SIGNUP_EMAIL_SUCCESS,
    payload: ClearSignUpEmailSuccessPayload,
  };

  
  export type InitSignUpFailure = {
    type: typeof actionTypes.INIT_SIGNUP_FAILURE,
    payload: InitSignUpFailurePayload,
  };
  export type ClearSignUpEmailFailure = {
    type: typeof actionTypes.CLEAR_SIGNUP_EMAIL_FAILURE,
    payload: ClearSignUpEmailFailurePayload,
  };
  
  
  export type InitSignUpActions =
    | InitSignUpRequest
    | InitSignUpSuccess
    | InitSignUpFailure;

  export type ClearSignUpEmailActions =
    | InitSignUpRequest
    | InitSignUpSuccess
    | InitSignUpFailure;
