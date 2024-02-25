import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { ICreateMyOrganisationInfo, IMyOrganisationInfo, IUpdateMyOrganisationInfo } from "../../actions/myOganisation/types";
import { myOrganisationInfoFailure, myOrganisationInfoSuccess, createMyOrganisationInfoFailure, createMyOrganisationInfoSuccess, updateMyOrganisationInfoFailure, updateMyOrganisationInfoSuccess, } from "../../actions/myOganisation";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const myOrganisationInfo = async (payload: any) => {
  const { data } = await axios.get<IMyOrganisationInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/organisation/all",
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
const createMyOrganisationInfo = async (payload: any) => {
  const { data } = await axios.post<ICreateMyOrganisationInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/organisation/create",
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
const updateMyOrganisationInfo = async (payload: any) => {
  const { data } = await axios.put<IUpdateMyOrganisationInfo[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/organisation/${payload.ref}/update`,
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


function* myOrganisationInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(myOrganisationInfo, {});

    yield put(
      myOrganisationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        myOrganisationInfoFailure({
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
        myOrganisationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* createMyOrganisationInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(createMyOrganisationInfo, {
      business_name: action.payload.values.business_name,
      business_email: action.payload.values.business_email,
      country: action.payload.values.country,
      sector: action.payload.values.sector
    });

    yield put(
      createMyOrganisationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        createMyOrganisationInfoFailure({
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
        createMyOrganisationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* updateMyOrganisationInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(updateMyOrganisationInfo, {
      ref: action.payload.values.ref,
    });
    yield put(
      updateMyOrganisationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateMyOrganisationInfoFailure({
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
        updateMyOrganisationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

export function* myOrganisationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.MY_ORGANISATION_INFO_REQUEST, myOrganisationInfoSaga)]);
}
export function* createMyOrganisationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.CREATE_MY_ORGANISATION_INFO_REQUEST, createMyOrganisationInfoSaga)]);
}
export function* updateMyOrganisationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_MY_ORGANISATION_INFO_REQUEST, updateMyOrganisationInfoSaga)]);
}
