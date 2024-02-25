import { actionTypes } from '../../../constants/actionTypes'
import { APIStatusFailure, APIStatusFailurePayload, APIStatusPayload, APIStatusRequest, APIStatusSuccess, APIStatusSuccessPayload } from "./types";


export const apiStatusRequest = (payload:APIStatusPayload):APIStatusRequest => ({
    type: actionTypes.API_STATUS_REQUEST,
    payload,
});

export const apiStatusSuccess = (payload:APIStatusSuccessPayload):APIStatusSuccess => ({
    type: actionTypes.API_STATUS_SUCCESS,
    payload,
});

export const apiStatusFailure = (payload:APIStatusFailurePayload):APIStatusFailure => ({
    type: actionTypes.API_STATUS_FAILURE,
    payload,
});
