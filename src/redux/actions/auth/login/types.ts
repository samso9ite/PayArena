import {actionTypes} from "../../../constants/actionTypes";
  
  export interface IAuth {
    tokens: any;
  }
  
  export interface LoginState {
    isLoading: boolean;
    tokens: any;
    error: string | null;
  }
  
  export interface LoginPayload {
    values: { email: string, password: string, ip:string };
    callback: any;
  }
  
  export interface LoginSuccessPayload {
    tokens: any;
  }
  
  export interface LoginFailurePayload {
    error: string;
  }
  
  
  export interface LoginRequest {
    type: typeof actionTypes.LOGIN_REQUEST;
    payload: LoginPayload;
  }
  
  export type LoginSuccess = {
    type: typeof actionTypes.LOGIN_SUCCESS,
    payload: LoginSuccessPayload,
  };
  
  export type LoginFailure = {
    type: typeof actionTypes.LOGIN_FAILURE,
    payload: LoginFailurePayload,
  };
  
  
  export type LoginActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure;