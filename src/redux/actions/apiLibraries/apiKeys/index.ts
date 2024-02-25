import { actionTypes } from '../../../constants/actionTypes'
import { 
    RegenerateLiveKeyFailure, RegenerateLiveKeyFailurePayload, RegenerateLiveKeyPayload, 
    RegenerateLiveKeyRequest, RegenerateLiveKeySuccess, RegenerateLiveKeySuccessPayload, 
    
    RegenerateSandboxKeyFailure, RegenerateSandboxKeyFailurePayload, RegenerateSandboxKeyPayload, 
    RegenerateSandboxKeyRequest, RegenerateSandboxKeySuccess, RegenerateSandboxKeySuccessPayload 
} from './types';


export const regenerateLiveKeyRequest = (payload:RegenerateLiveKeyPayload):RegenerateLiveKeyRequest => ({
    type: actionTypes.REGENERATE_LIVE_KEY_REQUEST,
    payload,
});
export const regenerateLiveKeySuccess = (payload:RegenerateLiveKeySuccessPayload):RegenerateLiveKeySuccess => ({
    type: actionTypes.REGENERATE_LIVE_KEY_SUCCESS,
    payload,
});
export const regenerateLiveKeyFailure = (payload:RegenerateLiveKeyFailurePayload):RegenerateLiveKeyFailure => ({
    type: actionTypes.REGENERATE_LIVE_KEY_FAILURE,
    payload,
});


export const regenerateSandboxKeyRequest = (payload:RegenerateSandboxKeyPayload):RegenerateSandboxKeyRequest => ({
    type: actionTypes.REGENERATE_SANDBOX_KEY_REQUEST,
    payload,
});
export const regenerateSandboxKeySuccess = (payload:RegenerateSandboxKeySuccessPayload):RegenerateSandboxKeySuccess => ({
    type: actionTypes.REGENERATE_SANDBOX_KEY_SUCCESS,
    payload,
});
export const regenerateSandboxKeyFailure = (payload:RegenerateSandboxKeyFailurePayload):RegenerateSandboxKeyFailure => ({
    type: actionTypes.REGENERATE_SANDBOX_KEY_FAILURE,
    payload,
});
