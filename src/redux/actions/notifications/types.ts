import { actionTypes } from "../../constants/actionTypes";

export interface INotificationsInfo {
  resp: any;
}

export interface IReadNotification {
  resp: any;
}

export interface NotificationsInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface ReadNotificationState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface NotificationsInfoPayload {
  callback: any;
}

export interface ReadNotificationPayload {
  callback: any;
}

export interface NotificationsInfoSuccessPayload {
  resp: any;
}

export interface ReadNotificationSuccessPayload {
  resp: any;
}

export interface NotificationsInfoFailurePayload {
  error: string;
}

export interface ReadNotificationFailurePayload {
  error: string;
}


export interface NotificationsInfoRequest {
  type: typeof actionTypes.NOTIFICATIONS_INFO_REQUEST;
  payload: NotificationsInfoPayload;
}

export interface ReadNotificationRequest {
  type: typeof actionTypes.READ_NOTIFICATION_REQUEST;
  payload: ReadNotificationPayload;
}

export type NotificationsInfoSuccess = {
  type: typeof actionTypes.NOTIFICATIONS_INFO_SUCCESS,
  payload: NotificationsInfoSuccessPayload,
};

export type ReadNotificationSuccess = {
  type: typeof actionTypes.READ_NOTIFICATION_SUCCESS,
  payload: ReadNotificationSuccessPayload,
};

export type NotificationsInfoFailure = {
  type: typeof actionTypes.NOTIFICATIONS_INFO_FAILURE,
  payload: NotificationsInfoFailurePayload,
};

export type ReadNotificationFailure = {
  type: typeof actionTypes.READ_NOTIFICATION_FAILURE,
  payload: ReadNotificationFailurePayload,
};

export type NotificationsInfoActions =
  | NotificationsInfoRequest
  | NotificationsInfoSuccess
  | NotificationsInfoFailure;

  export type ReadNotificationActions =
  | ReadNotificationRequest
  | ReadNotificationSuccess
  | ReadNotificationFailure;