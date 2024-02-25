import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { INotificationsInfo, IReadNotification } from "../../actions/notifications/types";
import { notificationsInfoFailure, notificationsInfoSuccess, readNotificationFailure, readNotificationSuccess } from "../../actions/notifications";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const notificationsInfo = async (payload: any) => {
  const { data } = await axios.get<INotificationsInfo[]>(
    global.apiBaseUrl + global.liveUrl + "notification",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};

const readNotification = async (payload: any) => {
  const { data } = await axios.get<IReadNotification[]>(
    global.apiBaseUrl + global.liveUrl + `notification/${payload.id}/get`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};

function* notificationsInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(notificationsInfo, {});

    yield put(
      notificationsInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        notificationsInfoFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        notificationsInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

function* readNotificationSaga(action: any) {
  try {
    const response: { data: any } = yield call(readNotification, {
      id: action.payload.values.id
    });

    yield put(
      readNotificationSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        readNotificationFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        readNotificationFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

export function* notificationsInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.NOTIFICATIONS_INFO_REQUEST, notificationsInfoSaga)]);
}

export function* readNotificationSagaTrigger() {
  yield all([takeLatest(actionTypes.READ_NOTIFICATION_REQUEST, readNotificationSaga)]);
}
