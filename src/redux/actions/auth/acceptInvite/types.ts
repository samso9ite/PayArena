import {actionTypes} from "../../../constants/actionTypes";
  
  export interface IAcceptInvite {
    resp: any;
  }
  
  export interface AcceptInviteState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface AcceptInvitePayload {
    values: { 
      email: string, 
      type:string, 
      first_name:string, 
      last_name:string,
      password: string, 
      key:string,
      org_id:string
    };
    callback: any;
  }
  
  export interface AcceptInviteSuccessPayload {
    resp: any;
  }
  
  export interface AcceptInviteFailurePayload {
    error: string;
  }
  
  
  export interface AcceptInviteRequest {
    type: typeof actionTypes.ACCEPT_INVITE_REQUEST;
    payload: AcceptInvitePayload;
  }
  
  export type AcceptInviteSuccess = {
    type: typeof actionTypes.ACCEPT_INVITE_SUCCESS,
    payload: AcceptInviteSuccessPayload,
  };
  
  export type AcceptInviteFailure = {
    type: typeof actionTypes.ACCEPT_INVITE_FAILURE,
    payload: AcceptInviteFailurePayload,
  };
  
  
  export type AcceptInviteActions =
    | AcceptInviteRequest
    | AcceptInviteSuccess
    | AcceptInviteFailure;