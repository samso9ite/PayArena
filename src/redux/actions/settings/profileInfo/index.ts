import { actionTypes } from '../../../constants/actionTypes'
import { UpdateUserPasswordPayload, UpdateProfileInfoSuccessPayload, UpdateProfileInfoFailure, UpdateProfileInfoFailurePayload, UpdateUserPasswordRequest, UpdateUserPasswordSuccessPayload, UpdateUserPasswordSuccess, UpdateUserPasswordFailurePayload, UpdateUserPasswordFailure, UpdateProfileInfoPayload, UpdateProfileInfoRequest, UpdateProfileInfoSuccess, 
} from "./types";


export const updateUserPasswordRequest = (payload:UpdateUserPasswordPayload):UpdateUserPasswordRequest => ({
    type: actionTypes.UPDATE_USER_PASSWORD_REQUEST,
    payload,
});

export const updateUserPasswordSuccess = (payload:UpdateUserPasswordSuccessPayload):UpdateUserPasswordSuccess => ({
    type: actionTypes.UPDATE_USER_PASSWORD_SUCCESS,
    payload,
});

export const updateUserPasswordFailure = (payload:UpdateUserPasswordFailurePayload):UpdateUserPasswordFailure => ({
    type: actionTypes.UPDATE_USER_PASSWORD_FAILURE,
    payload,
});



export const updateProfileInfoRequest = (payload:UpdateProfileInfoPayload):UpdateProfileInfoRequest => ({
    type: actionTypes.UPDATE_PROFILE_INFO_REQUEST,
    payload,
});

export const updateProfileInfoSuccess = (payload:UpdateProfileInfoSuccessPayload):UpdateProfileInfoSuccess => ({
    type: actionTypes.UPDATE_PROFILE_INFO_SUCCESS,
    payload,
});

export const updateProfileInfoFailure = (payload:UpdateProfileInfoFailurePayload):UpdateProfileInfoFailure => ({
    type: actionTypes.UPDATE_PROFILE_INFO_FAILURE,
    payload,
});

