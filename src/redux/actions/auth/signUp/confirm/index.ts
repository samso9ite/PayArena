import { actionTypes } from '../../../../constants/actionTypes'
import { ConfirmSignUpPayload, ConfirmSignUpRequest, ConfirmSignUpSuccess,
    ConfirmSignUpSuccessPayload, ConfirmSignUpFailure, ConfirmSignUpFailurePayload, ResendSignUpOTPPayload, ResendSignUpOTPRequest, ResendSignUpOTPSuccessPayload, ResendSignUpOTPSuccess, ResendSignUpOTPFailurePayload, ResendSignUpOTPFailure 
} from "./types";


export const confirmSignUpRequest = (payload:ConfirmSignUpPayload):ConfirmSignUpRequest => ({
    type: actionTypes.CONFIRM_SIGNUP_REQUEST,
    payload,
});
export const confirmSignUpSuccess = (payload:ConfirmSignUpSuccessPayload):ConfirmSignUpSuccess => ({
    type: actionTypes.CONFIRM_SIGNUP_SUCCESS,
    payload,
});
export const confirmSignUpFailure = (payload:ConfirmSignUpFailurePayload):ConfirmSignUpFailure => ({
    type: actionTypes.CONFIRM_SIGNUP_FAILURE,
    payload,
});


export const resendSignUpOTPRequest = (payload:ResendSignUpOTPPayload):ResendSignUpOTPRequest => ({
    type: actionTypes.RESEND_SIGNUP_OTP_REQUEST,
    payload,
});
export const resendSignUpOTPSuccess = (payload:ResendSignUpOTPSuccessPayload):ResendSignUpOTPSuccess => ({
    type: actionTypes.RESEND_SIGNUP_OTP_SUCCESS,
    payload,
});
export const resendSignUpOTPFailure = (payload:ResendSignUpOTPFailurePayload):ResendSignUpOTPFailure => ({
    type: actionTypes.RESEND_SIGNUP_OTP_FAILURE,
    payload,
});

