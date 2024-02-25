import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IApplicationInfo, ICreateApplication, IEditApplication, IGetAppTeamMembers } from "../../../actions/apiLibraries/applications/types";
import { applicationInfoFailure, applicationInfoSuccess, createApplicationFailure, createApplicationSuccess, editApplicationFailure, editApplicationSuccess, getAppTeamMembersInfoSuccess, getAppTeamMembersInfoFailure } from "../../../actions/apiLibraries/applications";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const applicationInfo = async (payload: any) => {
  const { data } = await axios.get<IApplicationInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/applications/get",
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
const createApplication = async (payload: any) => {
  // console.log(payload, 'PAY')
  const { data } = await axios.post<ICreateApplication[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/applications/create",
    payload,
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
const editApplication = async (payload: any) => {
  const { data } = await axios.post<IEditApplication[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/applications/edit",
    payload,
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
const getAppTeamMembers = async (payload: any) => {
  const { data } = await axios.get<IGetAppTeamMembers[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/applications/create",
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

function* applicationInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(applicationInfo, {});

    yield put(
      applicationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        applicationInfoFailure({
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
        applicationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* createApplicationSaga(action: any) {
  // console.log(action, 'ACT')
  try {
    const response: { data: any } = yield call(createApplication, {
      name: action.payload.values.name,
      users: action.payload.values.users,
      products: action.payload.values.products
    });
    yield put(
      createApplicationSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        createApplicationFailure({
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
        createApplicationFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* editApplicationSaga(action: any) {
  try {
    const response: { data: any } = yield call(editApplication, {
      name: action.payload.values.name,
      application_id: action.payload.values.application_id,
      is_active: action.payload.values.is_active,
      users: action.payload.values.users,
      products: action.payload.values.products
    });
    yield put(
      editApplicationSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        editApplicationFailure({
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
        editApplicationFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* getAppSaga(action: any) {
  try {
    const response: { data: any } = yield call(getAppTeamMembers, {});

    yield put(
      getAppTeamMembersInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        getAppTeamMembersInfoFailure({
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
        applicationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}




export function* applicationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.APPLICATION_INFO_REQUEST, applicationInfoSaga)]);
}
export function* createApplicationSagaTrigger() {
  yield all([takeLatest(actionTypes.CREATE_APPLICATION_REQUEST, createApplicationSaga)]);
}
export function* editApplicationSagaTrigger() {
  yield all([takeLatest(actionTypes.EDIT_APPLICATION_REQUEST, editApplicationSaga)]);
}
export function* getAppSagaTrigger() {
  yield all([takeLatest(actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST, getAppSaga)]);
}