import { actionTypes } from '../../constants/actionTypes'
import { 
    ReferralCommissionBalanceFailure, ReferralCommissionBalanceFailurePayload, ReferralCommissionBalancePayload, 
    ReferralCommissionBalanceRequest, ReferralCommissionBalanceSuccess, ReferralCommissionBalanceSuccessPayload, 
    
    ReferralHistoryFailure, ReferralHistoryFailurePayload, ReferralHistoryPayload, 
    ReferralHistoryRequest, ReferralHistorySuccess, ReferralHistorySuccessPayload,  
    
    ReferralOverviewFailure, ReferralOverviewFailurePayload, ReferralOverviewPayload, 
    ReferralOverviewRequest, ReferralOverviewSuccess, ReferralOverviewSuccessPayload ,
    
    ReferralLinkFailure,  ReferralLinkFailurePayload, ReferralLinkPayload, 
    ReferralLinkRequest, ReferralLinkSuccess, ReferralLinkSuccessPayload, 
    
    AllRefereesPayload, AllRefereesRequest, AllRefereesSuccessPayload, 
    AllRefereesSuccess, AllRefereesFailurePayload, AllRefereesFailure, 
    
    ReferralReportPayload, ReferralReportRequest, ReferralReportSuccessPayload, 
    ReferralReportSuccess, ReferralReportFailurePayload, ReferralReportFailure, 
    
    ReferralCommissionWithdrawalPayload, ReferralCommissionWithdrawalRequest, ReferralCommissionWithdrawalSuccessPayload, 
    ReferralCommissionWithdrawalFailurePayload, ReferralCommissionWithdrawalSuccess, ReferralCommissionWithdrawalFailure, 
    
    ReferralGraphPayload, ReferralGraphRequest, ReferralGraphSuccessPayload, 
    ReferralGraphSuccess, ReferralGraphFailurePayload, ReferralGraphFailure, 
    
    ReferralFeedbackPayload, ReferralFeedbackRequest, ReferralFeedbackSuccessPayload, 
    ReferralFeedbackSuccess, ReferralFeedbackFailurePayload, ReferralFeedbackFailure,
} from './types';


export const referralCommissionBalanceRequest = (payload:ReferralCommissionBalancePayload):ReferralCommissionBalanceRequest => ({
    type: actionTypes.REFERRAL_COMMISSION_BALANCE_REQUEST,
    payload,
});
export const referralCommissionBalanceSuccess = (payload:ReferralCommissionBalanceSuccessPayload):ReferralCommissionBalanceSuccess => ({
    type: actionTypes.REFERRAL_COMMISSION_BALANCE_SUCCESS,
    payload,
});
export const referralCommissionBalanceFailure = (payload:ReferralCommissionBalanceFailurePayload):ReferralCommissionBalanceFailure => ({
    type: actionTypes.REFERRAL_COMMISSION_BALANCE_FAILURE,
    payload,
});


export const referralHistoryRequest = (payload:ReferralHistoryPayload):ReferralHistoryRequest => ({
    type: actionTypes.REFERRAL_HISTORY_REQUEST,
    payload,
});
export const referralHistorySuccess = (payload:ReferralHistorySuccessPayload):ReferralHistorySuccess => ({
    type: actionTypes.REFERRAL_HISTORY_SUCCESS,
    payload,
});
export const referralHistoryFailure = (payload:ReferralHistoryFailurePayload):ReferralHistoryFailure => ({
    type: actionTypes.REFERRAL_HISTORY_FAILURE,
    payload,
});

export const referralOverviewRequest = (payload:ReferralOverviewPayload):ReferralOverviewRequest => ({
    type: actionTypes.REFERRAL_OVERVIEW_REQUEST,
    payload,
});
export const referralOverviewSuccess = (payload:ReferralOverviewSuccessPayload):ReferralOverviewSuccess => ({
    type: actionTypes.REFERRAL_OVERVIEW_SUCCESS,
    payload,
});
export const referralOverviewFailure = (payload:ReferralOverviewFailurePayload):ReferralOverviewFailure  => ({
    type: actionTypes.REFERRAL_OVERVIEW_FAILURE,
    payload,
});

