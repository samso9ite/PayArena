import { actionTypes } from "../../constants/actionTypes";

export interface IAccessTokenInfo {
  resp: any;
}
export interface IMigrationSetPassword {
  resp: any;
}

export interface AccessTokenInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface MigrationSetPasswordState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface AccessTokenInfoPayload {
  values: { session: string};
  callback: any;
}
export interface MigrationSetPasswordPayload {
  values: { new_password: string};
  callback: any;
}

export interface AccessTokenInfoSuccessPayload {
  resp: any;
}
export interface MigrationSetPasswordSuccessPayload {
  resp: any;
}

export interface AccessTokenInfoFailurePayload {
  error: string;
}
export interface MigrationSetPasswordFailurePayload {
  error: string;
}


export interface AccessTokenInfoRequest {
  type: typeof actionTypes.ACCESS_TOKEN_INFO_REQUEST;
  payload: AccessTokenInfoPayload;
}
export interface MigrationSetPasswordRequest {
  type: typeof actionTypes.MIGRATION_SET_PASSWORD_REQUEST;
  payload: MigrationSetPasswordPayload;
}

export type AccessTokenInfoSuccess = {
  type: typeof actionTypes.ACCESS_TOKEN_INFO_SUCCESS,
  payload: AccessTokenInfoSuccessPayload,
};
export type MigrationSetPasswordSuccess = {
  type: typeof actionTypes.MIGRATION_SET_PASSWORD_SUCCESS,
  payload: MigrationSetPasswordSuccessPayload,
};

export type AccessTokenInfoFailure = {
  type: typeof actionTypes.ACCESS_TOKEN_INFO_FAILURE,
  payload: AccessTokenInfoFailurePayload,
};
export type MigrationSetPasswordFailure = {
  type: typeof actionTypes.MIGRATION_SET_PASSWORD_FAILURE,
  payload: MigrationSetPasswordFailurePayload,
};

export type AccessTokenInfoActions =
  | AccessTokenInfoRequest
  | AccessTokenInfoSuccess
  | AccessTokenInfoFailure;
  
export type MigrationSetPasswordActions =
  | MigrationSetPasswordRequest
  | MigrationSetPasswordSuccess
  | MigrationSetPasswordFailure;