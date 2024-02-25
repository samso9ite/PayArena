import { actionTypes } from '../../../../../constants/actionTypes'
import { 
    BackgroundCheckRequestGetAllPayload, BackgroundCheckRequestGetAllRequest, BackgroundCheckRequestGetAllSuccessPayload, 
    BackgroundCheckRequestGetAllSuccess, BackgroundCheckRequestGetAllFailurePayload, BackgroundCheckRequestGetAllFailure,
    
    BackgroundCheckRequestInitiateFailure, BackgroundCheckRequestInitiateFailurePayload, BackgroundCheckRequestInitiatePayload,
    BackgroundCheckRequestInitiateRequest, BackgroundCheckRequestInitiateSuccess, BackgroundCheckRequestInitiateSuccessPayload,
    
    BackgroundCheckRequestConsentFailure, BackgroundCheckRequestConsentFailurePayload, BackgroundCheckRequestConsentPayload, 
    BackgroundCheckRequestConsentRequest, BackgroundCheckRequestConsentSuccess, BackgroundCheckRequestConsentSuccessPayload,

    BackgroundCheckRequestFilterFailure, BackgroundCheckRequestFilterFailurePayload, BackgroundCheckRequestFilterPayload,
    BackgroundCheckRequestFilterRequest, BackgroundCheckRequestFilterSuccess, BackgroundCheckRequestFilterSuccessPayload,
    
} from './types';


export const backgroundCheckRequestGetAllRequest = (payload:BackgroundCheckRequestGetAllPayload):BackgroundCheckRequestGetAllRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST,
    payload,
});
export const backgroundCheckRequestGetAllSuccess = (payload:BackgroundCheckRequestGetAllSuccessPayload):BackgroundCheckRequestGetAllSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS,
    payload,
});
export const backgroundCheckRequestGetAllFailure = (payload:BackgroundCheckRequestGetAllFailurePayload):BackgroundCheckRequestGetAllFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE,
    payload,
});


export const backgroundCheckRequestInitiateRequest = (payload:BackgroundCheckRequestInitiatePayload):BackgroundCheckRequestInitiateRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST,
    payload,
});
export const backgroundCheckRequestInitiateSuccess = (payload:BackgroundCheckRequestInitiateSuccessPayload):BackgroundCheckRequestInitiateSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_SUCCESS,
    payload,
});
export const backgroundCheckRequestInitiateFailure = (payload:BackgroundCheckRequestInitiateFailurePayload):BackgroundCheckRequestInitiateFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_INITIATE_FAILURE,
    payload,
});


export const backgroundCheckRequestConsentRequest = (payload:BackgroundCheckRequestConsentPayload):BackgroundCheckRequestConsentRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST,
    payload,
});
export const backgroundCheckRequestConsentSuccess = (payload:BackgroundCheckRequestConsentSuccessPayload):BackgroundCheckRequestConsentSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_SUCCESS,
    payload,
});
export const backgroundCheckRequestConsentFailure = (payload:BackgroundCheckRequestConsentFailurePayload):BackgroundCheckRequestConsentFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CONSENT_FAILURE,
    payload,
});


export const backgroundCheckRequestFilterRequest = (payload:BackgroundCheckRequestFilterPayload):BackgroundCheckRequestFilterRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST,
    payload,
});
export const backgroundCheckRequestFilterSuccess = (payload:BackgroundCheckRequestFilterSuccessPayload):BackgroundCheckRequestFilterSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS,
    payload,
});
export const backgroundCheckRequestFilterFailure = (payload:BackgroundCheckRequestFilterFailurePayload):BackgroundCheckRequestFilterFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE,
    payload,
});
