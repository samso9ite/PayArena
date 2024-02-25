import { actionTypes } from '../../../../constants/actionTypes'
import {InitResetPasswordPayload,InitResetPasswordRequest,InitResetPasswordSuccess,InitResetPasswordSuccessPayload,InitResetPasswordFailure,InitResetPasswordFailurePayload } from "./types";


export const initResetPasswordRequest = (payload:InitResetPasswordPayload):InitResetPasswordRequest => ({
    type: actionTypes.INIT_RESET_PASSWORD_REQUEST,
    payload,
});

export const initResetPasswordSuccess = (payload:InitResetPasswordSuccessPayload):InitResetPasswordSuccess => ({
    type: actionTypes.INIT_RESET_PASSWORD_SUCCESS,
    payload,
});

export const initResetPasswordFailure = (payload:InitResetPasswordFailurePayload):InitResetPasswordFailure => ({
    type: actionTypes.INIT_RESET_PASSWORD_FAILURE,
    payload,
});

