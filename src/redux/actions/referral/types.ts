import { actionTypes } from "../../constants/actionTypes";

export interface IReferralCommissionBalance {
  resp: any;
}
export interface IReferralHistory {
  resp: any;
}
export interface IReferralOverview {
  resp: any;
}
export interface IReferralLink {
  resp: any;
}
export interface IAllReferees{
  resp: any;
}
export interface IReferralReport {
  resp: any;
}
export interface IReferralCommissionWithdrawal {
  resp: any;
}
export interface IReferralGraph {
  resp: any;
}
export interface IReferralFeedback {
  resp: any;
}


export interface ReferralCommissionBalanceState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralHistoryState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralOverviewState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralLinkState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface AllRefereesState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralReportState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralCommissionWithdrawalState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralGraphState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ReferralFeedbackState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}


export interface ReferralCommissionBalancePayload {
  callback: any;
}
export interface ReferralHistoryPayload {
  callback: any;
}
export interface ReferralOverviewPayload {
  callback: any;
}
export interface ReferralLinkPayload {
  callback: any;
}
export interface AllRefereesPayload {
  callback: any;
}
export interface ReferralReportPayload {
  values: { 
    start_date: string,
    end_date: string,
    file_type: string
  };
  callback: any;
}
export interface ReferralCommissionWithdrawalPayload {
  values: { 
    amount: string,
  };
  callback: any;
}
export interface ReferralGraphPayload {
  callback: any;
}
export interface ReferralFeedbackPayload {
  values: { 
    score: string,
    comment: string
  };
  callback: any;
}


export interface ReferralCommissionBalanceSuccessPayload {
  resp: any;
}
export interface ReferralHistorySuccessPayload {
  resp: any;
}
export interface ReferralOverviewSuccessPayload {
  resp: any;
}
export interface ReferralLinkSuccessPayload {
  resp: any;
}
export interface AllRefereesSuccessPayload {
  resp: any;
}
export interface ReferralReportSuccessPayload {
  resp: any;
}
export interface ReferralCommissionWithdrawalSuccessPayload {
  resp: any;
}
export interface ReferralGraphSuccessPayload {
  resp: any;
}
export interface ReferralFeedbackSuccessPayload {
  resp: any;
}


export interface ReferralCommissionBalanceFailurePayload {
  error: string;
}
export interface ReferralHistoryFailurePayload {
  error: string;
}
export interface ReferralOverviewFailurePayload {
  error: string;
}
export interface ReferralLinkFailurePayload {
  error: string;
}
export interface AllRefereesFailurePayload {
  error: string;
}
export interface ReferralReportFailurePayload {
  error: string;
}
export interface ReferralCommissionWithdrawalFailurePayload {
  error: string;
}
export interface ReferralGraphFailurePayload {
  error: string;
}
export interface ReferralFeedbackFailurePayload {
  error: string;
}


export interface ReferralCommissionBalanceRequest {
  type: typeof actionTypes.REFERRAL_COMMISSION_BALANCE_REQUEST;
  payload: ReferralCommissionBalancePayload;
}
export interface ReferralHistoryRequest {
  type: typeof actionTypes.REFERRAL_HISTORY_REQUEST;
  payload: ReferralHistoryPayload;
}
export interface ReferralOverviewRequest {
  type: typeof actionTypes.REFERRAL_OVERVIEW_REQUEST;
  payload: ReferralOverviewPayload;
}
export interface ReferralLinkRequest {
  type: typeof actionTypes.REFERRAL_LINK_REQUEST;
  payload: ReferralLinkPayload;
}
export interface AllRefereesRequest {
  type: typeof actionTypes.ALL_REFEREES_REQUEST;
  payload: AllRefereesPayload;
}
export interface ReferralReportRequest {
  type: typeof actionTypes.REFERRAL_REPORT_REQUEST;
  payload: ReferralReportPayload;
}
export interface ReferralCommissionWithdrawalRequest {
  type: typeof actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_REQUEST;
  payload: ReferralCommissionWithdrawalPayload;
}
export interface ReferralGraphRequest {
  type: typeof actionTypes.REFERRAL_GRAPH_REQUEST;
  payload: ReferralGraphPayload;
}
export interface ReferralFeedbackRequest {
  type: typeof actionTypes.REFERRAL_FEEDBACK_REQUEST;
  payload: ReferralFeedbackPayload;
}


