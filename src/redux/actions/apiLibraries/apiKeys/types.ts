import { actionTypes } from "../../../constants/actionTypes";

export interface IRegenerateLiveKey {
  resp: any;
}
export interface IRegenerateSandboxKey {
  resp: any;
}

export interface RegenerateLiveKeyState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface RegenerateSandboxKeyState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface RegenerateLiveKeyPayload {
  callback: any;
}
export interface RegenerateSandboxKeyPayload {
  callback: any;
}

export interface RegenerateLiveKeySuccessPayload {
  resp: any;
}
export interface RegenerateSandboxKeySuccessPayload {
  resp: any;
}

export interface RegenerateLiveKeyFailurePayload {
  error: string;
}
export interface RegenerateSandboxKeyFailurePayload {
  error: string;
}


export interface RegenerateLiveKeyRequest {
  type: typeof actionTypes.REGENERATE_LIVE_KEY_REQUEST;
  payload: RegenerateLiveKeyPayload;
}
export interface RegenerateSandboxKeyRequest {
  type: typeof actionTypes.REGENERATE_SANDBOX_KEY_REQUEST;
  payload: RegenerateSandboxKeyPayload;
}

export type RegenerateLiveKeySuccess = {
  type: typeof actionTypes.REGENERATE_LIVE_KEY_SUCCESS,
  payload: RegenerateLiveKeySuccessPayload,
};
export type RegenerateSandboxKeySuccess = {
  type: typeof actionTypes.REGENERATE_SANDBOX_KEY_SUCCESS,
  payload: RegenerateSandboxKeySuccessPayload,
};

export type RegenerateLiveKeyFailure = {
  type: typeof actionTypes.REGENERATE_LIVE_KEY_FAILURE,
  payload: RegenerateLiveKeyFailurePayload,
};
export type RegenerateSandboxKeyFailure = {
  type: typeof actionTypes.REGENERATE_SANDBOX_KEY_FAILURE,
  payload: RegenerateSandboxKeyFailurePayload,
};

export type RegenerateLiveKeyActions =
  | RegenerateLiveKeyRequest
  | RegenerateLiveKeySuccess
  | RegenerateLiveKeyFailure;

export type RegenerateSandboxKeyActions =
    | RegenerateSandboxKeyRequest
    | RegenerateSandboxKeySuccess
    | RegenerateSandboxKeyFailure;