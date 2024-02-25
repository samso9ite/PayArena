import { actionTypes } from "../../constants/actionTypes";


export interface ISubPlans {
  resp: any;
}
export interface ISubPlansByTenure {
  resp: any;
}
export interface ISubscription {
  resp: any;
}
export interface ISubLogs {
  resp: any;
}
export interface ICurrentSub {
  resp: any;
}
export interface ISubPricing {
  resp: any;
}


export interface SubPlansState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SubPlansByTenureState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SubscriptionState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SubLogsState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface CurrrentSubState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SubPricingState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}


export interface SubPlansPayload {
  callback: any;
}
export interface SubPlansByTenurePayload {
  callback: any;
}
export interface SubscriptionPayload {
  callback: any;
}
export interface SubLogsPayload {
  callback: any;
}
export interface CurrentSubPayload {
  callback: any;
}
export interface SubPricingPayload {
  callback: any;
}


export interface SubPlansSuccessPayload {
  resp: any;
}
export interface SubPlansByTenureSuccessPayload {
  resp: any;
}
export interface SubscriptionSuccessPayload {
  resp: any;
}
export interface SubLogsSuccessPayload {
  resp: any;
}
export interface CurrentSubSuccessPayload {
  resp: any;
}
export interface SubPricingSuccessPayload {
  resp: any;
}


export interface SubPlansFailurePayload {
  error: string;
}
export interface SubPlansByTenureFailurePayload {
  error: string;
}
export interface SubscriptionFailurePayload {
  error: string;
}
export interface SubLogsFailurePayload {
  error: string;
}
export interface CurrentSubFailurePayload {
  error: string;
}
export interface SubPricingFailurePayload {
  error: string;
}


export interface SubPlansRequest {
  type: typeof actionTypes.SUB_PLANS_REQUEST;
  payload: SubPlansPayload;
}
export interface SubPlansByTenureRequest {
  type: typeof actionTypes.SUB_PLANS_BY_TENURE_REQUEST;
  payload: SubPlansByTenurePayload;
}
export interface SubscriptionRequest {
  type: typeof actionTypes.SUBSCRIPTION_REQUEST;
  payload: SubscriptionPayload;
}
export interface SubLogsRequest {
  type: typeof actionTypes.SUB_LOGS_REQUEST;
  payload: SubLogsPayload;
}
export interface CurrentSubRequest {
  type: typeof actionTypes.CURRENT_SUB_REQUEST;
  payload: CurrentSubPayload;
}
export interface SubPricingRequest {
  type: typeof actionTypes.SUB_PRICING_REQUEST;
  payload: SubPricingPayload;
}



export interface SubPlansSuccess {
  type: typeof actionTypes.SUB_PLANS_SUCCESS;
  payload: SubPlansSuccessPayload;
}
export interface SubPlansByTenureSuccess {
  type: typeof actionTypes.SUB_PLANS_BY_TENURE_SUCCESS;
  payload: SubPlansByTenureSuccessPayload;
}
export interface SubscriptionSuccess {
  type: typeof actionTypes.SUBSCRIPTION_SUCCESS;
  payload: SubscriptionSuccessPayload;
}
export interface SubLogsSuccess {
  type: typeof actionTypes.SUB_LOGS_SUCCESS;
  payload: SubLogsSuccessPayload;
}
export interface CurrentSubSuccess {
  type: typeof actionTypes.CURRENT_SUB_SUCCESS;
  payload: CurrentSubSuccessPayload;
}
export interface SubPricingSuccess {
  type: typeof actionTypes.SUB_PRICING_SUCCESS;
  payload: SubPricingSuccessPayload;
}


export interface SubPlansFailure {
  type: typeof actionTypes.SUB_PLANS_FAILURE;
  payload: SubPlansFailurePayload;
}
export interface SubPlansByTenureFailure {
  type: typeof actionTypes.SUB_PLANS_BY_TENURE_FAILURE;
  payload: SubPlansByTenureFailurePayload;
}
export interface SubscriptionFailure {
  type: typeof actionTypes.SUBSCRIPTION_FAILURE;
  payload: SubscriptionFailurePayload;
}
export interface SubLogsFailure {
  type: typeof actionTypes.SUB_LOGS_FAILURE;
  payload: SubLogsFailurePayload;
}
export interface CurrentSubFailure {
  type: typeof actionTypes.CURRENT_SUB_FAILURE;
  payload: CurrentSubFailurePayload;
}
export interface SubPricingFailure {
  type: typeof actionTypes.SUB_PRICING_FAILURE;
  payload: SubPricingFailurePayload;
}


export type SubPlansActions =
  | SubPlansRequest
  | SubPlansSuccess
  | SubPlansFailure;
export type SubPlansByTenureActions =
  | SubPlansByTenureRequest
  | SubPlansByTenureSuccess
  | SubPlansByTenureFailure;
export type SubscriptionActions =
  | SubscriptionRequest
  | SubscriptionSuccess
  | SubscriptionFailure;
export type SubLogsActions =
  | SubLogsRequest
  | SubLogsSuccess
  | SubLogsFailure;
export type CurrentSubActions =
  | CurrentSubRequest
  | CurrentSubSuccess
  | CurrentSubFailure;
export type SubPricingActions =
  | SubPricingRequest
  | SubPricingSuccess
  | SubPricingFailure;

