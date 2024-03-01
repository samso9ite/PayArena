import { actionTypes } from "../../constants/actionTypes";

export interface IFaqs {
  resp: any;
}


export interface FaqsState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface FaqsPayload {
  callback: any;
}



export interface FaqsSuccessPayload {
  resp: any;
}


export interface FaqsFailurePayload {
  error: string;
}


export interface FaqsRequest {
  type: typeof actionTypes.FAQ_REQUEST;
  payload: FaqsPayload;
}



export type FaqsSuccess = {
  type: typeof actionTypes.FAQ_SUCCESS,
  payload: FaqsSuccessPayload,
};


export type FaqsFailure = {
  type: typeof actionTypes.FAQ_FAILURE,
  payload: FaqsFailurePayload,
};

  export type FaqsActions =
  | FaqsRequest
  | FaqsSuccess
  | FaqsFailure;