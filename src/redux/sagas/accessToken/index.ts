import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { IAccessTokenInfo } from "../../actions/accessToken/types";
import { accessTokenInfoFailure, accessTokenInfoSuccess, migrationSetPasswordFailure, migrationSetPasswordSuccess } from "../../actions/accessToken";
import global from "../../constants/global";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const accessTokenInfo = async (payload: any) => {
  const { data } = await axios.post<IAccessTokenInfo[]>(
    global.apiBaseUrl +  "account/auth/get-token-with-session-id",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Authorization: accessT,
        // Organisation: orgId,
      },
    }
  );
  return data;
};
const migrationSetPassword = async (payload: any) => {
  const { data } = await axios.post<IAccessTokenInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/migrated/password/set",
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


function* accessTokenInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(accessTokenInfo, {
      // email: action.payload.values.email,
      session_id: action.payload.values.session,
    });

    yield put(
      accessTokenInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        accessTokenInfoFailure({
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
        accessTokenInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* migrationSetPasswordSaga(action: any) {
  try {
    const response: { data: any } = yield call(migrationSetPassword, {
      new_password: action.payload.values.new_password,
    });

    yield put(
      migrationSetPasswordSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        migrationSetPasswordFailure({
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
        migrationSetPasswordFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* accessTokenInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.ACCESS_TOKEN_INFO_REQUEST, accessTokenInfoSaga)]);
}
export function* migrationSetPasswordSagaTrigger() {
  yield all([takeLatest(actionTypes.MIGRATION_SET_PASSWORD_REQUEST, migrationSetPasswordSaga)]);
}
