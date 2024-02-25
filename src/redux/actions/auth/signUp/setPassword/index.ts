import { actionTypes } from '../../../../constants/actionTypes'
import { SetPasswordPayload, SetPasswordRequest, SetPasswordSuccess,
    SetPasswordSuccessPayload, SetPasswordFailure, SetPasswordFailurePayload 
} from "./types";


export const setPasswordRequest = (payload:SetPasswordPayload):SetPasswordRequest => ({
    type: actionTypes.SET_PASSWORD_REQUEST,
    payload,
});

export const setPasswordSuccess = (payload:SetPasswordSuccessPayload):SetPasswordSuccess => ({
    type: actionTypes.SET_PASSWORD_SUCCESS,
    payload,
});

export const setPasswordFailure = (payload:SetPasswordFailurePayload):SetPasswordFailure => ({
    type: actionTypes.SET_PASSWORD_FAILURE,
    payload,
});

