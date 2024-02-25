import { actionTypes } from "../../../constants/actionTypes";

export interface IAPIStatus {
  resp: any;
}

export interface APIStatusState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface APIStatusPayload {
  callback: any;
}

export interface APIStatusSuccessPayload {
  resp: any;
}

export interface APIStatusFailurePayload {
  error: string;
}


export interface APIStatusRequest {
  type: typeof actionTypes.API_STATUS_REQUEST;
  payload: APIStatusPayload;
}

export type APIStatusSuccess = {
  type: typeof actionTypes.API_STATUS_SUCCESS,
  payload: APIStatusSuccessPayload,
};

export type APIStatusFailure = {
  type: typeof actionTypes.API_STATUS_FAILURE,
  payload: APIStatusFailurePayload,
};

export type APIStatusActions =
  | APIStatusRequest
  | APIStatusSuccess
  | APIStatusFailure;