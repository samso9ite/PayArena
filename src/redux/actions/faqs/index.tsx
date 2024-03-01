import { actionTypes } from '../../constants/actionTypes'
import { 
    FaqsFailure,
    FaqsFailurePayload,
    FaqsPayload,
    FaqsRequest,
    FaqsSuccess,
    FaqsSuccessPayload
} from './types';




export const faqsRequest = (payload:FaqsPayload):FaqsRequest => ({
    type: actionTypes.FAQ_REQUEST,
    payload,
});

export const faqsSuccess = (payload:FaqsSuccessPayload):FaqsSuccess => ({
    type: actionTypes.FAQ_SUCCESS,
    payload,
});

export const faqsFailure = (payload:FaqsFailurePayload):FaqsFailure => ({
    type: actionTypes.FAQ_FAILURE,
    payload,
});