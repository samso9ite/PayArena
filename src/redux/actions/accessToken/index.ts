import { actionTypes } from '../../constants/actionTypes'
import { 
    AccessTokenInfoFailure,
    AccessTokenInfoFailurePayload,
    AccessTokenInfoPayload,
    AccessTokenInfoRequest,
    AccessTokenInfoSuccess,
    AccessTokenInfoSuccessPayload,
    MigrationSetPasswordFailure,
    MigrationSetPasswordFailurePayload,
    MigrationSetPasswordPayload,
    MigrationSetPasswordRequest,
    MigrationSetPasswordSuccess,
    MigrationSetPasswordSuccessPayload,
} from './types';


export const accessTokenInfoRequest = (payload:AccessTokenInfoPayload):AccessTokenInfoRequest => ({
    type: actionTypes.ACCESS_TOKEN_INFO_REQUEST,
    payload,
});

export const accessTokenInfoSuccess = (payload:AccessTokenInfoSuccessPayload):AccessTokenInfoSuccess => ({
    type: actionTypes.ACCESS_TOKEN_INFO_SUCCESS,
    payload,
});

export const accessTokenInfoFailure = (payload:AccessTokenInfoFailurePayload):AccessTokenInfoFailure => ({
    type: actionTypes.ACCESS_TOKEN_INFO_FAILURE,
    payload,
});



export const migrationSetPasswordRequest = (payload:MigrationSetPasswordPayload):MigrationSetPasswordRequest => ({
    type: actionTypes.MIGRATION_SET_PASSWORD_REQUEST,
    payload,
});

export const migrationSetPasswordSuccess = (payload:MigrationSetPasswordSuccessPayload):MigrationSetPasswordSuccess => ({
    type: actionTypes.MIGRATION_SET_PASSWORD_SUCCESS,
    payload,
});

export const migrationSetPasswordFailure = (payload:MigrationSetPasswordFailurePayload):MigrationSetPasswordFailure => ({
    type: actionTypes.MIGRATION_SET_PASSWORD_FAILURE,
    payload,
});