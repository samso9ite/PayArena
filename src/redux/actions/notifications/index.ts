import { actionTypes } from '../../constants/actionTypes'
import { 
    NotificationsInfoFailure,
    NotificationsInfoFailurePayload,
    NotificationsInfoPayload,
    NotificationsInfoRequest,
    NotificationsInfoSuccess,
    NotificationsInfoSuccessPayload,
    ReadNotificationFailure,
    ReadNotificationFailurePayload,
    ReadNotificationPayload,
    ReadNotificationRequest,
    ReadNotificationSuccess,
    ReadNotificationSuccessPayload
} from './types';


export const notificationsInfoRequest = (payload:NotificationsInfoPayload):NotificationsInfoRequest => ({
    type: actionTypes.NOTIFICATIONS_INFO_REQUEST,
    payload,
});

export const notificationsInfoSuccess = (payload:NotificationsInfoSuccessPayload):NotificationsInfoSuccess => ({
    type: actionTypes.NOTIFICATIONS_INFO_SUCCESS,
    payload,
});

export const notificationsInfoFailure = (payload:NotificationsInfoFailurePayload):NotificationsInfoFailure => ({
    type: actionTypes.NOTIFICATIONS_INFO_FAILURE,
    payload,
});


export const readNotificationRequest = (payload:ReadNotificationPayload):ReadNotificationRequest => ({
    type: actionTypes.READ_NOTIFICATION_REQUEST,
    payload,
});

export const readNotificationSuccess = (payload:ReadNotificationSuccessPayload):ReadNotificationSuccess => ({
    type: actionTypes.READ_NOTIFICATION_SUCCESS,
    payload,
});

export const readNotificationFailure = (payload:ReadNotificationFailurePayload):ReadNotificationFailure => ({
    type: actionTypes.READ_NOTIFICATION_FAILURE,
    payload,
});