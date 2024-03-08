import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { updateProfileInfoFailure, updateProfileInfoSuccess, updateUserPasswordFailure, updateUserPasswordSuccess } from "../../../actions/settings/profileInfo";
import { IUpdateProfileInfo, IUpdateUserPassword } from "../../../actions/settings/profileInfo/types";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const updateUserPassword = async (payload: any) => {
  const { data } = await axios.post<IUpdateUserPassword[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/profile/change_password",
    payload,
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
const updateProfileInfo = async (payload: any) => {
  const { data } = await axios.post<IUpdateProfileInfo[]>(
    // global.apiBaseUrl + global.liveUrl + "api/v1/account/profile/update",
    `https://ifgn6xvqlj.execute-api.us-east-2.amazonaws.com/production/prembly-production/api/v1/account/profile/update`,

    payload,
    {
      headers: {
        // "Content-Type": "multipart/form-data",
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


function* updateUserPasswordSaga(action: any) {
  try {
    const response: { data: any } = yield call(updateUserPassword, {
      previous_password: action.payload.values.previous_password,
      new_password: action.payload.values.new_password
    });

    yield put(
      updateUserPasswordSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateUserPasswordFailure({
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
        updateUserPasswordFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

function* updateProfileInfoSaga(action: any) {

  // let profileData = new FormData()

  // profileData.append('first_name', action.payload.values.first_name);
  // profileData.append('last_name', action.payload.values.last_name);
  // profileData.append('image', action.payload.values.image);
  // profileData.append('phone', action.payload.values.phone);
      
  try {
    // const response: { data: any } = yield call(updateProfileInfo, profileData);

    const response: { data: any } = yield call(updateProfileInfo, {
      first_name: action.payload.values.first_name,
      last_name: action.payload.values.last_name,
      image: action.payload.values.image,
      phone: action.payload.values.phone
    });

    yield put(
      updateProfileInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateProfileInfoFailure({
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
        updateProfileInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* updateUserPasswordSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_USER_PASSWORD_REQUEST, updateUserPasswordSaga)]);
}
export function* updateProfileInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_PROFILE_INFO_REQUEST, updateProfileInfoSaga)]);
}