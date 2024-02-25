import { actionTypes } from '../../constants/actionTypes'
import { 
    SubPlansFailure, SubPlansFailurePayload, SubPlansPayload, 
    SubPlansRequest, SubPlansSuccess, SubPlansSuccessPayload,
    SubPlansByTenureFailure, SubPlansByTenureFailurePayload,  SubPlansByTenurePayload,
    SubPlansByTenureRequest, SubPlansByTenureSuccess, SubPlansByTenureSuccessPayload, SubscriptionPayload, SubscriptionRequest, SubscriptionSuccessPayload, SubscriptionSuccess, SubscriptionFailurePayload, SubscriptionFailure, SubLogsPayload, SubLogsRequest, SubLogsSuccessPayload, SubLogsSuccess, SubLogsFailurePayload, SubLogsFailure, CurrentSubPayload, CurrentSubRequest, CurrentSubSuccessPayload, CurrentSubSuccess, CurrentSubFailurePayload, CurrentSubFailure, SubPricingPayload, SubPricingRequest, SubPricingSuccessPayload, SubPricingSuccess, SubPricingFailurePayload, SubPricingFailure,
} from "./types";


export const subPlansRequest = (payload:SubPlansPayload):SubPlansRequest => ({
    type: actionTypes.SUB_PLANS_REQUEST,
    payload,
});
export const subPlansSuccess = (payload:SubPlansSuccessPayload):SubPlansSuccess => ({
    type: actionTypes.SUB_PLANS_SUCCESS,
    payload,
});
export const subPlansFailure = (payload:SubPlansFailurePayload):SubPlansFailure => ({
    type: actionTypes.SUB_PLANS_FAILURE,
    payload,
});


export const subPlansByTenureRequest = (payload:SubPlansByTenurePayload):SubPlansByTenureRequest => ({
    type: actionTypes.SUB_PLANS_BY_TENURE_REQUEST,
    payload,
});
export const subPlansByTenureSuccess = (payload:SubPlansByTenureSuccessPayload):SubPlansByTenureSuccess => ({
    type: actionTypes.SUB_PLANS_BY_TENURE_SUCCESS,
    payload,
});
export const subPlansByTenureFailure = (payload:SubPlansByTenureFailurePayload):SubPlansByTenureFailure => ({
    type: actionTypes.SUB_PLANS_BY_TENURE_FAILURE,
    payload,
});


export const subscriptionRequest = (payload:SubscriptionPayload):SubscriptionRequest => ({
    type: actionTypes.SUBSCRIPTION_REQUEST,
    payload,
});
export const subscriptionSuccess = (payload:SubscriptionSuccessPayload):SubscriptionSuccess => ({
    type: actionTypes.SUBSCRIPTION_SUCCESS,
    payload,
});
export const subscriptionFailure = (payload:SubscriptionFailurePayload):SubscriptionFailure => ({
    type: actionTypes.SUBSCRIPTION_FAILURE,
    payload,
});


export const subLogsRequest = (payload:SubLogsPayload):SubLogsRequest => ({
    type: actionTypes.SUB_LOGS_REQUEST,
    payload,
});
export const subLogsSuccess = (payload:SubLogsSuccessPayload):SubLogsSuccess => ({
    type: actionTypes.SUB_LOGS_SUCCESS,
    payload,
});
export const subLogsFailure = (payload:SubLogsFailurePayload):SubLogsFailure => ({
    type: actionTypes.SUB_LOGS_FAILURE,
    payload,
});


export const currentSubRequest = (payload:CurrentSubPayload):CurrentSubRequest => ({
    type: actionTypes.CURRENT_SUB_REQUEST,
    payload,
});
export const currentSubSuccess = (payload:CurrentSubSuccessPayload):CurrentSubSuccess => ({
    type: actionTypes.CURRENT_SUB_SUCCESS,
    payload,
});
export const currentSubFailure = (payload:CurrentSubFailurePayload):CurrentSubFailure => ({
    type: actionTypes.CURRENT_SUB_FAILURE,
    payload,
});


export const subPricingRequest = (payload:SubPricingPayload):SubPricingRequest => ({
    type: actionTypes.SUB_PRICING_REQUEST,
    payload,
});
export const subPricingSuccess = (payload:SubPricingSuccessPayload):SubPricingSuccess => ({
    type: actionTypes.SUB_PRICING_SUCCESS,
    payload,
});
export const subPricingFailure = (payload:SubPricingFailurePayload):SubPricingFailure => ({
    type: actionTypes.SUB_PRICING_FAILURE,
    payload,
});