import { actionTypes } from '../../../../constants/actionTypes'
import {
    InitSignUpPayload,InitSignUpRequest,InitSignUpSuccess,
    InitSignUpSuccessPayload,InitSignUpFailure,InitSignUpFailurePayload, 
    ClearSignUpEmailPayload, ClearSignUpEmailRequest, ClearSignUpEmailSuccessPayload, 
    ClearSignUpEmailSuccess, ClearSignUpEmailFailurePayload, ClearSignUpEmailFailure 
} from "./types";


export const initSignUpRequest = (payload:InitSignUpPayload):InitSignUpRequest => ({
    type: actionTypes.INIT_SIGNUP_REQUEST,
    payload,
});

export const initSignUpSuccess = (payload:InitSignUpSuccessPayload):InitSignUpSuccess => ({
    type: actionTypes.INIT_SIGNUP_SUCCESS,
    payload,
});

export const initSignUpFailure = (payload:InitSignUpFailurePayload):InitSignUpFailure => ({
    type: actionTypes.INIT_SIGNUP_FAILURE,
    payload,
});



export const clearSignUpEmailRequest = (payload:ClearSignUpEmailPayload):ClearSignUpEmailRequest => ({
    type: actionTypes.CLEAR_SIGNUP_EMAIL_REQUEST,
    payload,
});

export const clearSignUpEmailSuccess = (payload:ClearSignUpEmailSuccessPayload):ClearSignUpEmailSuccess => ({
    type: actionTypes.CLEAR_SIGNUP_EMAIL_SUCCESS,
    payload,
});

export const clearSignUpEmailFailure = (payload:ClearSignUpEmailFailurePayload):ClearSignUpEmailFailure => ({
    type: actionTypes.CLEAR_SIGNUP_EMAIL_FAILURE,
    payload,
});
