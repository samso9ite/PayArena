import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IRegenerateLiveKey, IRegenerateSandboxKey } from "../../../actions/apiLibraries/apiKeys/types";
import { regenerateLiveKeyFailure, regenerateLiveKeySuccess, regenerateSandboxKeyFailure, regenerateSandboxKeySuccess } from "../../../actions/apiLibraries/apiKeys";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const regenerateLiveKey = async (payload: any) => {
  const { data } = await axios.get<IRegenerateLiveKey[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/key/live/reset",
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

const regenerateSandboxKey = async (payload: any) => {
  const { data } = await axios.get<IRegenerateSandboxKey[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/key/sandbox/reset",
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


function* regenerateLiveKeySaga(action: any) {
  try {
    const response: { data: any } = yield call(regenerateLiveKey, {});

    yield put(
      regenerateLiveKeySuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        regenerateLiveKeyFailure({
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
        regenerateLiveKeyFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

function* regenerateSandboxKeySaga(action: any) {
  try {
    const response: { data: any } = yield call(regenerateSandboxKey, {});

    yield put(
      regenerateSandboxKeySuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        regenerateSandboxKeyFailure({
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
        regenerateSandboxKeyFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* regenerateLiveKeySagaTrigger() {
  yield all([takeLatest(actionTypes.REGENERATE_LIVE_KEY_REQUEST, regenerateLiveKeySaga)]);
}
export function* regenerateSandboxKeySagaTrigger() {
  yield all([takeLatest(actionTypes.REGENERATE_SANDBOX_KEY_REQUEST, regenerateSandboxKeySaga)]);
}
