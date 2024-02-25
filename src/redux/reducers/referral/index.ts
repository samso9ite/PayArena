
import { AllRefereesState, ReferralCommissionBalanceState, ReferralCommissionWithdrawalState, ReferralFeedbackState, ReferralGraphState, ReferralHistoryState, ReferralLinkState, ReferralOverviewState, ReferralReportState } from '../../actions/referral/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : ReferralCommissionBalanceState = {
    isLoading: false,
    error: null,
    resp:null,
};
let historyInitialState : ReferralHistoryState = {
    isLoading: false,
    error: null,
    resp:null,
};
let overviewInitialState : ReferralOverviewState = {
    isLoading: false,
    error: null,
    resp:null,
};
let linkInitialState : ReferralLinkState = {
    isLoading: false,
    error: null,
    resp:null,
};
let allRefereesInitialState : AllRefereesState = {
    isLoading: false,
    error: null,
    resp:null,
};
let reportInitialState : ReferralReportState = {
    isLoading: false,
    error: null,
    resp:null,
};
let withdrawalInitialState : ReferralCommissionWithdrawalState = {
    isLoading: false,
    error: null,
    resp:null,
};
let graphInitialState : ReferralGraphState = {
    isLoading: false,
    error: null,
    resp:null,
};
let feedbackInitialState : ReferralFeedbackState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const referralCommissionBalanceReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_COMMISSION_BALANCE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_COMMISSION_BALANCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_COMMISSION_BALANCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralHistoryReducer = (state = historyInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_HISTORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralOverviewReducer = (state = overviewInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_OVERVIEW_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_OVERVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralLinkReducer = (state = linkInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_LINK_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_LINK_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const allRefereesReducer = (state = allRefereesInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ALL_REFEREES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ALL_REFEREES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ALL_REFEREES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralReportReducer = (state = reportInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_REPORT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralCommissionWithdrawalReducer = (state = withdrawalInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralGraphReducer = (state = graphInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_GRAPH_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_GRAPH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_GRAPH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const referralFeedbackReducer = (state = feedbackInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REFERRAL_FEEDBACK_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REFERRAL_FEEDBACK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REFERRAL_FEEDBACK_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
