import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { ITourGuideStatus, ITourGuideComplete } from "../../actions/tourGuide/types";
import { tourGuideStatusFailure, tourGuideStatusSuccess, tourGuideCompleteFailure, tourGuideCompleteSuccess } from "../../actions/tourGuide";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const tourGuideStatus = async (payload: any) => {
  const { data } = await axios.get<ITourGuideStatus[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/tourguide/status",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};

const tourGuideComplete = async (payload: any) => {
  const { data } = await axios.get<ITourGuideComplete[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/tourguide/complete",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};

function* tourGuideStatusSaga(action: any) {
  try {
    const response: { data: any } = yield call(tourGuideStatus, {});

    yield put(
      tourGuideStatusSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        tourGuideStatusFailure({
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
        tourGuideStatusFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

function* tourGuideCompleteSaga(action: any) {
  try {
    const response: { data: any } = yield call(tourGuideComplete, {});

    yield put(
      tourGuideCompleteSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        tourGuideCompleteFailure({
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
        tourGuideCompleteFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

export function* tourGuideStatusSagaTrigger() {
  yield all([takeLatest(actionTypes.TOURGUIDE_STATUS_REQUEST, tourGuideStatusSaga)]);
}

export function* tourGuideCompleteSagaTrigger() {
  yield all([takeLatest(actionTypes.TOURGUIDE_COMPLETE_REQUEST, tourGuideCompleteSaga)]);
}