export type ReferralCommissionBalanceSuccess = {
  type: typeof actionTypes.REFERRAL_COMMISSION_BALANCE_SUCCESS,
  payload: ReferralCommissionBalanceSuccessPayload,
};
export type ReferralHistorySuccess = {
  type: typeof actionTypes.REFERRAL_HISTORY_SUCCESS,
  payload: ReferralHistorySuccessPayload,
};
export type ReferralOverviewSuccess = {
  type: typeof actionTypes.REFERRAL_OVERVIEW_SUCCESS,
  payload: ReferralOverviewSuccessPayload,
};
export type ReferralLinkSuccess = {
  type: typeof actionTypes.REFERRAL_LINK_SUCCESS,
  payload: ReferralLinkSuccessPayload,
};
export type AllRefereesSuccess = {
  type: typeof actionTypes.ALL_REFEREES_SUCCESS,
  payload: AllRefereesSuccessPayload,
};
export type ReferralReportSuccess = {
  type: typeof actionTypes.REFERRAL_REPORT_SUCCESS,
  payload: ReferralReportSuccessPayload,
};
export type ReferralCommissionWithdrawalSuccess = {
  type: typeof actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_SUCCESS,
  payload: ReferralCommissionWithdrawalSuccessPayload,
};
export type ReferralGraphSuccess = {
  type: typeof actionTypes.REFERRAL_GRAPH_SUCCESS,
  payload: ReferralGraphSuccessPayload,
};
export type ReferralFeedbackSuccess = {
  type: typeof actionTypes.REFERRAL_FEEDBACK_SUCCESS,
  payload: ReferralFeedbackSuccessPayload,
};


export type ReferralCommissionBalanceFailure = {
  type: typeof actionTypes.REFERRAL_COMMISSION_BALANCE_FAILURE,
  payload: ReferralCommissionBalanceFailurePayload,
};
export type ReferralHistoryFailure = {
  type: typeof actionTypes.REFERRAL_HISTORY_FAILURE,
  payload: ReferralHistoryFailurePayload,
};
export type ReferralOverviewFailure = {
  type: typeof actionTypes.REFERRAL_OVERVIEW_FAILURE,
  payload: ReferralOverviewFailurePayload,
};
export type ReferralLinkFailure = {
  type: typeof actionTypes.REFERRAL_LINK_FAILURE,
  payload: ReferralLinkFailurePayload,
};
export type AllRefereesFailure = {
  type: typeof actionTypes.ALL_REFEREES_FAILURE,
  payload: AllRefereesFailurePayload,
};
export type ReferralReportFailure = {
  type: typeof actionTypes.REFERRAL_REPORT_FAILURE,
  payload: ReferralReportFailurePayload,
};
export type ReferralCommissionWithdrawalFailure = {
  type: typeof actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_FAILURE,
  payload: ReferralCommissionWithdrawalFailurePayload,
};
export type ReferralGraphFailure = {
  type: typeof actionTypes.REFERRAL_GRAPH_FAILURE,
  payload: ReferralGraphFailurePayload,
};
export type ReferralFeedbackFailure = {
  type: typeof actionTypes.REFERRAL_FEEDBACK_FAILURE,
  payload: ReferralFeedbackFailurePayload,
};


export type ReferralCommissionBalanceActions =
  | ReferralCommissionBalanceRequest
  | ReferralCommissionBalanceSuccess
  | ReferralCommissionBalanceFailure;

export type ReferralHistoryActions =
  | ReferralHistoryRequest
  | ReferralHistorySuccess
  | ReferralHistoryFailure;

export type ReferralOverviewActions =
  | ReferralOverviewRequest
  | ReferralOverviewSuccess
  | ReferralOverviewFailure;

export type ReferralLinkActions =
  | ReferralLinkRequest
  | ReferralLinkSuccess
  | ReferralLinkFailure;

export type AllRefereesActions =
  | AllRefereesRequest
  | AllRefereesSuccess
  | AllRefereesFailure;

export type ReferralReportActions =
  | ReferralReportRequest
  | ReferralReportSuccess
  | ReferralReportFailure;

export type ReferralCommissionWithdrawalActions =
  | ReferralCommissionWithdrawalRequest
  | ReferralCommissionWithdrawalSuccess
  | ReferralCommissionWithdrawalFailure;

export type ReferralGraphActions =
| ReferralGraphRequest
| ReferralGraphSuccess
| ReferralGraphFailure;

export type ReferralFeedbackActions =
  | ReferralFeedbackRequest
  | ReferralFeedbackSuccess
  | ReferralFeedbackFailure;