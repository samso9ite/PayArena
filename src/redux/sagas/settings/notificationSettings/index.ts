import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IAddContactInfo, IContactInfo, IPreferenceInfo, IRemoveContactInfo, IUpdatePreferenceInfo } from "../../../actions/settings/notificationSettings/types";
import { addContactInfoFailure, addContactInfoSuccess, contactInfoFailure, contactInfoSuccess, preferenceInfoFailure, preferenceInfoSuccess, removeContactInfoFailure, removeContactInfoSuccess, updatePreferenceInfoFailure, updatePreferenceInfoSuccess } from "../../../actions/settings/notificationSettings";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const preferenceInfo = async (payload: any) => {
  const { data } = await axios.get<IPreferenceInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/preference",
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
const updatePreferenceInfo = async (payload: any) => {
  const { data } = await axios.put<IUpdatePreferenceInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/preference",
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
const contactInfo = async (payload: any) => {
  const { data } = await axios.get<IContactInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/contact",
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
const addContactInfo = async (payload: any) => {
  const { data } = await axios.post<IAddContactInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/contact/add",
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
const removeContactInfo = async (payload: any) => {
  const { data } = await axios.delete<IRemoveContactInfo[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/contact/${payload.ref}/remove`,{
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


function* preferenceInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(preferenceInfo, {});

    yield put(
      preferenceInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        preferenceInfoFailure({
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
        preferenceInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* updatePreferenceInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(updatePreferenceInfo, {
      newsletter: action.payload.values.newsletter,
      low_wallet: action.payload.values.low_wallet,
      new_update: action.payload.values.new_update
    });
    yield put(
      updatePreferenceInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updatePreferenceInfoFailure({
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
        updatePreferenceInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* contactInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(contactInfo, {});

    yield put(
      contactInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        contactInfoFailure({
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
        contactInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* addContactInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(addContactInfo, {
      name: action.payload.values.name,
      email: action.payload.values.email,
      phone: action.payload.values.phone
    });
    yield put(
      addContactInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        addContactInfoFailure({
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
        addContactInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* removeContactInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(removeContactInfo, {
      ref: action.payload.values.ref,
    });
    yield put(
      removeContactInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        removeContactInfoFailure({
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
        removeContactInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* preferenceInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.PREFERENCE_INFO_REQUEST, preferenceInfoSaga)]);
}
export function* updatePreferenceInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_PREFERENCE_INFO_REQUEST, updatePreferenceInfoSaga)]);
}
export function* contactInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.CONTACT_INFO_REQUEST, contactInfoSaga)]);
}
export function* addContactInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.ADD_CONTACT_INFO_REQUEST, addContactInfoSaga)]);
}
export function* removeContactInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.REMOVE_CONTACT_INFO_REQUEST, removeContactInfoSaga)]);
}