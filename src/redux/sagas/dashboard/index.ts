import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { IAcceptIndemnityForm, IAnnouncement, IDashboardInfo, IViewAnnouncement } from "../../actions/dashboard/types";
import { acceptIndemnityFormFailure, acceptIndemnityFormSuccess, announcementFailure, announcementSuccess, dashboardInfoFailure, dashboardInfoSuccess, viewAnnouncementFailure, viewAnnouncementSuccess } from "../../actions/dashboard";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const dashboardInfo = async (payload: any) => {
  const { data } = await axios.get<IDashboardInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/report/log/internal/dashboard",
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
const announcement = async (payload: any) => {
  const { data } = await axios.get<IAnnouncement[]>(
    global.apiBaseUrl + global.liveUrl + "customer/announcement/get",
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
const viewAnnouncement = async (payload: any) => {
  const { data } = await axios.get<IViewAnnouncement[]>(
    global.apiBaseUrl + global.liveUrl + `customer/announcement/${payload.ref}/content`,
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
const acceptIndemnityForm = async (payload: any) => {
  const { data } = await axios.get<IAcceptIndemnityForm[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/indemnity/accept`,
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


function* dashboardInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(dashboardInfo, {});

    yield put(
      dashboardInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        dashboardInfoFailure({
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
        dashboardInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* announcementSaga(action: any) {
  try {
    const response: { data: any } = yield call(announcement, {});

    yield put(
      announcementSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        announcementFailure({
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
        announcementFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* viewAnnouncementSaga(action: any) {
  try {
    const response: { data: any } = yield call(viewAnnouncement, {
      ref: action.payload.values.ref
    });

    yield put(
      viewAnnouncementSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        viewAnnouncementFailure({
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
        viewAnnouncementFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* acceptIndemnityFormSaga(action: any) {
  try {
    const response: { data: any } = yield call(acceptIndemnityForm, {});

    yield put(
      acceptIndemnityFormSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        acceptIndemnityFormFailure({
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
        acceptIndemnityFormFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* dashboardInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.DASHBOARD_INFO_REQUEST, dashboardInfoSaga)]);
}
export function* announcementSagaTrigger() {
  yield all([takeLatest(actionTypes.ANNOUNCEMENT_REQUEST, announcementSaga)]);
}
export function* viewAnnouncementSagaTrigger() {
  yield all([takeLatest(actionTypes.VIEW_ANNOUNCEMENT_REQUEST, viewAnnouncementSaga)]);
}
export function* acceptIndemnityFormSagaTrigger() {
  yield all([takeLatest(actionTypes.ACCEPT_INDEMNITY_FORM_REQUEST, acceptIndemnityFormSaga)]);
}
