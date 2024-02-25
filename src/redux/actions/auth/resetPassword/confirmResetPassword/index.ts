import { actionTypes } from '../../../../constants/actionTypes'
import { ConfirmResetPasswordPayload, ConfirmResetPasswordRequest, ConfirmResetPasswordSuccess,
    ConfirmResetPasswordSuccessPayload, ConfirmResetPasswordFailure, ConfirmResetPasswordFailurePayload 
} from "./types";


export const confirmResetPasswordRequest = (payload:ConfirmResetPasswordPayload):ConfirmResetPasswordRequest => ({
    type: actionTypes.CONFIRM_RESET_PASSWORD_REQUEST,
    payload,
});

export const confirmResetPasswordSuccess = (payload:ConfirmResetPasswordSuccessPayload):ConfirmResetPasswordSuccess => ({
    type: actionTypes.CONFIRM_RESET_PASSWORD_SUCCESS,
    payload,
});

export const confirmResetPasswordFailure = (payload:ConfirmResetPasswordFailurePayload):ConfirmResetPasswordFailure => ({
    type: actionTypes.CONFIRM_RESET_PASSWORD_FAILURE,
    payload,
});