export const referralLinkRequest = (payload:ReferralLinkPayload):ReferralLinkRequest => ({
    type: actionTypes.REFERRAL_LINK_REQUEST,
    payload,
});
export const referralLinkSuccess = (payload:ReferralLinkSuccessPayload):ReferralLinkSuccess => ({
    type: actionTypes.REFERRAL_LINK_SUCCESS,
    payload,
});
export const referralLinkFailure = (payload:ReferralLinkFailurePayload):ReferralLinkFailure  => ({
    type: actionTypes.REFERRAL_LINK_FAILURE,
    payload,
});

export const allRefereesRequest = (payload:AllRefereesPayload):AllRefereesRequest => ({
    type: actionTypes.ALL_REFEREES_REQUEST,
    payload,
});
export const allRefereesSuccess = (payload:AllRefereesSuccessPayload):AllRefereesSuccess => ({
    type: actionTypes.ALL_REFEREES_SUCCESS,
    payload,
});
export const allRefereesFailure = (payload:AllRefereesFailurePayload):AllRefereesFailure  => ({
    type: actionTypes.ALL_REFEREES_FAILURE,
    payload,
});

export const referralReportRequest = (payload:ReferralReportPayload):ReferralReportRequest => ({
    type: actionTypes.REFERRAL_REPORT_REQUEST,
    payload,
});
export const referralReportSuccess = (payload:ReferralReportSuccessPayload):ReferralReportSuccess => ({
    type: actionTypes.REFERRAL_REPORT_SUCCESS,
    payload,
});
export const referralReportFailure = (payload:ReferralReportFailurePayload):ReferralReportFailure  => ({
    type: actionTypes.REFERRAL_REPORT_FAILURE,
    payload,
});

export const referralCommissionWithdrawalRequest = (payload:ReferralCommissionWithdrawalPayload):ReferralCommissionWithdrawalRequest => ({
    type: actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_REQUEST,
    payload,
});
export const referralCommissionWithdrawalSuccess = (payload:ReferralCommissionWithdrawalSuccessPayload):ReferralCommissionWithdrawalSuccess => ({
    type: actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_SUCCESS,
    payload,
});
export const referralCommissionWithdrawalFailure = (payload:ReferralCommissionWithdrawalFailurePayload):ReferralCommissionWithdrawalFailure => ({
    type: actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_FAILURE,
    payload,
});

export const referralGraphRequest = (payload:ReferralGraphPayload):ReferralGraphRequest => ({
    type: actionTypes.REFERRAL_GRAPH_REQUEST,
    payload,
});
export const referralGraphSuccess = (payload:ReferralGraphSuccessPayload):ReferralGraphSuccess => ({
    type: actionTypes.REFERRAL_GRAPH_SUCCESS,
    payload,
});
export const referralGraphFailure = (payload:ReferralGraphFailurePayload):ReferralGraphFailure => ({
    type: actionTypes.REFERRAL_GRAPH_FAILURE,
    payload,
});

export const referralFeedbackRequest = (payload:ReferralFeedbackPayload):ReferralFeedbackRequest => ({
    type: actionTypes.REFERRAL_FEEDBACK_REQUEST,
    payload,
});
export const referralFeedbackSuccess = (payload:ReferralFeedbackSuccessPayload):ReferralFeedbackSuccess => ({
    type: actionTypes.REFERRAL_FEEDBACK_SUCCESS,
    payload,
});
export const referralFeedbackFailure = (payload:ReferralFeedbackFailurePayload):ReferralFeedbackFailure => ({
    type: actionTypes.REFERRAL_FEEDBACK_FAILURE,
    payload,
});
