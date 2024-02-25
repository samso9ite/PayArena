import { actionTypes } from '../../constants/actionTypes'
import { 
    UpdateWebhookUrlFailure, UpdateWebhookUrlFailurePayload, UpdateWebhookUrlPayload, 
    UpdateWebhookUrlRequest, UpdateWebhookUrlSuccess, UpdateWebhookUrlSuccessPayload 
} from './types';

export const updateWebhookUrlRequest = (payload:UpdateWebhookUrlPayload):UpdateWebhookUrlRequest => ({
    type: actionTypes.UPDATE_WEBHOOK_URL_REQUEST,
    payload,
});

export const updateWebhookUrlSuccess = (payload:UpdateWebhookUrlSuccessPayload):UpdateWebhookUrlSuccess => ({
    type: actionTypes.UPDATE_WEBHOOK_URL_SUCCESS,
    payload,
});

export const updateWebhookUrlFailure = (payload:UpdateWebhookUrlFailurePayload):UpdateWebhookUrlFailure => ({
    type: actionTypes.UPDATE_WEBHOOK_URL_FAILURE,
    payload,
});

