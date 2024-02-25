import { actionTypes } from '../../../constants/actionTypes'
import { AcceptInviteFailure, AcceptInviteFailurePayload, AcceptInvitePayload, AcceptInviteRequest, AcceptInviteSuccess, AcceptInviteSuccessPayload } from './types';


export const acceptInviteRequest = (payload: AcceptInvitePayload): AcceptInviteRequest => ({
    type: actionTypes.ACCEPT_INVITE_REQUEST,
    payload,
});

export const acceptInviteSuccess = (payload: AcceptInviteSuccessPayload): AcceptInviteSuccess => ({
    type: actionTypes.ACCEPT_INVITE_SUCCESS,
    payload,
});

export const acceptInviteFailure = (payload: AcceptInviteFailurePayload): AcceptInviteFailure => ({
    type: actionTypes.ACCEPT_INVITE_FAILURE,
    payload,
});

