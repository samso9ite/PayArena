import { actionTypes } from "../../constants/actionTypes";

export interface ITourGuideStatus {
  resp: any;
}

export interface ITourGuideComplete {
  resp: any;
}

export interface TourGuideStatusState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface TourGuideCompleteState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface TourGuideStatusPayload {
  callback: any;
}

export interface TourGuideCompletePayload {
  callback: any;
}

export interface TourGuideStatusSuccessPayload {
  resp: any;
}

export interface TourGuideCompleteSuccessPayload {
  resp: any;
}

export interface TourGuideStatusFailurePayload {
  error: string;
}

export interface TourGuideCompleteFailurePayload {
  error: string;
}


export interface TourGuideStatusRequest {
  type: typeof actionTypes.TOURGUIDE_STATUS_REQUEST;
  payload: TourGuideStatusPayload;
}

export type TourGuideStatusSuccess = {
  type: typeof actionTypes.TOURGUIDE_STATUS_SUCCESS,
  payload: TourGuideStatusSuccessPayload,
};

export type TourGuideStatusFailure = {
  type: typeof actionTypes.TOURGUIDE_STATUS_FAILURE,
  payload: TourGuideStatusFailurePayload,
};


export interface TourGuideCompleteRequest {
  type: typeof actionTypes.TOURGUIDE_COMPLETE_REQUEST;
  payload: TourGuideCompletePayload;
}

export type TourGuideCompleteSuccess = {
  type: typeof actionTypes.TOURGUIDE_COMPLETE_SUCCESS,
  payload: TourGuideCompleteSuccessPayload,
};

export type TourGuideCompleteFailure = {
  type: typeof actionTypes.TOURGUIDE_COMPLETE_FAILURE,
  payload: TourGuideCompleteFailurePayload,
};

export type TourGuideStatusActions =
  | TourGuideStatusRequest
  | TourGuideStatusSuccess
  | TourGuideStatusFailure 
  | TourGuideCompleteRequest 
  | TourGuideCompleteSuccess 
  | TourGuideCompleteFailure;