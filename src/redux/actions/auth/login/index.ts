import { actionTypes } from '../../../constants/actionTypes'
import { LoginPayload, LoginRequest, LoginSuccess, LoginSuccessPayload, LoginFailure, LoginFailurePayload } from "./types";


export const loginRequest = (payload: LoginPayload): LoginRequest => ({
    type: actionTypes.LOGIN_REQUEST,
    payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
    type: actionTypes.LOGIN_FAILURE,
    payload,
});

