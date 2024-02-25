import { CurrrentSubState, SubLogsState, SubPlansByTenureState, SubPlansState, SubPricingState, SubscriptionState } from '../../actions/subscription/types';
import { actionTypes } from './../../constants/actionTypes';

const initialState : SubPlansState = {
    isLoading: false,
    error: null,
    resp:null,
};
const tenureInitialState : SubPlansByTenureState = {
    isLoading: false,
    error: null,
    resp:null,
};
const subscriptionInitialState : SubscriptionState = {
    isLoading: false,
    error: null,
    resp:null,
};
const logsInitialState : SubLogsState = {
    isLoading: false,
    error: null,
    resp:null,
};
const currentInitialState : CurrrentSubState = {
    isLoading: false,
    error: null,
    resp:null,
};
const pricingInitialState : SubPricingState = {
    isLoading: false,
    error: null,
    resp:null,
};



export const subPlansReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SUB_PLANS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SUB_PLANS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SUB_PLANS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const subPlansByTenureReducer = (state = tenureInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SUB_PLANS_BY_TENURE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SUB_PLANS_BY_TENURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SUB_PLANS_BY_TENURE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const subscriptionReducer = (state = subscriptionInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SUBSCRIPTION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SUBSCRIPTION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const subLogsReducer = (state = logsInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SUB_LOGS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SUB_LOGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SUB_LOGS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const currentSubReducer = (state = currentInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CURRENT_SUB_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CURRENT_SUB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CURRENT_SUB_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
export const subPricingReducer = (state = pricingInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SUB_PRICING_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SUB_PRICING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SUB_PRICING_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};