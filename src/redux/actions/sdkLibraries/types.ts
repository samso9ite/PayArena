import {actionTypes} from "../../constants/actionTypes";
  
  export interface IUpdateWebhookUrl {
    resp: any;
  }
  
  export interface UpdateWebhookUrlState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface UpdateWebhookUrlPayload {
    values: { 
      webhook_url:string
    };
    callback: any;
  }
  
  export interface UpdateWebhookUrlSuccessPayload {
    resp: any;
  }
  
  export interface UpdateWebhookUrlFailurePayload {
    error: string;
  }
  
  
  export interface UpdateWebhookUrlRequest {
    type: typeof actionTypes.UPDATE_WEBHOOK_URL_REQUEST;
    payload: UpdateWebhookUrlPayload;
  }
  
  export type UpdateWebhookUrlSuccess = {
    type: typeof actionTypes.UPDATE_WEBHOOK_URL_SUCCESS,
    payload: UpdateWebhookUrlSuccessPayload,
  };
  
  export type UpdateWebhookUrlFailure = {
    type: typeof actionTypes.UPDATE_WEBHOOK_URL_FAILURE,
    payload: UpdateWebhookUrlFailurePayload,
  };
  
  
  export type UpdateWebhookUrlActions =
  | UpdateWebhookUrlRequest
  | UpdateWebhookUrlSuccess
  | UpdateWebhookUrlFailure;