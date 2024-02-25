import { actionTypes } from '../../../../constants/actionTypes'
import { 
    IdentitypassVerificationPayload, IdentitypassVerificationRequest, IdentitypassVerificationSuccessPayload, 
    IdentitypassVerificationSuccess, IdentitypassVerificationFailurePayload, IdentitypassVerificationFailure, 
    IdentitypassEndpointsPayload, IdentitypassEndpointsRequest, IdentitypassEndpointsSuccessPayload, 
    IdentitypassEndpointsSuccess, IdentitypassEndpointsFailurePayload, IdentitypassEndpointsFailure, 
    IdentitypassBulkVerificationPayload, IdentitypassBulkVerificationRequest, IdentitypassBulkVerificationSuccessPayload, 
    IdentitypassBulkVerificationSuccess, IdentitypassBulkVerificationFailurePayload, IdentitypassBulkVerificationFailure, IdentitypassBulkHistoryPayload, IdentitypassBulkHistoryRequest, IdentitypassBulkHistorySuccessPayload, IdentitypassBulkHistorySuccess, IdentitypassBulkHistoryFailurePayload, IdentitypassBulkHistoryFailure, 
} from "./types";



export const identitypassVerificationRequest = (payload:IdentitypassVerificationPayload):IdentitypassVerificationRequest => ({
    type: actionTypes.IDENTITYPASS_VERIFICATION_REQUEST,
    payload,
});
export const identitypassVerificationSuccess = (payload:IdentitypassVerificationSuccessPayload):IdentitypassVerificationSuccess => ({
    type: actionTypes.IDENTITYPASS_VERIFICATION_SUCCESS,
    payload,
});
export const identitypassVerificationFailure = (payload:IdentitypassVerificationFailurePayload):IdentitypassVerificationFailure => ({
    type: actionTypes.IDENTITYPASS_VERIFICATION_FAILURE,
    payload,
});


export const identitypassEndpointsRequest = (payload:IdentitypassEndpointsPayload):IdentitypassEndpointsRequest => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST,
    payload,
});
export const identitypassEndpointsSuccess = (payload:IdentitypassEndpointsSuccessPayload):IdentitypassEndpointsSuccess => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_SUCCESS,
    payload,
});
export const identitypassEndpointsFailure = (payload:IdentitypassEndpointsFailurePayload):IdentitypassEndpointsFailure => ({
    type: actionTypes.IDENTITYPASS_ENDPOINTS_FAILURE,
    payload,
});


export const identitypassBulkVerificationRequest = (payload:IdentitypassBulkVerificationPayload):IdentitypassBulkVerificationRequest => ({
    type: actionTypes.IDENTITYPASS_BULK_VERIFICATION_REQUEST,
    payload,
});
export const identitypassBulkVerificationSuccess = (payload:IdentitypassBulkVerificationSuccessPayload):IdentitypassBulkVerificationSuccess => ({
    type: actionTypes.IDENTITYPASS_BULK_VERIFICATION_SUCCESS,
    payload,
});
export const identitypassBulkVerificationFailure = (payload:IdentitypassBulkVerificationFailurePayload):IdentitypassBulkVerificationFailure => ({
    type: actionTypes.IDENTITYPASS_BULK_VERIFICATION_FAILURE,
    payload,
});


export const identitypassBulkHistoryRequest = (payload:IdentitypassBulkHistoryPayload):IdentitypassBulkHistoryRequest => ({
    type: actionTypes.IDENTITYPASS_BULK_HISTORY_REQUEST,
    payload,
});
export const identitypassBulkHistorySuccess = (payload:IdentitypassBulkHistorySuccessPayload):IdentitypassBulkHistorySuccess => ({
    type: actionTypes.IDENTITYPASS_BULK_HISTORY_SUCCESS,
    payload,
});
export const identitypassBulkHistoryFailure = (payload:IdentitypassBulkHistoryFailurePayload):IdentitypassBulkHistoryFailure => ({
    type: actionTypes.IDENTITYPASS_BULK_HISTORY_FAILURE,
    payload,
});