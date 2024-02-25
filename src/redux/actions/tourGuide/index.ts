import { actionTypes } from '../../constants/actionTypes'
import { 
    TourGuideStatusFailure,
    TourGuideStatusFailurePayload,
    TourGuideStatusPayload,
    TourGuideStatusRequest,
    TourGuideStatusSuccess,
    TourGuideStatusSuccessPayload,

    TourGuideCompleteFailure,
    TourGuideCompleteFailurePayload,
    TourGuideCompletePayload,
    TourGuideCompleteRequest,
    TourGuideCompleteSuccess,
    TourGuideCompleteSuccessPayload,
} from './types';


export const tourGuideStatusRequest = (payload:TourGuideStatusPayload):TourGuideStatusRequest => ({
    type: actionTypes.TOURGUIDE_STATUS_REQUEST,
    payload,
});

export const tourGuideStatusSuccess = (payload:TourGuideStatusSuccessPayload):TourGuideStatusSuccess => ({
    type: actionTypes.TOURGUIDE_STATUS_SUCCESS,
    payload,
});

export const tourGuideStatusFailure = (payload:TourGuideStatusFailurePayload):TourGuideStatusFailure => ({
    type: actionTypes.TOURGUIDE_STATUS_FAILURE,
    payload,
});


export const tourGuideCompleteRequest = (payload:TourGuideCompletePayload):TourGuideCompleteRequest => ({
    type: actionTypes.TOURGUIDE_COMPLETE_REQUEST,
    payload,
});

export const tourGuideCompleteSuccess = (payload:TourGuideCompleteSuccessPayload):TourGuideCompleteSuccess => ({
    type: actionTypes.TOURGUIDE_COMPLETE_SUCCESS,
    payload,
});

export const tourGuideCompleteFailure = (payload:TourGuideCompleteFailurePayload):TourGuideCompleteFailure => ({
    type: actionTypes.TOURGUIDE_COMPLETE_FAILURE,
    payload,
});
